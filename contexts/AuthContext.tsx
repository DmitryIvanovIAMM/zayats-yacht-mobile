import { LoginCredentials } from "@/components/Login/LoginForm";
import {
  api,
  createLoginBody,
  mapObjectToFormUrlEncoded
} from "@/helpers/API/api";
import { API_PATHS } from "@/helpers/API/apiPaths";
import { PATHS } from "@/helpers/paths";
import { RelativePathString, useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";

export interface UserInfo {
  user: {
    email: string;
    id: string;
    image: string | null;
    name: string | null;
  };
  expires: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  userInfo?: UserInfo;
  isValidating?: boolean;
  error?: string;
}
export const defaultAuthState: AuthState = {
  isAuthenticated: false,
  userInfo: undefined,
  isValidating: false,
  error: undefined
};

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials, redirectPath: string) => void;
  logout: () => void;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

// https://medium.com/@siddhantshelake/expo-router-authentication-with-protected-routes-persistent-login-eed364e310cc
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
  const router = useRouter();
  const login = async (
    credentials: LoginCredentials,
    redirectPath: string = PATHS.landing
  ) => {
    try {
      setAuthState((prev) => ({
        ...prev,
        isValidating: true,
        error: undefined
      }));
      // https://github.com/nextauthjs/next-auth/issues/1110
      const csrfTokenRequest = await (
        await api.get(API_PATHS.GET_CSRF_TOKEN, undefined, true)
      ).json();
      const csrfToken = csrfTokenRequest.csrfToken;

      const body = createLoginBody(credentials, csrfToken);

      const loginRequest = await api.post(
        API_PATHS.SIGN_IN_WITH_CREDENTIALS,
        body,
        {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        false,
        true
      );

      if (loginRequest.status === 200) {
        const getUserInfoSuccess = await getUserInfo();
        if (getUserInfoSuccess && redirectPath) {
          router.push(redirectPath as RelativePathString);
        }
      } else {
        return setAuthState({
          ...defaultAuthState,
          error: "Invalid credentials"
        });
      }
    } catch (error) {
      setAuthState({
        ...defaultAuthState,
        error: "Login failed"
      });
    } finally {
      setAuthState((prev) => ({
        ...prev,
        isValidating: false
      }));
    }
  };

  const getUserInfo = async (): Promise<boolean> => {
    try {
      const userInfo: UserInfo = await api
        .get(API_PATHS.GET_USER_SESSION, undefined, true)
        .then((res) => res.json());
      console.log("User Info: ", userInfo);

      if (!userInfo || !userInfo.user) {
        setAuthState({
          ...defaultAuthState,
          error: "Invalid credentials"
        });
        return false;
      }

      setAuthState({
        isAuthenticated: true,
        userInfo,
        isValidating: false,
        error: undefined
      });
      return true;
    } catch (error) {
      setAuthState({
        ...defaultAuthState,
        error: "Failed to fetch user info"
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      setAuthState((prev) => ({
        ...prev,
        isValidating: true,
        error: undefined
      }));

      const csrfTokenRequest = await (
        await api.get("auth/csrf", undefined, true)
      ).json();
      const csrfToken = csrfTokenRequest.csrfToken;

      const logoutRequest = await api.post(
        API_PATHS.SIGN_OUT,
        mapObjectToFormUrlEncoded({
          csrfToken,
          redirect: false,
          json: true
        }),
        { "Content-Type": "application/x-www-form-urlencoded" },
        false,
        true
      );

      if (logoutRequest.status !== 200) {
        throw new Error("Failed to log out");
      }

      // remove this code, under logout; it only for debugging
      // const getUserInfoSuccess = await getUserInfo();
      // console.log("User Info after logout: ", getUserInfoSuccess);

      return setAuthState({
        ...defaultAuthState,
        isAuthenticated: false,
        userInfo: undefined,
        error: undefined
      });
    } catch (error) {
      setAuthState({
        ...defaultAuthState,
        error: "Logout failed"
      });
    } finally {
      setAuthState((prev) => ({
        ...prev,
        isValidating: false
      }));
    }
  };
  return (
    <AuthContext.Provider value={{ authState, login, logout, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

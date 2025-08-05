import { LoginCredentials } from "@/components/Login/LoginForm";

export const API_BASE_URL = "http://localhost:3000/api/";
//export const API_BASE_URL = "https://zayats-yacht.vercel.app/api/";

//const AUTH_TOKEN = "your-auth-token"; // Replace with your actual token or import from config

const defaultHeaders = {
  "Content-Type": "application/json",
  //Authorization: `Bearer ${AUTH_TOKEN}`,
};

async function request(
  method: string,
  endpoint: string,
  data?: any,
  customHeaders: Record<string, string> = {},
  dataToJSON: boolean = true
) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
    credentials: "include",
  };
  console.log("data: ", data);

  if (data) {
    dataToJSON ? (options.body = JSON.stringify(data)) : (options.body = data);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    console.error(
      `API request failed: ${response.status} ${response.statusText}`
    );
    throw new Error(`API error: ${response.status}`);
  }
  return response;
}

export const api = {
  get: (endpoint: string, headers?: Record<string, string>) =>
    request("GET", endpoint, undefined, headers),
  post: (
    endpoint: string,
    data: any = {},
    headers?: Record<string, string>,
    dataToJSON: boolean = true
  ) => request("POST", endpoint, data, headers, dataToJSON),
  put: (endpoint: string, data?: any, headers?: Record<string, string>) =>
    request("PUT", endpoint, data, headers),
  delete: (endpoint: string, headers?: Record<string, string>) =>
    request("DELETE", endpoint, undefined, headers),
};

export const createLoginBody = (
  credentials: LoginCredentials,
  csrfToken: string
): string => {
  return mapObjectToFormUrlEncoded({
    csrfToken,
    //name: encodeURIComponent("Yacht Admin"),
    email: encodeURIComponent(credentials.email),
    password: encodeURIComponent(credentials.password),
    // email: "yacht.admin@gmail.com",
    // password: "Yacht123",
    callbackUrl: "/",
    redirect: false,
    json: true,
  });
};

export const mapObjectToFormUrlEncoded = (obj: Record<string, any>): string => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
};

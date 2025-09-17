import { Messages } from "@/helpers/messages";
import type { ScrollView } from "react-native";
import { handleServerValidationErrors } from "./handleServerValidationErrors";

type Form = {
  email: string;
  password: string;
  firstName: string;
};

describe("handleServerValidationErrors", () => {
  it("returns handled=false when response.success is true", () => {
    const setError = jest.fn();

    const result = handleServerValidationErrors<Form>({
      response: { success: true },
      setError
    });

    expect(result.handled).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it("returns handled=false when response.message is not ValidationError", () => {
    const setError = jest.fn();

    const result = handleServerValidationErrors<Form>({
      response: { success: false, message: "Some other error" },
      setError
    });

    expect(result.handled).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it("returns handled=false when response.data is missing or not an object", () => {
    const setError = jest.fn();

    const r1 = handleServerValidationErrors<Form>({
      response: {
        success: false,
        message: Messages.ValidationError,
        data: undefined
      },
      setError
    });
    expect(r1.handled).toBe(false);

    const r2 = handleServerValidationErrors<Form>({
      response: {
        success: false,
        message: Messages.ValidationError,
        data: null as any
      },
      setError
    });
    expect(r2.handled).toBe(false);

    const r3 = handleServerValidationErrors<Form>({
      response: {
        success: false,
        message: Messages.ValidationError,
        data: "oops" as any
      },
      setError
    });
    expect(r3.handled).toBe(false);

    expect(setError).not.toHaveBeenCalled();
  });

  it("returns handled=false when response.data is an object without field keys", () => {
    const setError = jest.fn();
    const r = handleServerValidationErrors<Form>({
      response: { success: false, message: Messages.ValidationError, data: {} },
      setError
    });
    expect(r.handled).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it("sets errors for each field and scrolls to the first error", () => {
    const setError = jest.fn();
    const scrollTo = jest.fn();
    const scrollRef = {
      current: { scrollTo }
    } as unknown as React.RefObject<ScrollView>;

    const inputPositions: Record<string, number> = {
      email: 120,
      password: 260
    };

    const r = handleServerValidationErrors<Form>({
      response: {
        success: false,
        data: { email: ["Invalid email"], password: "Password required" },
        message: Messages.ValidationError
      },
      setError,
      scrollRef,
      inputPositions,
      scrollOffset: 40
    });

    expect(r.handled).toBe(true);
    expect(r.firstErrorField).toBe("email");

    expect(setError).toHaveBeenCalledWith("email", {
      message: "Invalid email"
    });
    expect(setError).toHaveBeenCalledWith("password", {
      message: "Password required"
    });

    expect(scrollTo).toHaveBeenCalledWith({
      x: 0,
      y: 80, // 120 - 40
      animated: true
    });
  });

  it("supports errors nested under data.errors and data.fieldErrors", () => {
    const setError = jest.fn();
    const scrollTo = jest.fn();
    const scrollRef = {
      current: { scrollTo }
    } as unknown as React.RefObject<ScrollView>;

    handleServerValidationErrors<Form>({
      response: {
        success: false,
        message: Messages.ValidationError,
        data: { errors: { firstName: "Required" } }
      },
      setError,
      scrollRef,
      inputPositions: { firstName: 80 },
      scrollOffset: 10
    });

    expect(setError).toHaveBeenCalledWith("firstName", { message: "Required" });
    expect(scrollTo).toHaveBeenCalledWith({ x: 0, y: 70, animated: true });

    jest.clearAllMocks();

    handleServerValidationErrors<Form>({
      response: {
        success: false,
        message: Messages.ValidationError,
        data: { fieldErrors: { firstName: "Required" } }
      },
      setError,
      scrollRef,
      inputPositions: { firstName: 50 },
      scrollOffset: 60
    });

    expect(setError).toHaveBeenCalledWith("firstName", { message: "Required" });
    expect(scrollTo).toHaveBeenCalledWith({ x: 0, y: 0, animated: true });
  });

  it("does not scroll if scrollRef or inputPositions are missing", () => {
    const setError = jest.fn();

    const r1 = handleServerValidationErrors<Form>({
      response: {
        success: false,
        message: Messages.ValidationError,
        data: { firstName: "Required" }
      },
      setError,
      // no scrollRef
      inputPositions: { firstName: 80 }
    });
    expect(r1.handled).toBe(true);
    expect(r1.firstErrorField).toBe("firstName");

    const scrollTo = jest.fn();
    const scrollRef = {
      current: { scrollTo }
    } as unknown as React.RefObject<ScrollView>;

    const r2 = handleServerValidationErrors<Form>({
      response: {
        success: false,
        message: Messages.ValidationError,
        data: { firstName: "Required" }
      },
      setError,
      scrollRef
      // no inputPositions
    });
    expect(r2.handled).toBe(true);
    expect(r2.firstErrorField).toBe("firstName");
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("clamps negative scroll target to zero", () => {
    const setError = jest.fn();
    const scrollTo = jest.fn();
    const scrollRef = {
      current: { scrollTo }
    } as unknown as React.RefObject<ScrollView>;

    handleServerValidationErrors<Form>({
      response: {
        success: false,
        message: Messages.ValidationError,
        data: { email: "Invalid" }
      },
      setError,
      scrollRef,
      inputPositions: { email: 10 },
      scrollOffset: 30
    });

    expect(scrollTo).toHaveBeenCalledWith({ x: 0, y: 0, animated: true });
  });

  it("handles non-array error values and falls back to response message", () => {
    const setError = jest.fn();

    handleServerValidationErrors<Form>({
      response: {
        success: false,
        message: Messages.ValidationError,
        data: {
          firstName: 123, // number
          email: null, // null value
          password: {} // object
        }
      },
      setError
    });

    expect(setError).toHaveBeenCalledWith("firstName", { message: "123" });
    expect(setError).toHaveBeenCalledWith("email", {
      message: Messages.ValidationError
    });
    expect(setError).toHaveBeenCalledWith("password", {
      message: Messages.ValidationError
    });
  });

  it("scrolls to first field with recorded position, not necessarily first field", () => {
    const setError = jest.fn();
    const scrollTo = jest.fn();
    const scrollRef = {
      current: { scrollTo }
    } as unknown as React.RefObject<ScrollView>;

    handleServerValidationErrors<Form>({
      response: {
        success: false,
        message: Messages.ValidationError,
        data: {
          firstName: "Required",
          email: "Invalid",
          password: "Required"
        }
      },
      setError,
      scrollRef,
      inputPositions: {
        // firstName has no position recorded
        email: 150,
        password: 200
      },
      scrollOffset: 20
    });

    // Should scroll to email (first field with position), not firstName
    expect(scrollTo).toHaveBeenCalledWith({ x: 0, y: 130, animated: true });
  });
});

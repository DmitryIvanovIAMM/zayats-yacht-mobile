import type { ScrollView } from "react-native";
import { handleServerValidationErrors } from "./handleServerValidationErrors";

type Form = {
  email: string;
  password: string;
  firstName: string;
};

describe("handleServerValidationErrors", () => {
  it("returns handled=false when data is missing or not an object", () => {
    const setError = jest.fn();
    const r1 = handleServerValidationErrors<Form>({
      data: undefined,
      setError,
    });
    expect(r1.handled).toBe(false);

    const r2 = handleServerValidationErrors<Form>({
      data: null as any,
      setError,
    });
    expect(r2.handled).toBe(false);

    const r3 = handleServerValidationErrors<Form>({
      data: "oops" as any,
      setError,
    });
    expect(r3.handled).toBe(false);

    expect(setError).not.toHaveBeenCalled();
  });

  it("returns handled=false when message does not match expectedMessage", () => {
    const setError = jest.fn();
    const r = handleServerValidationErrors<Form>({
      data: { email: "Invalid" },
      message: "Other",
      expectedMessage: "ValidationError",
      setError,
    });
    expect(r.handled).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it("sets errors for each field and scrolls to the first error", () => {
    const setError = jest.fn();
    const scrollTo = jest.fn();
    const scrollRef = {
      current: { scrollTo },
    } as unknown as React.RefObject<ScrollView>;

    const inputPositions: Partial<Record<keyof Form, number>> = {
      email: 120,
      password: 260,
    };

    const r = handleServerValidationErrors<Form>({
      data: { email: ["Invalid email"], password: "Password required" },
      message: "ValidationError",
      expectedMessage: "ValidationError",
      setError,
      scrollRef,
      inputPositions,
      scrollOffset: 40,
    });

    expect(r.handled).toBe(true);
    expect(r.firstErrorField).toBe("email");

    // setError called with normalized messages
    expect(setError).toHaveBeenCalledWith("email", {
      message: "Invalid email",
    });
    expect(setError).toHaveBeenCalledWith("password", {
      message: "Password required",
    });

    // scrolled to email y - offset
    expect(scrollTo).toHaveBeenCalledWith({
      y: Math.max(120 - 40, 0),
      animated: true,
    });
  });

  it("does not scroll if scrollRef or inputPositions are missing", () => {
    const setError = jest.fn();

    const r1 = handleServerValidationErrors<Form>({
      data: { firstName: "Required" },
      message: "ValidationError",
      expectedMessage: "ValidationError",
      setError,
      // no scrollRef
      inputPositions: { firstName: 80 },
    });
    expect(r1.handled).toBe(true);
    expect(r1.firstErrorField).toBe("firstName");

    const scrollTo = jest.fn();
    const scrollRef = {
      current: { scrollTo },
    } as unknown as React.RefObject<ScrollView>;
    const r2 = handleServerValidationErrors<Form>({
      data: { firstName: "Required" },
      message: "ValidationError",
      expectedMessage: "ValidationError",
      setError,
      scrollRef,
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
      current: { scrollTo },
    } as unknown as React.RefObject<ScrollView>;

    handleServerValidationErrors<Form>({
      data: { email: "Invalid" },
      message: "ValidationError",
      expectedMessage: "ValidationError",
      setError,
      scrollRef,
      inputPositions: { email: 10 },
      scrollOffset: 30,
    });

    expect(scrollTo).toHaveBeenCalledWith({ y: 0, animated: true });
  });
});

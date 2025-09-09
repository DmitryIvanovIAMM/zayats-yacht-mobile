import React from "react";
import type { UseFormSetError } from "react-hook-form";
import { ScrollView } from "react-native";

type AnyObject = Record<string, any>;

export function handleServerValidationErrors<T extends AnyObject>(args: {
  data?: unknown;
  message?: string;
  expectedMessage?: string; // optional filter, e.g. Messages.ValidationError
  setError: UseFormSetError<T>;
  scrollRef?: React.RefObject<ScrollView>;
  inputPositions?: Partial<Record<keyof T, number>>;
  scrollOffset?: number; // default 30
}): { handled: boolean; firstErrorField?: keyof T } {
  const {
    data,
    message,
    expectedMessage,
    setError,
    scrollRef,
    inputPositions,
    scrollOffset = 30,
  } = args;

  if (!data || typeof data !== "object") return { handled: false };
  if (expectedMessage && message !== expectedMessage) return { handled: false };

  const errorObj = data as Record<string, unknown>;
  const fields = Object.keys(errorObj);

  fields.forEach((field) => {
    const raw = (errorObj as Record<string, unknown>)[field];
    const msg = Array.isArray(raw) ? String(raw[0]) : String(raw);
    setError(field as keyof T, { message: msg });
  });

  const firstErrorField = fields[0] as keyof T | undefined;
  if (firstErrorField && scrollRef?.current && inputPositions) {
    const y = inputPositions[firstErrorField as keyof T];
    if (typeof y === "number") {
      scrollRef.current.scrollTo({
        y: Math.max(y - scrollOffset, 0),
        animated: true,
      });
    }
  }

  return { handled: true, firstErrorField };
}

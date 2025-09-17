import { Messages } from "@/helpers/messages";
import type { RefObject } from "react";
import type { FieldValues, UseFormSetError } from "react-hook-form";
import type { ScrollView } from "react-native";

type MinimalActionResult = {
  success: boolean;
  data?: any;
  message?: string;
};

type ValidationErrorContext<T extends FieldValues> = {
  response: MinimalActionResult;
  setError: UseFormSetError<T>;
  scrollRef?: RefObject<ScrollView>;
  inputPositions?: Record<string, number>;
  scrollOffset?: number;
};

export function handleServerValidationErrors<T extends FieldValues>({
  response,
  setError,
  scrollRef,
  inputPositions,
  scrollOffset = 0
}: ValidationErrorContext<T>): { handled: boolean; firstErrorField?: string } {
  if (response.success) return { handled: false };
  if (response?.message !== Messages.ValidationError) return { handled: false };
  
  const payload = response?.data;

  if (!payload || typeof payload !== "object") {
    return { handled: false };
  }

  // Accept multiple shapes: { errors: {...} }, { fieldErrors: {...} }, or plain object of fields
  const fieldErrors: Record<string, unknown> =
    (payload as any).errors && typeof (payload as any).errors === "object"
      ? (payload as any).errors
      : (payload as any).fieldErrors &&
          typeof (payload as any).fieldErrors === "object"
        ? (payload as any).fieldErrors
        : payload;

  const fields = Object.keys(fieldErrors || {});
  if (!fields.length) {
    return { handled: false };
  }

  fields.forEach((field) => {
    const val = (fieldErrors as any)[field];
    const msg = Array.isArray(val)
      ? String(val[0] ?? response?.message ?? "Invalid value")
      : typeof val === "string" || typeof val === "number"
        ? String(val)
        : String(response?.message ?? "Invalid value");
    // @ts-expect-error dynamic field name is valid for react-hook-form
    setError(field, { message: msg });
  });

  const firstErrorField = fields[0];

  // Scroll to first field that has a recorded Y position
  const scrollTargetField = fields.find(
    (f) => inputPositions && inputPositions[f] != null
  );
  if (scrollTargetField && scrollRef?.current) {
    const y = Math.max(
      0,
      (inputPositions?.[scrollTargetField] ?? 0) - scrollOffset
    );
    scrollRef.current.scrollTo({ x: 0, y, animated: true });
  }

  return { handled: true, firstErrorField };
}

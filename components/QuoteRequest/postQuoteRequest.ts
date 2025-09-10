import { api } from "@/helpers/API/api";
import { API_PATHS } from "@/helpers/API/apiPaths";
import { ActionResult } from "@/helpers/API/apiTypes";
import { QuoteRequestForm } from "./quoteRequestTypes";

export const postQuoteRequest = async (
  quoteRequest: QuoteRequestForm
): Promise<ActionResult> => {
  try {
    console.log("Posting quote request:", quoteRequest);
    const response = await api.post(API_PATHS.QUOTE_REQUEST, quoteRequest, {});
    console.log("Response status:", response.status);
    const data: ActionResult = await response.json();
    console.log("Response body:", data);
    return data;
  } catch (error) {
    console.error("Error posting quote request: ", error);
    return { success: false, message: "Network error" };
  }
};

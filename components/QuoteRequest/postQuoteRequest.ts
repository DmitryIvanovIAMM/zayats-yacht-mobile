import { api } from "@/helpers/API/api";
import { API_PATHS } from "@/helpers/API/apiPaths";
import { ActionResult } from "@/helpers/API/apiTypes";
import { QuoteRequestForm } from "./quoteRequestTypes";

export const postQuoteRequest = async (
  quoteRequest: QuoteRequestForm
): Promise<ActionResult> => {
  try {
    // eslint-disable-next-line no-console
    console.log("Posting quote request:", quoteRequest);
    const response = await api.post(API_PATHS.QUOTE_REQUEST, quoteRequest, {});
    // eslint-disable-next-line no-console
    console.log("Response status:", response.status);
    const data: ActionResult = await response.json();
    // eslint-disable-next-line no-console
    console.log("Response body:", data);
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error posting quote request: ", error);
    return { success: false, message: "Network error" };
  }
};

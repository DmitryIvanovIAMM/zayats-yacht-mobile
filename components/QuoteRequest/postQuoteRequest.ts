import { api } from "@/helpers/API/api";
import { API_PATHS } from "@/helpers/API/apiPaths";
import { ActionResult } from "@/helpers/API/apiTypes";
import { QuoteRequestForm } from "./quoteRequestTypes";

export const postQuoteRequest = async (
  quoteRequest: QuoteRequestForm,
  csrfToken: string
): Promise<ActionResult> => {
  try {
    console.log("Posting quote request:", quoteRequest);
    const response = await api.post(API_PATHS.QUOTE_REQUEST, quoteRequest, {
      //const response = await api.post(API_PATHS.QUOTE_REQUEST, quoteRequest, {
      //"X-CSRF-Token": csrfToken,
    });
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error(`Error posting quote request`);
    }
    const data: ActionResult = await response.json();
    console.log("Quote request posted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error posting quote request: ", error);
    throw error;
  }
};

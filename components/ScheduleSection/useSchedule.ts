import { api } from "@/helpers/API/api";
import { API_PATHS } from "@/helpers/API/apiPaths";
import { ActionData } from "@/helpers/API/apiTypes";
import { SailingWithShipStopAndPortsFrontend } from "@/models/SailingFrontend";
import { useCallback, useState } from "react";

export interface SailingsState {
  schedule: SailingWithShipStopAndPortsFrontend[] | null;
  isLoading: boolean;
  error: string | null;
}
export const defaultSailingsState: SailingsState = {
  schedule: null,
  isLoading: false,
  error: null,
};

export const useSailings = () => {
  const [scheduleState, setScheduleState] =
    useState<SailingsState>(defaultSailingsState);

  const getNearestSailings = useCallback(async () => {
    try {
      setScheduleState({ ...defaultSailingsState, isLoading: true });
      const response = await api.get(API_PATHS.NEAREST_SAILINGS);
      console.log("getNearestSailings response: ", response.ok);
      if (!response.ok) {
        throw new Error("Failed to fetch sailings");
      }
      const data: ActionData<SailingWithShipStopAndPortsFrontend[]> =
        await response.json();
      if (data.success === false) {
        throw new Error(data.message || "Failed to fetch sailings");
      }
      console.log("getNearestSailings data: ", data);

      setScheduleState({ ...defaultSailingsState, schedule: data.data });
    } catch (error) {
      setScheduleState({
        ...defaultSailingsState,
        error: "Failed to get sailings",
      });
    } finally {
      setScheduleState((prev: SailingsState) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  return { scheduleState, getNearestSailings };
};

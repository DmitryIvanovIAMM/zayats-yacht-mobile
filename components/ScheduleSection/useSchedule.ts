import { api } from "@/helpers/API/api";
import { API_PATHS } from "@/helpers/API/apiPaths";
import { ActionData } from "@/helpers/API/apiTypes";
import { ShipStopWithSailingAndPortFrontend } from "@/models/ShipStopFrontend";
import { useCallback, useState } from "react";

export interface SailingsState {
  schedule: ShipStopWithSailingAndPortFrontend[][] | null;
  isLoading: boolean;
  error: string | null;
}
export const defaultSailingsState: SailingsState = {
  schedule: null,
  isLoading: false,
  error: null
};

export const useSailings = () => {
  const [scheduleState, setScheduleState] =
    useState<SailingsState>(defaultSailingsState);

  const getNearestSailings = useCallback(async () => {
    try {
      setScheduleState({ ...defaultSailingsState, isLoading: true });
      const response = await api.get(API_PATHS.NEAREST_SAILINGS);
      if (!response.ok) {
        throw new Error("useSailing(). Failed to fetch sailings");
      }
      const data: ActionData<ShipStopWithSailingAndPortFrontend[][]> =
        await response.json();
      if (data.success === false) {
        throw new Error(
          data.message || "useSailing(). Failed to fetch sailings"
        );
      }

      setScheduleState({ ...defaultSailingsState, schedule: data.data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("useSailing(). Error fetching sailings:", error);
      setScheduleState({
        ...defaultSailingsState,
        error: "Failed to get sailings"
      });
    } finally {
      setScheduleState((prev: SailingsState) => ({
        ...prev,
        isLoading: false
      }));
    }
  }, []);

  return { scheduleState, getNearestSailings };
};

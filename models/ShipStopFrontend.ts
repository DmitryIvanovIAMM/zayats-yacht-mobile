import { PortFrontend } from "./PortFrontend";
import { SailingFrontend } from "./SailingFrontend";

export const shipStopsFields = [
  "_id",
  "sailingId",
  "portId",
  "arrivalOn",
  "departureOn",
  "miles",
  "daysAtSea",
  "daysInPort",
];

export interface ShipStopFrontend {
  _id: string | null;
  sailingId: string;
  portId: string;
  shipId: string;
  arrivalOn: string;
  departureOn: string;
  miles: number;
  daysAtSea: number;
  daysInPort: number;
  departurePort?: PortFrontend;
  sailing?: SailingFrontend;
}

export interface ShipStopWithPortFrontend extends ShipStopFrontend {
  departurePort: PortFrontend;
}

export interface ShipStopWithSailingAndPortFrontend extends ShipStopFrontend {
  sailing: SailingFrontend;
  departurePort: PortFrontend;
}

export const shipStopsWithPortAndSailingFields = [
  "_id",
  "sailingId",
  "portId",
  "arrivalOn",
  "departureOn",
  "miles",
  "daysAtSea",
  "daysInPort",
  "departurePort",
  "sailing",
];

import { ShipStopWithPortFrontend } from "@/models/ShipStopFrontend";

export interface SailingFrontend {
  _id: string | null;
  name: string;
  isActive: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}

export const sailingFrontendFields = [
  "_id",
  "name",
  "isActive",
  "createdAt",
  "updatedAt",
];

export interface SailingWithShipStopAndPortsFrontend extends SailingFrontend {
  shipStops: ShipStopWithPortFrontend[];
}

export const sailingWithShipStopAndPortsFrontendFields = [
  ...sailingFrontendFields,
  "shipStops",
];

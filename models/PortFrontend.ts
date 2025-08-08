export interface PortFrontend {
  _id: string | null;
  portName: string;
  destinationName: string;
  imageFileName: string;
}
export const portFrontendFields = [
  "_id",
  "portName",
  "destinationName",
  "imageFileName",
];

export interface Destination {
  destinationName: string;
  ports: { _id: string; portName: string }[];
}

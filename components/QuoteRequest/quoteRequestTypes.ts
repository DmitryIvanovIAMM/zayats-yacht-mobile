import { InferType, mixed, number, object, string } from "yup";

export const LENGTH_METRIC = {
  meters: "meters",
  feet: "feet",
};
export const lengthMetric = {
  [LENGTH_METRIC.meters]: "m",
  [LENGTH_METRIC.feet]: "ft",
};
export const lengthMetricViewConnector = {
  [LENGTH_METRIC.meters]: "Meters",
  [LENGTH_METRIC.feet]: "Feet",
};

export const WEIGHT_METRIC = {
  metricTons: "metric tons",
  lbs: "lbs",
};
export const weightMetricViewConnector = {
  ["metricTons"]: "Metric Tons",
  ["lbs"]: "Lbs",
};
console.log("weightMetricViewConnector", weightMetricViewConnector);

export const PURPOSE_OF_TRANSPORT = {
  boatShow: "Boat Show",
  charter: "Charter",
  purchaseSale: "Purchase/Sale",
  yardWork: "Yard Work",
  fishingTournament: "Fishing Tournament",
  regatta: "Regatta",
  other: "Other",
};

export const quoteRequestSchema = object({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  phoneNumber: string().required("Phone is required").nullable(),
  email: string().email("Must be a valid email").required("Email is required"),
  bestTimeToContact: string().optional().nullable(),

  purpose: mixed()
    .oneOf(Object.keys(PURPOSE_OF_TRANSPORT), "Please select a valid purpose")
    .optional()
    .nullable(),

  yachtName: string().optional().nullable(),
  yachtModel: string().optional().nullable(),

  insuredValue: number()
    .typeError("Insured value must be a number")
    .required("Insured value is required"),

  length: number().typeError("Length must be a number").optional().nullable(),
  lengthUnit: mixed()
    .oneOf(Object.keys(LENGTH_METRIC), "Select a valid length unit")
    .optional()
    .nullable(),

  beam: number().typeError("Beam must be a number").optional().nullable(),
  beamUnit: mixed()
    .oneOf(Object.keys(LENGTH_METRIC), "Select a valid beam unit")
    .optional()
    .nullable(),

  weight: number().typeError("Weight must be a number").optional().nullable(),
  weightUnit: mixed()
    .oneOf(Object.keys(WEIGHT_METRIC), "Select a valid weight unit")
    .optional()
    .nullable(),

  fromWhere: string().optional().nullable(),
  toWhere: string().optional().nullable(),
  when: string().optional().nullable(),
  notes: string().optional().nullable(),
});

export type QuoteRequestForm = InferType<typeof quoteRequestSchema>;
export const defaultQuoteRequest: QuoteRequestForm = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  bestTimeToContact: "",
  purpose: "",
  yachtName: "",
  yachtModel: "",
  insuredValue: 0,
  length: 0,
  lengthUnit: LENGTH_METRIC.meters,
  beam: 0,
  beamUnit: LENGTH_METRIC.meters,
  weight: 0,
  weightUnit: "metricTons",
  fromWhere: "",
  toWhere: "",
  when: "",
  notes: "",
};

export const defaultNonEmptyQuoteRequest: QuoteRequestForm = {
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "1234567890",
  email: "john.doe@example.com",
  bestTimeToContact: "Anytime",
  purpose: "charter",
  yachtName: "My Yacht",
  yachtModel: "Yacht Model",
  insuredValue: 100000,
  length: 30,
  lengthUnit: LENGTH_METRIC.meters,
  beam: 10,
  beamUnit: LENGTH_METRIC.meters,
  weight: 50000,
  weightUnit: "metricTons",
  fromWhere: "Miami",
  toWhere: "Bahamas",
  when: "2023-12-01",
  notes: "Looking for a reliable transport service.",
};

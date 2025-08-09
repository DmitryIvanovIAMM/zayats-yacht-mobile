import { ShipStopWithSailingAndPortFrontend } from "@/models/ShipStopFrontend";

export const calculateMilesForRoute = (
  routes: ShipStopWithSailingAndPortFrontend[]
) => {
  return routes.reduce((acc: number, item) => acc + item.miles, 0);
};

export const calculateDaysInTransit = (
  routes: ShipStopWithSailingAndPortFrontend[]
) => {
  const arrivalStartPortDate = new Date(routes[0].arrivalOn);
  const arrivalEndPortDate = new Date(routes[routes.length - 1].arrivalOn);

  return daysBetween(arrivalStartPortDate, arrivalEndPortDate);
};

export const daysBetween = (date1: Date, date2: Date) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds in one day
  return Math.round(
    Math.abs((date1.setHours(0, 0, 0) - date2.setHours(0, 0, 0)) / oneDay)
  );
};

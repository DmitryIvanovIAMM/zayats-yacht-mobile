import { PATHS } from "./paths";

export interface MenuLink {
  label: string;
  section?: string;
  link?: string;
  scrollDuration?: number;
}

export const menuLinks = [
  {
    label: "Schedule",
    link: PATHS.landing,
    section: "schedule-section",
    scrollDuration: 500,
  },
  {
    label: "Get a Quote",
    link: PATHS.quoteRequest,
  },
  {
    label: "Gallery",
    link: PATHS.gallery,
  },
  {
    label: "Services",
    link: PATHS.services,
  },
  {
    label: "Instructions",
    link: PATHS.instructions,
  },
  {
    label: "Testimonials",
    //link: PATHS.landing,
    link: "/testimonials",
    section: "testimonials-section",
    scrollDuration: 500,
  },
  {
    label: "About Us",
    link: PATHS.landing,
    section: "about-us-section",
    scrollDuration: 1000,
  },
  {
    label: "Contact Us",
    link: PATHS.landing,
    section: "contact-us-section",
    scrollDuration: 1500,
  },
];

export const editScheduleMenuLinks = [
  {
    label: "Home",
    link: PATHS.landing,
    section: "schedule-section",
    scrollDuration: 500,
  },
];

export const getMenuLinks = (isAuthorized: boolean): MenuLink[] => {
  if (isAuthorized) {
    return menuLinks;
  } else {
    return [...menuLinks, ...editScheduleMenuLinks];
  }
};

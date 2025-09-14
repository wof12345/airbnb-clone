export type ActionType =
  | "location-search-dropdown"
  | "checkout"
  | "checkin"
  | "invitation-menu"
  | "date"
  | "location-search"
  | "service-selection";

export type SubItem = {
  label: string;
  action: { title: string; type: ActionType };
};

export type Type = "home" | "experience" | "service";

export type NavigationItem = {
  label: string;
  slug: Type;
  links: string[];
  hasNew: boolean;
  subItems: SubItem[];
};

export const navigationItems: NavigationItem[] = [
  {
    label: "Homes",
    slug: "home",
    links: [],
    hasNew: false,
    subItems: [
      {
        label: "Where",
        action: {
          title: "Search Destinations",
          type: "location-search-dropdown",
        },
      },
      {
        label: "Check in",
        action: {
          title: "Add dates",
          type: "checkin",
        },
      },
      {
        label: "Check out",
        action: {
          title: "Add dates",
          type: "checkout",
        },
      },
      {
        label: "Who",
        action: {
          title: "Add guests",
          type: "invitation-menu",
        },
      },
    ],
  },
  {
    label: "Experiences",
    slug: "experience",
    links: [],
    hasNew: true,
    subItems: [
      {
        label: "Where",
        action: {
          title: "Search Destinations",
          type: "location-search-dropdown",
        },
      },
      {
        label: "Date",
        action: {
          title: "Add dates",
          type: "date",
        },
      },

      {
        label: "Who",
        action: {
          title: "Add guests",
          type: "invitation-menu",
        },
      },
    ],
  },
  {
    label: "Services",
    slug: "service",
    links: [],
    hasNew: true,
    subItems: [
      {
        label: "Where",
        action: {
          title: "Search Destinations",
          type: "location-search-dropdown",
        },
      },
      {
        label: "Date",
        action: {
          title: "Add dates",
          type: "date",
        },
      },

      {
        label: "Type of service",
        action: {
          title: "Add service",
          type: "service-selection",
        },
      },
    ],
  },
];

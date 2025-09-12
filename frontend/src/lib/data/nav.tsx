export type ActionType =
  | "location-search-dropdown"
  | "date-range"
  | "invitation-menu"
  | "date"
  | "location-search";

export type SubItem = {
  label: string;
  action: { title: string; type: ActionType };
};

export type NavigationItem = {
  label: string;
  links: string[];
  hasNew: boolean;
  subItems: SubItem[];
};

export const navigationItems: NavigationItem[] = [
  {
    label: "Homes",
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
          type: "date-range",
        },
      },
      {
        label: "Check out",
        action: {
          title: "Add dates",
          type: "date-range",
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
];

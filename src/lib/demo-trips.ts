// Deterministic design fixtures. These are not accounts, saved trips, or live data.
export type Destination = {
  id: string;
  name: string;
  locationLabel: string;
  image: string;
  imageAlt: string;
};

export type DemoTrip = {
  destination: Destination;
  dateLabel: string;
  duration: string;
  title: string;
  note: string;
  people: readonly string[];
};

export const destinations = [
  {
    id: "tokyo",
    name: "Tokyo",
    locationLabel: "Japan",
    image: "/images/tokyo.jpg",
    imageAlt: "Tokyo Tower glowing above the city at dusk",
  },
  {
    id: "santorini",
    name: "Santorini",
    locationLabel: "Greece",
    image: "/images/santorini.jpg",
    imageAlt: "The lit hillside of Oia looking out over the Aegean at night",
  },
  {
    id: "iceland",
    name: "Iceland",
    locationLabel: "South Coast",
    image: "/images/iceland.jpg",
    imageAlt: "A waterfall descending through dark Icelandic cliffs",
  },
] as const satisfies readonly Destination[];

export const demoTrips = [
  {
    destination: destinations[0],
    dateLabel: "April 5–12, 2027",
    duration: "7 nights",
    title: "A week of getting wonderfully lost.",
    note: "Late-night ramen, neighborhood wanders, and a day with no plans.",
    people: ["Maya", "Leo", "Jules", "Alex"],
  },
  {
    destination: destinations[1],
    dateLabel: "June 17–22, 2027",
    duration: "5 nights",
    title: "On island time.",
    note: "Sea air, slow mornings, and one more sunset.",
    people: ["Maya", "Leo", "Alex"],
  },
  {
    destination: destinations[2],
    dateLabel: "September 4–11, 2027",
    duration: "7 nights",
    title: "A little further off the beaten path.",
    note: "Waterfalls, winding roads, and a very full camera roll.",
    people: ["Jules", "Sam", "Alex", "Leo"],
  },
] as const satisfies readonly DemoTrip[];

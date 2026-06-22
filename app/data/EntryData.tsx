export interface NavigationEntry {
  id: number;
  path: string;
  pathUrl: string;
  title: string;
  description: string;
  information: string;
  image: string;
  bgColor: string;
  iconColor: string;
  textColor: string;
  contentColor: string;
}

export const entryData: NavigationEntry[] = [
  {
    id: 0,
    path: "placestogo",
    pathUrl: "/places_to_go",
    title: "PlacesToGo",
    description: "Places Worth Visiting.",
    information:
      'Gran Canaria is often called a "miniature continent" because the landscape changes entirely every few kilometers. To give you a true taste of the island—stretching from the sun-drenched southern coast to the dramatic, misty peaks of the interior and the historic north—here are the 20 most popular and captivating places to visit.',
    image: "placesToGo.jpg",
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-400",
    textColor: "text-blue-200",
    contentColor: "text-blue-300",
  },
  {
    id: 1,
    path: "shop",
    pathUrl: "/shop",
    title: "SecondHand Shop ",
    description: "Used Items For Sale ",
    information: `Discover our curated collection of used goods! Buying second-hand reduces waste and uncovers unique finds you cannot get anywhere else. Disclaimer: This storefront is a development mockup built solely to demonstrate e-commerce functionality. The inventory listed here is for project display purposes only and no real transactions will be processed.`,
    // image: "shop.jpg",
    image: "second-hand-stamp.jpg",
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-400",
    textColor: "text-purple-200",
    contentColor: "text-purple-300",
  },
  {
    id: 2,
    path: "photogalery",
    pathUrl: "/photogallery",
    title: "Foto Slides ",
    description: "Photo From my Favorite Places",
    information: `Explore the digital gallery. This page is designed to handle high-resolution image rendering and complex layout structures. Please note: This section serves purely as a portfolio demonstration of full-stack web development and dynamic asset routing.`,

    image: "photoGallery.jpg",
    bgColor: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    textColor: "text-emerald-200",
    contentColor: "text-emerald-300",
  },
  {
    id: 3,
    path: "transfer",
    pathUrl: "/transfer",
    title: "Transport GC",
    description: "Best Transport",
    information: `Experience reliable and safe transport across Gran Canaria. As a professional driver with over 15 years of experience, I provide a fully insured and licensed taxi service you can trust. Sit back, relax, and let an expert handle the roads.`,

    image: "myTaxi.jpg",
    bgColor: "bg-amber-500/20",
    iconColor: "text-amber-400",
    textColor: "text-amber-200",
    contentColor: "text-amber-300",
  },
];

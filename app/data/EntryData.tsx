export interface NavigationEntry {
  id: number;
  path: string;
  pathUrl: string;
  title: string;
  description: string;
  information:string;
  image: string;
  bgColor: string;
  iconColor: string;
  textColor: string;
  contentColor: string;
}

export const entryData: NavigationEntry[] = [
  {
    id: 0,
    path: "#placestogo",
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
    path: "#shop",
    pathUrl: "/shop",
    title: "SecondHand Shop ",
    description: "Used Items For Sale ",
    information:
      "loremipzumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    image: "shop.jpg",
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-400",
    textColor: "text-purple-200",
    contentColor: "text-purple-300",
  },
  {
    id: 2,
    path: "#photogalery",
    pathUrl: "/photogallery",
    title: "Foto Slides ",
    description: "Photo From my Favorite Places",
    information:
      "loremipzumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    image: "photoGallery.jpg",
    bgColor: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    textColor: "text-emerald-200",
    contentColor: "text-emerald-300",
  },
  {
    id: 3,
    path: "#transfer",
    pathUrl: "/transfer",
    title: "Transport GC",
    description: "GoodTranport",
    information:
      "loremipzumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    image: "myTaxi.jpg",
    bgColor: "bg-amber-500/20",
    iconColor: "text-amber-400",
    textColor: "text-amber-200",
    contentColor: "text-amber-300",
  },
];

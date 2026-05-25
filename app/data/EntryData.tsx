export interface NavigationEntry {
  id: number;
  path: string;
  title: string;
  description: string;
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
    title: "PlacesToGo",
    description: "Places Worth Visiting.",
    image: "placesToGo.jpg",
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-400",
    textColor: "text-blue-200",
    contentColor: "text-blue-300",
  },
  {
    id: 1,
    path: "#shop",
    title: "SecondHand Shop ",
    description: "Used Items For Sale ",
    image: "shop.jpg",
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-400",
    textColor: "text-purple-200",
    contentColor: "text-purple-300",
  },
  {
    id: 2,
    path: "#photogalery",
    title: "Foto Slides ",
    description: "Photo From my Favorite Places",
    image: "photoGallery.jpg",
    bgColor: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    textColor: "text-emerald-200",
    contentColor: "text-emerald-300",
  },
  {
    id: 3,
    path: "#transfer",
    title: "Transport GC",
    description: "GoodTranport",
    image: "myTaxi.jpg",
    bgColor: "bg-amber-500/20",
    iconColor: "text-amber-400",
    textColor: "text-amber-200",
    contentColor: "text-amber-300",
  },
];

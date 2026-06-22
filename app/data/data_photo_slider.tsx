// 1. Define the strict TypeScript interfaces for validation
export interface PhotoSlideChild {
  id: number;
  path: string;
  image: string;
  title: string;
}

export interface PhotoSlide {
  id: number;
  title: string;
  path: string;
  children: PhotoSlideChild[];
}

// Base directory path for your local assets folder
const ASSET_BASE = "/images/sliderImages/";

// 2. Export your strongly-typed data array with the corrected folder nesting
export const dataPhotoSlides: PhotoSlide[] = [
  {
    id: 0,
    title: "Sorio",
    path: "sorio",
    children: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      path: "sorio",
      image: `${ASSET_BASE}sorio/sorio (${i + 1}).jpg`,
      title: "Sorio",
    })),
  },
  {
    id: 1,
    title: "Arucas",
    path: "arucas",
    children: Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      path: "arucas",
      image: `${ASSET_BASE}arucas/arucas (${i + 1}).jpg`,
      title: "arucas",
    })),
  },
  {
    id: 2,
    title: "Los Tilos de Moya",
    path: "lostilos",
    children: Array.from({ length: 33 }, (_, i) => ({
      id: i + 1,
      path: "lostilos",
      image: `${ASSET_BASE}lostilos/lostilos (${i + 1}).jpg`,
      title: "Los Tilos de Moya",
    })),
  },
  {
    id: 3,
    title: "Roque Nublo",
    path: "roquenublo",
    children: Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      path: "roquenublo",
      image: `${ASSET_BASE}roquenublo/roquenublo (${i + 1}).jpg`,
      title: "Roque Nublo",
    })),
  },
  {
    id: 4,
    title: "Moya",
    path: "moya",
    children: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      path: "moya",
      image: `${ASSET_BASE}moya/moya (${i + 1}).jpg`,
      title: "Moya",
    })),
  },
  {
    id: 5,
    title: "El Charco Azul",
    path: "charcoazul",
    children: Array.from({ length: 11 }, (_, i) => ({
      id: i + 1,
      path: "charcoazul",
      image: `${ASSET_BASE}charcoazul/charcoazul (${i + 1}).jpg`,
      title: "El Charco Azul",
    })),
  },
  {
    id: 6,
    title: "El Pico De Nieve",
    path: "picodenieve",
    children: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      path: "picodenieve",
      image: `${ASSET_BASE}picodenieve/picodenieve (${i + 1}).jpg`,
      title: "El Pico De Nieve",
    })),
  },
];

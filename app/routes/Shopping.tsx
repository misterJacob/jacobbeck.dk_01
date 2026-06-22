import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Tag,
  Info,
  X,
  MapPin,
  Sparkles,
} from "lucide-react";
import ButtonGoBack from "~/components/ButtonGoBack";

const API_BASE = "https://preview-api.jacobbeck.dk";

interface ShopItem {
  id: number;
  title: string;
  item_name: string;
  price: number;
  currency: string;
  item_condition: string;
  thumbnail_image: string;
  folder_path: string;
}

interface ShopImage {
  id: number;
  item_id: number;
  image_file: string;
  alt_text: string;
}

export default function ShopPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const mainDisplayRef = useRef<HTMLDivElement>(null);

  const handlePurchaseClick = (itemId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      const returnPath = encodeURIComponent(location.pathname);
      navigate(`/login?redirect=${returnPath}`);
      return;
    }

    console.log("User is authenticated! Proceeding with purchase...");
  };

  // --- STATE MANAGEMENT ---
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [activeSliderImages, setActiveSliderImages] = useState<ShopImage[]>([]);

  const getFullImageUrl = (folder: string, filename: string) => {
    return `${API_BASE}/shop-images/${folder}/${filename}`;
  };

  // --- EFFECT 1: FETCH MAIN SHOP PRODUCTS ---
  useEffect(() => {
    async function fetchShopItems() {
      try {
        const response = await fetch(`${API_BASE}/api/shop/items`);
        if (!response.ok) throw new Error("Database mapping network failure");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error connecting to shop items database:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchShopItems();
  }, []);

  // --- EFFECT 2: FETCH SLIDER IMAGES FOR SELECTED ITEM ---
  useEffect(() => {
    if (items.length === 0) return;

    async function fetchSliderImages() {
      const activeItem = items[selectedItemIndex];
      try {
        const response = await fetch(
          `${API_BASE}/api/shop/items/${activeItem.id}/images`,
        );
        if (!response.ok) throw new Error("Slider fetch failed");
        const data = await response.json();
        setActiveSliderImages(data);
        setSliderIndex(0);
      } catch (error) {
        console.error("Error syncing product gallery arrays:", error);
        setActiveSliderImages([]);
      }
    }
    fetchSliderImages();
  }, [selectedItemIndex, items]);

  // EFFECT 3: AUTO-SCROLL TO TOP ON MOBILE LAYOUTS
  useEffect(() => {
    if (
      items.length > 0 &&
      window.innerWidth < 1024 &&
      mainDisplayRef.current
    ) {
      mainDisplayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedItemIndex, items]);

  // --- HANDLERS FOR CAROUSEL SLIDER ---
  const nextSlide = () => {
    if (activeSliderImages.length <= 1) return;
    setDirection(1);
    setSliderIndex((prev) =>
      prev === activeSliderImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    if (activeSliderImages.length <= 1) return;
    setDirection(-1);
    setSliderIndex((prev) =>
      prev === 0 ? activeSliderImages.length - 1 : prev - 1,
    );
  };

  if (loading || items.length === 0) {
    return (
      <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-mono tracking-wider text-emerald-400 animate-pulse">
          SYNCING SHOP ENGINE...
        </p>
      </div>
    );
  }

  const currentItem = items[selectedItemIndex];
  const totalSliderPhotos = activeSliderImages.length;
  const currentSliderPhoto = activeSliderImages[sliderIndex];
  const heroDisplayImage = currentSliderPhoto
    ? getFullImageUrl(currentItem.folder_path, currentSliderPhoto.image_file)
    : getFullImageUrl(
        currentItem.folder_path,
        currentItem.thumbnail_image.split("/").pop() || "",
      );

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      filter: "blur(6px)",
    }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      filter: "blur(6px)",
    }),
  };

  return (
    <div className="w-full min-h-screen bg-slate-950/99 ">
      <div className="w-full min-h-screen bg-slate-950 max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-8 text-neutral-200 selection:bg-emerald-500/30">
        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-white via-neutral-200 to-emerald-400 bg-clip-text text-transparent tracking-tight">
              PROJECT SHOWCASE SHOP
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              Cluster Registry: Connected to api_db via Cloudflare Tunnel.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-2xl self-start md:self-auto">
            <ShoppingCart className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold font-mono text-neutral-300">
              CURRENCY: EUR (€)
            </span>
          </div>
        </div>

        {/* TWO-COLUMN HYBRID BENTO LAYOUT */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: ACTIVE INTERACTIVE DISPLAY PANEL */}
          <div
            ref={mainDisplayRef}
            className="w-full lg:col-span-5 bg-neutral-900 rounded-3xl p-6 border border-neutral-800/80 shadow-2xl flex flex-col gap-6 lg:sticky lg:top-8"
          >
            {/* Viewport Frame Box */}
            <div className="w-full h-72 md:h-80 bg-neutral-950/90 rounded-2xl border border-neutral-800 overflow-hidden relative flex items-center justify-center p-4">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.img
                  key={
                    currentSliderPhoto
                      ? currentSliderPhoto.id
                      : `thumb-${currentItem.id}`
                  }
                  src={heroDisplayImage}
                  alt={currentItem.title}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-contain p-4"
                />
              </AnimatePresence>

              {/* Status Ribbon Tag */}
              <div className="absolute top-3 left-3 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md text-emerald-400 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3" /> INSPECTOR VIEW
              </div>

              {/* Counter Mechanics Overlay */}
              {totalSliderPhotos > 1 && (
                <div className="absolute bottom-3 right-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border border-neutral-800/60 text-neutral-400">
                  {String(sliderIndex + 1).padStart(2, "0")} /{" "}
                  {String(totalSliderPhotos).padStart(2, "0")}
                </div>
              )}
            </div>

            {/* Showcase Interaction Controls Array */}
            <div className="flex items-center justify-between bg-neutral-950/40 border border-neutral-800/50 p-3 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  Asset System
                </span>
                <span className="text-xs font-bold font-mono text-neutral-300">
                  {totalSliderPhotos > 0
                    ? `${totalSliderPhotos} Gallery Enclosures`
                    : "Single Local Context"}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  disabled={totalSliderPhotos <= 1}
                  className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  aria-label="Previous Slide Frame"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={totalSliderPhotos <= 1}
                  className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  aria-label="Next Slide Frame"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Extended Meta Cards & Action Trigger */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                  <Info className="w-3 h-3" /> Metadata Inventory ID:{" "}
                  {currentItem.item_name}
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
                  {currentItem.title}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xl font-mono font-bold text-emerald-400">
                    {currentItem.price} {currentItem.currency}
                  </span>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-400 capitalize">
                    Condition: {currentItem.item_condition}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handlePurchaseClick(currentItem.id)}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-neutral-950 font-bold text-sm rounded-xl tracking-wide font-sans shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                Proceed with Purchase Request
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE PRODUCTS COMPACT GRID */}
          <div className="w-full lg:col-span-7 flex flex-col gap-4">
            <div className="text-xs font-mono font-bold text-neutral-500 tracking-widest uppercase mb-1 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-neutral-500" /> Available
              Inventory Database Matrix
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item, index) => {
                const isSelected = selectedItemIndex === index;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemIndex(index)}
                    className={`group relative rounded-2xl p-4 transition-all duration-300 cursor-pointer border flex flex-col justify-between gap-4 select-none ${
                      isSelected
                        ? "bg-neutral-900 border-emerald-500/80 shadow-md shadow-emerald-950/20"
                        : "bg-neutral-900/40 border-neutral-800/80 hover:bg-neutral-900 hover:border-neutral-700"
                    }`}
                  >
                    {/* Item Image Display Context */}
                    <div className="w-full h-40 bg-neutral-950/60 rounded-xl border border-neutral-800 overflow-hidden flex items-center justify-center p-3 relative">
                      <img
                        src={getFullImageUrl(
                          item.folder_path,
                          item.thumbnail_image.split("/").pop() || "",
                        )}
                        alt={item.title}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />

                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-emerald-500 text-neutral-950 p-1 rounded-md text-[9px] font-mono font-black uppercase tracking-wider shadow-sm">
                          ACTIVE VIEW
                        </div>
                      )}
                    </div>

                    {/* Pricing and Details Strip */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors truncate pr-2">
                          {item.title}
                        </h3>
                        <span className="font-mono text-sm font-bold text-neutral-300">
                          {item.price}
                          {item.currency}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <span>Ref: {item.item_name}</span>
                        <span className="text-[10px] bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800 text-neutral-400 capitalize">
                          {item.item_condition}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* GLOBAL DISMISS FOOTER MOUNT */}
        <div className="flex items-center justify-center mt-4 border-t border-neutral-900 pt-6">
          <ButtonGoBack />
        </div>
      </div>
    </div>
  );
}

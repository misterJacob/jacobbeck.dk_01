import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import ButtonGoBack from "~/components/ButtonGoBack";

const API_BASE = "https://preview-api.jacobbeck.dk";

interface SlideCategory {
  id: number;
  title: string;
  path: string;
}

interface PhotoChild {
  id: number;
  slide_id: number;
  path: string;
  image: string;
  title: string;
}

export default function PhotoGallery() {
  // 1. Unified State for API data structures
  const [categories, setCategories] = useState<SlideCategory[]>([]);
  const [photos, setPhotos] = useState<PhotoChild[]>([]);

  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1 = next, -1 = prev
  const [loading, setLoading] = useState<boolean>(true);

  // Helper function to build full path URLs to FastAPI static mount
  const getImageUrl = (path: string, imageName: string) => {
    return `${API_BASE}/images/${path}/${imageName}`;
  };

  // 2. Initial Run: Fetch Slide Categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${API_BASE}/api/slides`);
        if (!response.ok) throw new Error("Network status error");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching slide categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // 3. Dependent Run: Fetch Photos whenever the category selection updates
  useEffect(() => {
    if (categories.length === 0) return;

    async function fetchPhotos() {
      const activeCategory = categories[categoryIndex];
      try {
        const response = await fetch(
          `${API_BASE}/api/slides/${activeCategory.id}/children`,
        );
        if (!response.ok) throw new Error("Network status error");
        const data = await response.json();
        setPhotos(data);
        setPhotoIndex(0); // Safely snap carousel tracking pointer back to zero
      } catch (error) {
        console.error("Error fetching active category photos:", error);
        setPhotos([]);
      }
    }
    fetchPhotos();
  }, [categoryIndex, categories]);

  // Early fallback render state while handshake is active
  if (loading || categories.length === 0) {
    return (
      <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <p className="text-sm font-medium text-slate-400 animate-pulse">
          Syncing assets...
        </p>
        <ButtonGoBack />
      </div>
    );
  }

  const currentCategory = categories[categoryIndex];
  const totalPhotos = photos.length;

  // 4. Fallback safe calculation values for bento layout mapping
  const currentPhoto = photos[photoIndex];
  const heroImg = currentPhoto
    ? getImageUrl(currentPhoto.path, currentPhoto.image)
    : "";

  const subPhoto1 =
    totalPhotos > 0 ? photos[(photoIndex + 1) % totalPhotos] : null;
  const subImg1 = subPhoto1
    ? getImageUrl(subPhoto1.path, subPhoto1.image)
    : heroImg;

  const subPhoto2 =
    totalPhotos > 0 ? photos[(photoIndex + 2) % totalPhotos] : null;
  const subImg2 = subPhoto2
    ? getImageUrl(subPhoto2.path, subPhoto2.image)
    : heroImg;

  // 5. Handlers to shift internal photos
  const nextPhoto = () => {
    if (totalPhotos <= 1) return;
    setDirection(1);
    setPhotoIndex((prev) => (prev === totalPhotos - 1 ? 0 : prev + 1));
  };

  const prevPhoto = () => {
    if (totalPhotos <= 1) return;
    setDirection(-1);
    setPhotoIndex((prev) => (prev === 0 ? totalPhotos - 1 : prev - 1));
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  return (
    <div className="w-full min-h-screen bg-slate-950/99 ">
      <div className="w-full min-h-screen bg-slate-950 max-w-7xl mx-auto p-4 md:p-8 h-auto flex flex-col gap-6 backdrop-blur-lg">
        {/* CATEGORY SELECTOR TABS (Changes the Parent Location) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-neutral-800">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setCategoryIndex(index)}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200 ${
                categoryIndex === index
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* BENTO GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4 h-[550px] relative">
          {/* 1. Main Hero Image */}
          <div className="col-span-1 md:col-span-3 row-span-3 relative rounded-3xl overflow-hidden bg-neutral-900 shadow-xl">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              {heroImg ? (
                <motion.img
                  key={currentPhoto?.id}
                  src={heroImg}
                  alt={currentPhoto?.title || "Main view"}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500">
                  No media available
                </div>
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* 2. Top Right Supporting Image */}
          <div className="hidden md:block col-span-1 row-span-1 relative rounded-3xl overflow-hidden bg-neutral-900 shadow-lg">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              {subImg1 && (
                <motion.img
                  key={subPhoto1 ? `sub1-${subPhoto1.id}` : "sub1-empty"}
                  src={subImg1}
                  alt="Supporting view 1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.03 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </AnimatePresence>
          </div>

          {/* 3. Middle Right Supporting Image */}
          <div className="hidden md:block col-span-1 row-span-1 relative rounded-3xl overflow-hidden bg-neutral-900 shadow-lg">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              {subImg2 && (
                <motion.img
                  key={subPhoto2 ? `sub2-${subPhoto2.id}` : "sub2-empty"}
                  src={subImg2}
                  alt="Supporting view 2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.06 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </AnimatePresence>
          </div>

          {/* 4. Information & Photo Navigation Controls */}
          <div className="col-span-1 row-span-1 bg-neutral-900 rounded-3xl p-6 shadow-lg flex flex-col justify-between border border-neutral-800 z-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {currentCategory?.title}
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight capitalize">
                Snapshot Gallery
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Browsing cluster assets via Swarm proxy service.
              </p>
            </div>

            {/* Slider Arrow Mechanics */}
            <div className="flex items-center justify-between w-full mt-4">
              <div className="text-xs font-mono font-bold text-neutral-400">
                {String(totalPhotos > 0 ? photoIndex + 1 : 0).padStart(2, "0")}{" "}
                / {String(totalPhotos).padStart(2, "0")}
              </div>

              <div className="flex gap-1.5">
                <button
                  onClick={prevPhoto}
                  disabled={totalPhotos <= 1}
                  className="p-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-neutral-800 transition-colors"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={nextPhoto}
                  disabled={totalPhotos <= 1}
                  className="p-2.5 rounded-full bg-white hover:bg-neutral-200 disabled:opacity-40 disabled:hover:bg-white transition-colors"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-4 h-4 text-neutral-950" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <ButtonGoBack />
      </div>
    </div>
  );
}

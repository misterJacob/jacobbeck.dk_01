import { useState } from "react";
import PhotoCompilationModal from "./PhotoCompilationModal";
import "./PhotoCompilation.css";

type PhotoCompilationButtonProps = {
  apiBase: string;
  photoCount?: number;
  intervalMs?: number;
  title?: string;
  label?: string;
  galleryHref?: string;
};

export default function PhotoCompilationButton({
  apiBase,
  photoCount = 8,
  intervalMs = 4000,
  title = "Gran Canaria in pictures",
  label = "Watch a short photo compilation of the island",
  galleryHref = "/photogallery",
}: PhotoCompilationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
        className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white/10 flex items-center justify-center space-x-2"
      >
        <span className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 duration-300 transition-colors">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-4 h-4 sm:w-5 sm:h-5 fill-white"
          >
            <path d="M7 4.5a1 1 0 0 1 1.5-.87l12 7.5a1 1 0 0 1 0 1.74l-12 7.5A1 1 0 0 1 7 19.5Z" />
          </svg>
        </span>
        <span>{label}</span>
      </button>

      {isOpen && (
        <PhotoCompilationModal
          apiBase={apiBase}
          photoCount={photoCount}
          intervalMs={intervalMs}
          title={title}
          galleryHref={galleryHref}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

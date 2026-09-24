import { useEffect, useId, useRef, useState } from "react";
import {
  chooseCompilationPhotos,
  loadCompilationPhotos,
  type CompilationPhoto,
} from "~/services/photoCompilationService";

type Props = {
  apiBase: string;
  photoCount: number;
  intervalMs: number;
  title: string;
  galleryHref: string;
  onClose: () => void;
};

export default function PhotoCompilationModal({
  apiBase,
  photoCount,
  intervalMs,
  title,
  galleryHref,
  onClose,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [pool, setPool] = useState<CompilationPhoto[]>([]);
  const [slides, setSlides] = useState<CompilationPhoto[]>([]);
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<CompilationPhoto | null>(null);
  const [readySrc, setReadySrc] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reload, setReload] = useState(0);
  const current = slides[index];
  const ready = Boolean(current && readySrc === current.src);
  const duration = Number.isFinite(intervalMs)
    ? Math.max(1500, Math.min(15000, intervalMs))
    : 4000;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = oldOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, []);

  useEffect(() => {
    const updateVisibility = () => setVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    const timeout = window.setTimeout(() => controller.abort(), 25000);
    setStatus("loading");
    setPlaying(false);
    setFinished(false);
    setPrevious(null);
    setReadySrc(null);

    loadCompilationPhotos(apiBase, controller.signal)
      .then((photos) => {
        if (disposed) return;
        setPool(photos);
        setSlides(chooseCompilationPhotos(photos, photoCount));
        setIndex(0);
        setStatus("ready");
        setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      })
      .catch(() => {
        if (!disposed) setStatus("error");
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [apiBase, photoCount, reload]);

  // Start each photo's timer only once its image has actually loaded.
  useEffect(() => {
    if (status !== "ready" || !current || !ready || !playing || !visible || finished) return;
    const timer = window.setTimeout(() => {
      if (index === slides.length - 1) {
        setFinished(true);
        setPlaying(false);
      } else {
        setPrevious(current);
        setReadySrc(null);
        setIndex(index + 1);
      }
    }, duration);
    return () => window.clearTimeout(timer);
  }, [status, current, ready, playing, visible, finished, index, slides.length, duration]);

  // Keep just one upcoming photo warm in the browser's image cache.
  useEffect(() => {
    const next = slides[index + 1];
    if (!next || status !== "ready" || !visible) return;
    const image = new Image();
    image.src = next.src;
  }, [slides, index, status, visible]);

  function showSlide(next: number) {
    if (next < 0 || next >= slides.length || next === index) return;
    if (ready) setPrevious(current);
    setReadySrc(null);
    setIndex(next);
    setPlaying(false);
    setFinished(false);
  }

  function startNewSelection() {
    setSlides(chooseCompilationPhotos(pool, photoCount));
    setIndex(0);
    setPrevious(null);
    setReadySrc(null);
    setFinished(false);
    setPlaying(true);
  }

  function skipBrokenPhoto(src: string) {
    const remaining = slides.filter((photo) => photo.src !== src);
    setPool((photos) => photos.filter((photo) => photo.src !== src));
    setSlides(remaining);
    setIndex(Math.min(index, Math.max(0, remaining.length - 1)));
    setReadySrc(null);
    if (remaining.length === 0) {
      setPlaying(false);
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="photo-compilation-dialog"
      aria-labelledby={titleId}
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={() => {
        // A StrictMode cleanup may close and immediately reopen the dialog.
        if (!dialogRef.current?.open) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (status !== "ready") return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showSlide(index + 1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          showSlide(index - 1);
        }
      }}
    >
      <div className="photo-compilation-header">
        <div>
          <p className="photo-compilation-eyebrow">A short island escape</p>
          <h2 id={titleId}>{title}</h2>
        </div>
        <button
          type="button"
          autoFocus
          className="photo-compilation-close"
          aria-label="Close photo compilation"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="photo-compilation-stage">
        {status === "loading" && (
          <div className="photo-compilation-message" role="status">
            <span className="photo-compilation-spinner" aria-hidden="true" />
            <p>Choosing your island views…</p>
          </div>
        )}

        {status === "error" && (
          <div className="photo-compilation-message">
            <p role="alert">We couldn't load the photos. Please try again.</p>
            <button type="button" className="photo-compilation-action" onClick={() => setReload((value) => value + 1)}>
              Try again
            </button>
          </div>
        )}

        {status === "ready" && current && (
          <>
            {previous && (
              <img className="photo-compilation-image photo-compilation-previous" src={previous.src} alt="" aria-hidden="true" />
            )}
            <img
              key={current.src}
              className={`photo-compilation-image${ready ? " photo-compilation-image-ready" : ""}`}
              src={current.src}
              alt={current.title}
              decoding="async"
              onLoad={() => setReadySrc(current.src)}
              onError={() => skipBrokenPhoto(current.src)}
            />
            {!ready && <span className="photo-compilation-loading-image">Loading photo…</span>}
            {ready && !finished && (
              <div className="photo-compilation-caption">
                <span>{current.album}</span>
              </div>
            )}
            {finished && (
              <div className="photo-compilation-ending">
                <p className="photo-compilation-eyebrow">Preview complete</p>
                <h3>Keep exploring Gran Canaria</h3>
                <button type="button" className="photo-compilation-action" onClick={startNewSelection}>
                  Watch another selection
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="photo-compilation-footer">
        {status === "ready" && current && (
          <>
            <div className="photo-compilation-progress" aria-hidden="true">
              {slides.map((photo, position) => (
                <span key={photo.src} className={position <= index ? "photo-compilation-progress-seen" : ""} />
              ))}
            </div>
            <div className="photo-compilation-player">
              <p className="photo-compilation-counter" aria-live={playing ? "off" : "polite"}>
                {finished ? "Preview complete" : `Photo ${index + 1} of ${slides.length}`}
              </p>
              <div className="photo-compilation-controls">
                <button type="button" className="photo-compilation-control" onClick={() => showSlide(index - 1)} disabled={index === 0}>
                  Previous
                </button>
                <button
                  type="button"
                  className="photo-compilation-control photo-compilation-play"
                  onClick={() => finished ? startNewSelection() : setPlaying((value) => !value)}
                >
                  {finished ? "Replay" : playing ? "Pause" : "Play"}
                </button>
                <button type="button" className="photo-compilation-control" onClick={() => showSlide(index + 1)} disabled={index === slides.length - 1}>
                  Next
                </button>
              </div>
            </div>
          </>
        )}
        <a className="photo-compilation-gallery" href={galleryHref} onClick={onClose}>
          Open the full photo gallery <span aria-hidden="true">→</span>
        </a>
      </div>
    </dialog>
  );
}

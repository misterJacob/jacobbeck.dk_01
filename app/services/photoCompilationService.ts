export type CompilationPhoto = {
  id: string;
  src: string;
  title: string;
  album: string;
};

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

async function fetchJson(url: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Photo request failed (${response.status}).`);
  }
  return response.json();
}

// Load photo metadata only. The player loads the selected images separately.
export async function loadCompilationPhotos(
  apiBase: string,
  signal: AbortSignal,
): Promise<CompilationPhoto[]> {
  const base = apiBase.replace(/\/+$/, "");
  const response = await fetchJson(`${base}/api/slides`, signal);

  if (!Array.isArray(response)) {
    throw new Error("The photo library returned an unexpected response.");
  }

  const albums = response.filter(
    (item): item is JsonRecord =>
      isRecord(item) &&
      typeof item.id === "number" &&
      Number.isInteger(item.id) &&
      item.id >= 0,
  );
  const photos = new Map<string, CompilationPhoto>();

  // Bound concurrent requests, even if the library grows to many albums.
  for (let start = 0; start < albums.length; start += 3) {
    const batch = albums.slice(start, start + 3);
    const results = await Promise.allSettled(
      batch.map(async (album) => {
        const children = await fetchJson(
          `${base}/api/slides/${album.id}/children`,
          signal,
        );
        if (!Array.isArray(children)) {
          throw new Error("An album returned an unexpected response.");
        }

        return children.flatMap((child): CompilationPhoto[] => {
          if (!isRecord(child)) return [];
          const folder = text(child.path) || text(album.path);
          const filename = text(child.image);
          const segments = folder.split("/").filter(Boolean);
          if (
            segments.length === 0 ||
            segments.some((part) => part === "." || part === "..") ||
            !filename ||
            filename.includes("/") ||
            filename.includes("\\")
          ) {
            return [];
          }

          const src = `${base}/images/${segments.map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
          const albumTitle = text(album.title) || "Photo gallery";
          return [{
            id: src,
            src,
            title: text(child.title) || albumTitle,
            album: albumTitle,
          }];
        });
      }),
    );

    if (signal.aborted) {
      throw new DOMException("Photo loading cancelled.", "AbortError");
    }
    for (const result of results) {
      if (result.status === "fulfilled") {
        for (const photo of result.value) photos.set(photo.src, photo);
      }
    }
  }

  if (photos.size === 0) {
    throw new Error("No photos could be loaded from the library.");
  }
  return [...photos.values()];
}

// Fisher–Yates shuffle: each compilation contains distinct photos.
export function chooseCompilationPhotos(
  photos: readonly CompilationPhoto[],
  count: number,
): CompilationPhoto[] {
  const shuffled = [...photos];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const size = Number.isFinite(count)
    ? Math.max(1, Math.min(30, Math.floor(count)))
    : 8;
  return shuffled.slice(0, size);
}

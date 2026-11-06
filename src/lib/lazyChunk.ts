import { ComponentType, LazyExoticComponent, lazy } from "react";

type ChunkModule<P> = { default: ComponentType<P> };

/**
 * One import shared by `lazy` and hover/focus prefetching. A failed import
 * is forgotten, so the next attempt fetches the chunk again; React caches
 * a rejected lazy component forever, so `create` makes a fresh one.
 */
export function createChunk<P extends object>(
  load: () => Promise<ChunkModule<P>>,
) {
  let pending: Promise<ChunkModule<P>> | null = null;
  const loadOnce = () => {
    pending ??= load().catch((error) => {
      pending = null;
      throw error;
    });
    return pending;
  };
  return {
    /** Start the download early; failures surface on the real render. */
    prefetch: () => {
      loadOnce().catch(() => {});
    },
    create: (): LazyExoticComponent<ComponentType<P>> => lazy(loadOnce),
  };
}

import React from "react";

interface ChunkBoundaryProps {
  children: React.ReactNode;
  /** Called once when a child (usually a lazy chunk) fails to render. */
  onError?: (error: unknown) => void;
}

interface ChunkBoundaryState {
  failed: boolean;
}

/**
 * Wraps a lazy Suspense subtree. If the chunk fails to load (offline, or
 * a stale deploy) it renders nothing instead of blanking the page; the
 * parent resets it through `onError` so the next click can try again.
 */
export class ChunkBoundary extends React.Component<
  ChunkBoundaryProps,
  ChunkBoundaryState
> {
  state: ChunkBoundaryState = { failed: false };

  static getDerivedStateFromError(): ChunkBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    this.props.onError?.(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default ChunkBoundary;

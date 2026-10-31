import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` during the build-time prerender and during the browser's
 * hydration pass, `true` on every render after that.
 *
 * Components whose output depends on browser-only APIs (Notification,
 * navigator, localStorage, matchMedia, ...) must render the same markup as
 * the prerendered HTML until this flips, otherwise React reports a
 * hydration mismatch. Uses useSyncExternalStore's separate server snapshot
 * instead of a mount effect, so it needs no extra state update.
 */
export const useHasMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

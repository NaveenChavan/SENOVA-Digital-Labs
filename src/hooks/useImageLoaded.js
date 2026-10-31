import { useCallback, useState } from "react";

/**
 * Tracks whether an <img> has loaded (or failed), for fade-in placeholders.
 *
 *   const { loaded, failed, imgProps } = useImageLoaded();
 *   <img src={...} {...imgProps} className={loaded ? "opacity-100" : "opacity-0"} />
 *
 * Why not plain onLoad: the site is prerendered, so the browser can finish
 * loading an image from the static HTML BEFORE React hydrates and attaches
 * its onLoad listener. That `load` event is then missed and the image stays
 * at opacity 0 forever. The ref callback below runs when React attaches to
 * the element and catches images that already completed.
 */
export const useImageLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const ref = useCallback((img) => {
    if (!img || !img.complete) return;
    // complete + naturalWidth 0 = finished with an error before hydration.
    if (img.naturalWidth > 0) setLoaded(true);
    else setFailed(true);
  }, []);

  return {
    loaded,
    failed,
    imgProps: {
      ref,
      onLoad: () => setLoaded(true),
      onError: () => setFailed(true),
    },
  };
};

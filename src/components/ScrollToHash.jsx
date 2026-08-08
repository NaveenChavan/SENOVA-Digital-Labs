import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't scroll to hash anchors automatically. This mirrors
// native browser behavior: on route/hash change, scroll to the element
// matching the hash, or to the top of the page if there is none.
//
// On the very first mount (initial page load) we jump instantly rather
// than smooth-scrolling, since layout is still settling (fonts, lazy
// chunks, images) and animating a scroll during that settle causes
// visible tearing/overlap between sections.
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const isInitialLoad = performance.getEntriesByType
      ? performance.getEntriesByType("navigation")[0]?.type !== "navigate" ||
        document.readyState !== "complete"
      : false;

    const scrollToTarget = () => {
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    // Give layout a moment to settle (images/fonts/lazy chunks) before
    // measuring scroll targets, especially important on first load.
    const raf = requestAnimationFrame(() => {
      setTimeout(scrollToTarget, isInitialLoad ? 150 : 0);
    });

    return () => cancelAnimationFrame(raf);
  }, [hash, pathname]);

  return null;
};

export default ScrollToHash;

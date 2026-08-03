import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't scroll to hash anchors automatically. This mirrors
// native browser behavior: on route/hash change, scroll to the element
// matching the hash, or to the top of the page if there is none.
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [hash, pathname]);

  return null;
};

export default ScrollToHash;

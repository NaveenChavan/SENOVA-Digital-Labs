import { useEffect, useRef } from "react";

// Scroll-triggered fade/rise for below-the-fold content, done with one shared
// IntersectionObserver and CSS transitions (see .reveal in index.css).
//
// The markup is identical on the server snapshot and on the client, and the
// "visible" state is applied by toggling a class directly on the DOM node, not
// through React state. That keeps hydration of prerendered HTML mismatch-free.
let sharedObserver;
const getObserver = () => {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            sharedObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
  }
  return sharedObserver;
};

const Reveal = ({ children, delay = 0, className = "", as: Tag = "div" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? { "--reveal-delay": `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;

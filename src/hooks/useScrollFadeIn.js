import { useEffect, useRef } from "react";

export default function useScrollFadeIn(direction = "up", duration = 1, delay = 0) {
  const element = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`;
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translate(0)";
        }
      },
      { threshold: 0.1 }
    );

    const current = element.current;
    if (current) {
      current.style.opacity = 0;
      current.style.transform =
        direction === "up"
          ? "translateY(20px)"
          : direction === "down"
          ? "translateY(-20px)"
          : "translateX(20px)";
      observer.observe(current);
    }

    return () => current && observer.unobserve(current);
  }, [direction, duration, delay]);

  return element;
}

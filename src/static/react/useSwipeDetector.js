import { useState, useEffect } from "react";

/**
 * @returns {{direction: "left" | "right" | "none", distance: number}}
 */
function useSwipeDetector() {
  const [direction, setDirection] = useState("none");
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    var touchStartX = 0;
    var touchEndX = 0;

    const onTouchStart = (e) => (touchStartX = e.changedTouches[0].screenX);
    const onTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;

      if (touchEndX != touchStartX) {
        setDirection(touchEndX < touchStartX ? "left" : "right");
        setDistance(Math.abs(touchEndX - touchStartX));
      } else {
        setDirection("none");
        setDistance(0);
      }
    };

    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return { direction, distance };
}

export default useSwipeDetector;

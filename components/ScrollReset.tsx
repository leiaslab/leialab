"use client";
import { useEffect } from "react";

export default function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (location.hash) {
      history.replaceState(history.state, "", location.pathname + location.search);
    }
    // Apply again after hydration, which can focus the initial hash target.
    const startAtTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    startAtTop();
    const frame = requestAnimationFrame(startAtTop);
    return () => cancelAnimationFrame(frame);
  }, []);
  return null;
}

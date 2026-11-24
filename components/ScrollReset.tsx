"use client";

import { useEffect } from "react";

export default function ScrollReset() {
  useEffect(() => {
    // Re-arm after hydration without overriding a visitor's own scrolling.
    window.dispatchEvent(new Event("leia:page-ready"));
  }, []);
  return null;
}

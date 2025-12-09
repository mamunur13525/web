"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const mainScrollContainer = document.getElementById(
      "main-scroll-container"
    );
    if (mainScrollContainer) {
      mainScrollContainer.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

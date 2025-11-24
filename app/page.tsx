"use client";

import { useEffect, useState } from "react";

const ICON_SUFFIX = "-boxes";
export default function Home() {
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    // Set initial hash
    setCurrentHash(window.location.hash.slice(1));

    // Listen for hash changes
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.slice(1));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleAnchorClick = (id: string) => {
    if (currentHash === id) {
      // Remove hash if already selected
      window.history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
      setCurrentHash("");
    } else {
      // Add/update hash
      window.location.hash = id;
    }
  };
  return (
    <div className="min-h-screen px-20 pb-20 pt-12 max-w-5xl mx-auto">
      <div className="max-w-[1512px] mx-auto">
        <p className="font-['Molengo',sans-serif] text-[36px] text-white mb-8 leading-normal">
          Continuous AI
        </p>

        <p className="font-['Molengo',sans-serif] text-[18px] text-white mb-8 leading-normal max-w-[1393px]">
          Developers are drowning in AI-generated code. Continuous AI addresses this by automating the workflows around code, not just the code itself. The role of the software engineer is shifting from prompting AI to designing processes that run automatically.
        </p>
      </div>
    </div>
  );
}

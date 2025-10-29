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

        <p className="font-['Molengo',sans-serif] text-[18px] text-white mb-16 leading-normal max-w-[1393px]">
          <span>LLMs are capable of completing </span>
          <a
            href="https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/"
            className="animated-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            increasingly long tasks
          </a>
          <span>
            . This trend makes it possible to delegate{" "}
            <a
              href="https://en.wikipedia.org/wiki/No_Silver_Bullet"
              className="animated-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              accidental complexity
            </a>{" "}
            to agents while we focus on essential complexity. The ceiling for
            productivity is much higher, but requires adopting new methods,
            strengthening existing best practices, and measuring success.
          </span>
        </p>

        <div className="space-y-16">
          {/* Shift left, systematically */}
          <div
            id="shift-left-systematically"
            className="flex gap-6 items-start"
          >
            <div className="w-[100px] h-[100px] flex-shrink-0">
              <img
                alt="Shift left systematically icon"
                className="w-full h-full object-contain"
                src={`/icon3${ICON_SUFFIX}.svg`}
              />
            </div>
            <div className="font-['Molengo',sans-serif] text-[18px] text-white leading-normal flex-1">
              <p className="mb-2">
                <span
                  className={`animated-anchor ${
                    currentHash === "shift-left-systematically" ? "active" : ""
                  }`}
                  onClick={() => handleAnchorClick("shift-left-systematically")}
                >
                  Shift left to agents
                </span>
              </p>
              <p>
                Adopt event-based agents for the first pass on code review,
                planning, and repetitive tasks throughout your software
                development lifecycle.
                {/* 
                    - Event-based agents
                    - Spec-driven development
                    - AI code review
                  */}
              </p>
            </div>
          </div>

          {/* Build for 10x scale */}
          <div id="build-for-10x-scale" className="flex gap-6 items-start">
            <div className="w-[100px] h-[100px] flex-shrink-0">
              <img
                alt="Build for 10x scale icon"
                className="w-full h-full object-contain"
                src={`/icon1${ICON_SUFFIX}.svg`}
              />
            </div>
            <div className="font-['Molengo',sans-serif] text-[18px] text-white leading-normal flex-1">
              <p className="mb-2">
                <span
                  className={`animated-anchor ${
                    currentHash === "build-for-10x-scale" ? "active" : ""
                  }`}
                  onClick={() => handleAnchorClick("build-for-10x-scale")}
                >
                  Build for 10x scale
                </span>
              </p>
              <p>
                Invest in your platform team as if you have 10x the number of
                developers. The same best practices apply, but their effects are
                amplified as AI increases team velocity.
                {/* 
                    - Ephemeral environments (https://ephemeralenvironments.io)
                    - CI/CD
                    - Testing
                  */}
              </p>
            </div>
          </div>

          {/* Measure everything */}
          <div id="measure-everything" className="flex gap-6 items-start">
            <div className="w-[100px] h-[100px] flex-shrink-0">
              <img
                alt="Measure everything icon"
                className="w-full h-full object-contain"
                src={`/icon2${ICON_SUFFIX}.svg`}
              />
            </div>
            <div className="font-['Molengo',sans-serif] text-[18px] text-white leading-normal flex-1">
              <p className="mb-2">
                <span
                  className={`animated-anchor ${
                    currentHash === "measure-everything" ? "active" : ""
                  }`}
                  onClick={() => handleAnchorClick("measure-everything")}
                >
                  Measure intervention rates
                </span>
              </p>
              <p>
                Measure intervention rates to find improvement opportunities and
                rely on{" "}
                <a
                  href="https://dora.dev/quickcheck/"
                  className="animated-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DORA metrics
                </a>{" "}
                to optimize overall performance.
                {/* 
                    - DORA
                    - Intervention rates
                    - ?
                  */}
              </p>
            </div>
          </div>
        </div>

        <p className="font-['Molengo',sans-serif] text-[18px] text-white mt-16 leading-normal max-w-[1393px]"></p>
      </div>
    </div>
  );
}

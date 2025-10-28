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
    <div className="bg-[#212121] min-h-screen px-20 py-20">
      <div className="max-w-[1512px] mx-auto">
        <p className="font-['Molengo',sans-serif] text-[36px] text-white mb-8 leading-normal">
          Continuous AI
        </p>

        <p className="font-['Molengo',sans-serif] text-[18px] text-white mb-16 leading-normal max-w-[1393px]">
          <span>As AI capabilities </span>
          <a
            href="https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/"
            className="animated-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            grow exponentially
          </a>
          <span>
            , we&apos;re shifting from just-in-time prompting to{" "}
            <a
              href="https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html"
              className="animated-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              spec-driven development
            </a>
            . The role of AI isn&apos;t to replace developers—it&apos;s to
            separate{" "}
            <a
              href="https://en.wikipedia.org/wiki/No_Silver_Bullet"
              className="animated-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              essential complexity
            </a>{" "}
            from accidental complexity.
          </span>
        </p>

        <div className="space-y-10">
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
                Invest in your platform team and infrastructure as if your
                company is already 10x larger. The same software development
                best practices apply, but their effects are amplified with AI.
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
                  Measure everything
                </span>
              </p>
              <p>
                You can&apos;t automate what you don&apos;t understand. You
                can&apos;t improve what you don&apos;t measure. Use{" "}
                <a
                  href="https://dora.dev/quickcheck/"
                  className="animated-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DORA metrics
                </a>{" "}
                and intervention rates to optimize your system.
              </p>
            </div>
          </div>

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
                  Shift left, systematically
                </span>
              </p>
              <p>
                Human review → Agent review → Generation rules. Each shift
                reduces intervention rates—the new build times.
              </p>
            </div>
          </div>
        </div>

        <p className="font-['Molengo',sans-serif] text-[18px] text-white mt-16 leading-normal max-w-[1393px]">
          Continuous AI will seem optional until it becomes essential. Success
          comes from systematically reducing workflow friction, not fancy
          frameworks. It&apos;s not a project—it&apos;s a capability that forms
          the foundation for the next decade of software development.
        </p>
      </div>
    </div>
  );
}

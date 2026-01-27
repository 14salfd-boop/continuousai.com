"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("manifesto");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --bg: #0a0a0a;
          --fg: #f5f5f5;
          --accent: #c8ff00;
          --muted: #666;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Syne', sans-serif;
          background: var(--bg);
          color: var(--fg);
          line-height: 1.6;
          overflow-x: hidden;
          overflow-y: auto;
          position: static;
          height: auto;
        }

        .snap-container {
          scroll-snap-type: y mandatory;
          overflow-y: scroll;
          height: 100vh;
        }

        .snap-section {
          scroll-snap-align: start;
          height: 100vh;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 px-16 z-50 flex justify-between items-center mix-blend-difference">
        <a href="/" className="font-mono text-sm tracking-[0.15em] uppercase text-[var(--fg)] no-underline">
          Continuous AI
        </a>
      </header>

      {/* Navigation Dots */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4">
        {[
          { id: "manifesto", label: "The Manifesto" },
          { id: "ecosystem", label: "The Ecosystem" },
          { id: "vision", label: "The Vision" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300 relative group ${
              activeSection === id
                ? "bg-[var(--accent)] scale-[1.3]"
                : "bg-[var(--muted)] hover:bg-[var(--accent)] hover:scale-[1.3]"
            }`}
          >
            <span className="absolute right-6 top-1/2 -translate-y-1/2 font-mono text-[0.7rem] text-[var(--muted)] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:text-[var(--fg)] transition-opacity duration-300 pointer-events-none">
              {label}
            </span>
          </button>
        ))}
      </nav>

      <div className="snap-container">
      {/* Section 1: The Manifesto */}
      <section
        id="manifesto"
        className="snap-section flex flex-col justify-center px-[8vw] py-16 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #151515 100%)",
        }}
      >
        <div
          className="absolute -top-1/2 -right-[20%] w-[80vw] h-[80vw] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(200, 255, 0, 0.03) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-[900px]">
          <p
            className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-8"
            style={{ animation: "fadeInUp 0.8s ease forwards" }}
          >
            The Manifesto
          </p>
          <h1
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.1] mb-8"
            style={{ animation: "fadeInUp 0.8s ease 0.2s forwards", opacity: 0 }}
          >
            <span className="text-[var(--accent)]">Continuous</span> AI
          </h1>
          <p
            className="text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.8] text-[rgba(245,245,245,0.85)] max-w-[700px]"
            style={{ animation: "fadeInUp 0.8s ease 0.4s forwards", opacity: 0 }}
          >
            Developers are drowning in AI-generated code. Continuous AI addresses this by automating the workflows around code, not just the code itself. The role of the software engineer is shifting from prompting AI to designing processes that run automatically.
          </p>
          <a
            href="https://youtu.be/A7ZxRs45tTg?si=iXjvaTwI1PnDjenB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-10 px-6 py-3 bg-[rgba(200,255,0,0.1)] border border-[rgba(200,255,0,0.3)] rounded-full text-[var(--accent)] no-underline font-mono text-sm transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:translate-x-2"
            style={{ animation: "fadeInUp 0.8s ease 0.6s forwards", opacity: 0 }}
          >
            AI is Glue
            <svg className="w-4 h-4 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50" style={{ animation: "bounce 2s infinite" }}>
          <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase">Scroll</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Section 2: The Ecosystem */}
      <section
        id="ecosystem"
        className="snap-section flex flex-col justify-center px-[8vw] py-16 relative overflow-hidden bg-[#0d0d0d]"
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(200, 255, 0, 0.2), transparent)" }}
        />
        <div className="max-w-[1000px]">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-8">
            The Ecosystem
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.1] mb-8">
            Building <span className="text-[var(--accent)]">Together</span>
          </h1>
          <p className="text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.8] text-[rgba(245,245,245,0.85)] max-w-[750px] mb-8">
            The best developer tools are converging on a shared vision: agents that keep pace with code generation, raise the bar on quality, and let you ship with confidence. From coding assistants to observability platforms, from feature flags to documentation—these tools are becoming the connective tissue of modern software development.
          </p>
          <div className="flex flex-wrap gap-3 my-10">
            {[
              "Continue", "Devin", "Jules", "GitHub", "Vercel", "PostHog",
              "Sentry", "Datadog", "Linear", "Notion", "LaunchDarkly",
              "Snyk", "Confluent", "Sanity", "Cognee", "Graphene"
            ].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-md font-mono text-sm text-[rgba(245,245,245,0.7)] transition-all duration-300 hover:bg-[rgba(200,255,0,0.1)] hover:border-[rgba(200,255,0,0.3)] hover:text-[var(--accent)] hover:-translate-y-0.5"
              >
                {tool}
              </span>
            ))}
          </div>
          <a
            href="/jan2025"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[rgba(200,255,0,0.1)] border border-[rgba(200,255,0,0.3)] rounded-full text-[var(--accent)] no-underline font-mono text-sm transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:translate-x-2"
          >
            Jan 2025 Dinner
            <svg className="w-4 h-4 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Section 3: The Vision */}
      <section
        id="vision"
        className="snap-section flex flex-col justify-start pt-[12vh] pb-20 px-[8vw] relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0d0d0d 0%, #111 50%, #0a0a0a 100%)",
        }}
      >
        <div
          className="absolute top-[20%] -left-[10%] w-[60vw] h-[60vw] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(200, 255, 0, 0.02) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-[900px]">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-8">
            The Vision
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.1] mb-8">
            Ship as Fast as <span className="text-[var(--accent)]">You Code</span>
          </h1>
          <p className="text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.8] text-[rgba(245,245,245,0.85)] max-w-[700px]">
            AI made your engineers 10x faster at writing code. Now they&apos;re drowning in the stuff that isn&apos;t code—reviews, checks, docs, shipping. Continuous AI closes that gap. Not by automating developers, but by baking their best judgment into agents that raise the whole team&apos;s floor.
          </p>
          <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[var(--fg)] my-6 leading-[1.2]">
            Your best engineers&apos; standards,<br />
            <span className="text-[var(--accent)]">now the whole team&apos;s.</span>
          </p>
          <p className="text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.8] text-[rgba(245,245,245,0.85)] max-w-[700px] mt-4">
            Junior engineers ship like staff. Staff engineers focus on what only they can do. What would your best engineers catch? Now everyone catches it.
          </p>
          </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 px-[8vw] flex flex-col items-center">
          <a
            href="https://continue.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-[rgba(200,255,0,0.1)] border border-[rgba(200,255,0,0.3)] rounded-full text-[var(--accent)] no-underline font-mono text-sm transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:translate-x-2"
          >
            Continue
            <svg className="w-4 h-4 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <div className="w-full border-t border-[rgba(255,255,255,0.05)]" />
          <div className="flex items-center gap-3 font-mono text-sm text-[var(--muted)] mt-8 mb-8">
            Powered by
            <a href="https://continue.dev" target="_blank" rel="noopener noreferrer" className="text-[var(--fg)] no-underline transition-colors duration-300 hover:text-[var(--accent)]">
              Continue
            </a>
          </div>
        </footer>
      </section>
      </div>
    </>
  );
}

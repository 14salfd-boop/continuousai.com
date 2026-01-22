"use client";

import { useEffect, useState } from "react";

export default function Jan2025Page() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    // Partner context for the generated prompt
    const partners: Record<string, { name: string; role: string; desc: string; category: string }> = {
      linear: { name: 'Linear', role: 'issue tracking', desc: 'Issues can trigger AI workflows, get auto-triaged, and dispatch to coding agents', category: 'planning' },
      launchdarkly: { name: 'LaunchDarkly', role: 'feature flags & AI configs', desc: 'Manage AI model configs, prompts, and rollouts with the same controls you use for feature flags', category: 'release' },
      snyk: { name: 'Snyk', role: 'security scanning', desc: 'Vulnerability alerts can trigger automated patching, testing, and PR creation', category: 'security' },
      notion: { name: 'Notion', role: 'documentation', desc: 'Block-based architecture gives AI structured context—every paragraph, task, and property is queryable', category: 'knowledge' },
      continue: { name: 'Continue', role: 'AI coding assistant', desc: 'IDE-integrated AI that helps you code, with tools to measure and improve AI effectiveness over time', category: 'agents' },
      devin: { name: 'Devin', role: 'async AI engineer', desc: 'Cloud coding agent that can work on tasks asynchronously and push PRs', category: 'agents' },
      jules: { name: 'Jules', role: 'proactive coding agent', desc: 'Suggests tasks, runs scheduled jobs, integrates with deployments—AI that works without being asked', category: 'agents' },
      sentry: { name: 'Sentry', role: 'error monitoring', desc: 'Errors can trigger automated investigation, fixes, and deploys', category: 'observability' },
      datadog: { name: 'Datadog', role: 'observability', desc: 'AI agents can query logs, traces, metrics, and incidents through natural language', category: 'observability' },
      posthog: { name: 'PostHog', role: 'product analytics', desc: 'Track AI feature usage: token costs, latency, and user satisfaction', category: 'analytics' },
      vercel: { name: 'Vercel', role: 'deployment platform', desc: 'AI can investigate anomalies, review code, and create PRs from production insights', category: 'deployment' },
      confluent: { name: 'Confluent', role: 'data streaming', desc: 'Event-driven AI that perceives, reasons, and acts as events unfold in real-time', category: 'data' },
      cognee: { name: 'Cognee', role: 'context engineering', desc: 'Knowledge graphs and vector search give AI the right information at the right time', category: 'data' },
      graphene: { name: 'Graphene', role: 'AI-native BI', desc: 'BI with semantic layers that lives in your repo and AI agents can query via CLI', category: 'analytics' },
      github: { name: 'GitHub', role: 'code hosting', desc: 'PRs, issues, actions, and Codespaces can all be automated by AI', category: 'code' },
      sanity: { name: 'Sanity', role: 'content platform', desc: 'Structured content with schemas AI can understand—typed, relational data', category: 'content' },
    };

    const categoryQuestions: Record<string, { question: string; option1: string; option2: string }> = {
      'agents': {
        question: 'How do we give AI coding agents enough context to work autonomously?',
        option1: 'Invest in context infrastructure like knowledge graphs, structured documentation, and codebase indexing so AI understands the full picture before acting.',
        option2: 'Full autonomy is the wrong goal. The focus should be on tighter human-AI collaboration where AI amplifies human judgment rather than replacing it.'
      },
      'observability': {
        question: 'How should AI use production data to close the loop from alert to fix?',
        option1: 'Give AI access to logs, traces, and metrics so it can detect patterns and act on clear signals automatically, escalating only novel issues to humans.',
        option2: 'AI should surface insights and correlations, but the decision about what actions to take in production environments should remain with humans.'
      },
      'deployment': {
        question: "What's needed to make fully automated deployments safe?",
        option1: 'Feature flags for instant rollback, comprehensive test coverage, staged rollouts with automatic promotion, and clear metrics that trigger pauses.',
        option2: 'Human checkpoints will always be essential for deployment safety. The focus should be on making review and approval faster, not eliminating them.'
      },
      'data': {
        question: 'How do we make data systems accessible to AI workflows?',
        option1: 'Build natural language interfaces over data systems and let AI generate pipelines and queries, with humans reviewing outputs before execution.',
        option2: 'Data work requires precision and auditability that AI struggles to provide reliably. Keep AI in an assistive role while humans drive.'
      },
      'planning': {
        question: 'How should AI help triage and route incoming issues?',
        option1: 'AI should gather context from linked systems, assess priority based on historical patterns, and route to the right team, with humans reviewing assignments.',
        option2: "Triage requires judgment about business priorities and team capacity that AI can't grasp. AI should surface information but humans make decisions."
      },
    };

    const precomputedQuestions: Record<string, { question: string; option1: string; option2: string }> = {
      '': {
        question: "What's the biggest bottleneck in automating development workflows today?",
        option1: 'Giving AI enough context about code, documentation, and systems to act autonomously without constantly asking humans for clarification.',
        option2: 'Building trust in AI outputs. The technology works, but humans need to stay in the loop longer before we can safely expand automation scope.'
      },
      'linear': {
        question: 'How should AI help when new issues come in?',
        option1: 'Start investigating immediately. AI should gather context from linked systems, identify related code, suggest priority, and draft an approach.',
        option2: 'Wait for humans to decide which issues deserve AI attention. Proactive AI wastes resources on issues that may not matter.'
      },
      'continue': {
        question: 'What would it take for AI coding agents to need correction less often?',
        option1: 'Better context systems. Give AI more information about your codebase, conventions, architecture, and past decisions through better tooling.',
        option2: 'Better models. The bottleneck is AI capability, not context. Smarter models will need less hand-holding regardless of available information.'
      },
    };

    function getSelectedCategories(selectedTools: string[]) {
      const cats = new Set<string>();
      selectedTools.forEach(tool => {
        if (partners[tool]) cats.add(partners[tool].category);
      });
      return Array.from(cats).sort();
    }

    function getQuestion(selectedTools: string[]) {
      const key = selectedTools.sort().join(',');
      if (precomputedQuestions[key]) return precomputedQuestions[key];
      
      let bestMatch = null;
      let bestMatchSize = 0;
      
      for (const [comboKey, q] of Object.entries(precomputedQuestions)) {
        if (comboKey === '') continue;
        const comboTools = comboKey.split(',');
        if (comboTools.every(t => selectedTools.includes(t)) && comboTools.length > bestMatchSize) {
          bestMatch = q;
          bestMatchSize = comboTools.length;
        }
      }
      
      if (bestMatch && bestMatchSize >= 2) return bestMatch;
      
      const selectedCats = getSelectedCategories(selectedTools);
      
      if (selectedCats.length > 0) {
        if (selectedCats.length >= 2) {
          for (let i = 0; i < selectedCats.length; i++) {
            for (let j = i + 1; j < selectedCats.length; j++) {
              const catKey = [selectedCats[i], selectedCats[j]].sort().join(',');
              if (categoryQuestions[catKey]) return categoryQuestions[catKey];
            }
          }
        }
        
        for (const cat of selectedCats) {
          if (categoryQuestions[cat]) return categoryQuestions[cat];
        }
      }
      
      if (bestMatch) return bestMatch;
      
      if (selectedTools.length > 0) {
        const toolNames = selectedTools.map(t => partners[t]?.name).filter(Boolean);
        const roles = selectedTools.map(t => partners[t]?.role).filter(Boolean);
        
        if (toolNames.length >= 2) {
          return {
            question: `Should ${toolNames.slice(0, 2).join(' and ')} share context through automated workflows?`,
            option1: `Yes. Connected ${roles.slice(0, 2).join(' and ')} enables AI to work across your full stack.`,
            option2: 'No. Each tool should maintain its own boundaries to prevent complexity.'
          };
        }
      }
      
      return precomputedQuestions[''];
    }

    function updateQuestion() {
      const selectedTools = Array.from(document.querySelectorAll('.tool-btn.selected'))
        .map(btn => (btn as HTMLElement).dataset.tool)
        .filter(Boolean) as string[];
      
      const q = getQuestion(selectedTools);
      const questionText = document.getElementById('questionText');
      if (questionText) {
        questionText.textContent = q.question;
      }
    }

    document.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
        updateQuestion();
      });
    });

    function buildPrompt(selectedTools: string[]) {
      const q = getQuestion(selectedTools);
      
      let prompt = `# Continuous AI January Dinner


## Context

I'm attending the **Continuous AI January Dinner** in San Francisco.

Continuous AI is about automating the workflows around code, not just the code itself. The philosophy is "AI is Glue" — LLMs bond together varying surfaces: human language, CLIs, APIs, webhooks, databases.

**Learn more:**

- [Continuous AI](https://www.continuousai.com)

- [AI is Glue](https://blog.continue.dev/ai-is-glue)`;

      if (selectedTools.length > 0) {
        prompt += `


## Tools I Use
`;
        selectedTools.forEach(key => {
          const p = partners[key];
          if (p) prompt += `
- **${p.name}** (${p.role}) — ${p.desc}
`;
        });
      }

      prompt += `

---


## Dinner Question

> ${q.question}


---


## Your Task

What's your take? Search the web for recent developments if helpful. I'll bring your answer to dinner.`;

      return prompt;
    }

    const aiUrls: Record<string, string> = {
      claude: 'https://claude.ai/new?q=',
      openai: 'https://chat.openai.com/?q=',
      gemini: 'https://www.google.com/search?udm=50&q='
    };

    const copyBtn = document.querySelector('.ai-btn.copy-btn');
    const copyIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;
    const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

    document.querySelectorAll('.ai-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const ai = (btn as HTMLElement).dataset.ai;
        const selectedTools = Array.from(document.querySelectorAll('.tool-btn.selected'))
          .map(b => (b as HTMLElement).dataset.tool)
          .filter(Boolean) as string[];
        const prompt = buildPrompt(selectedTools);
        
        if (ai === 'copy') {
          navigator.clipboard.writeText(prompt).then(() => {
            if (copyBtn) {
              copyBtn.innerHTML = checkIcon;
              copyBtn.classList.add('copied');
              
              setTimeout(() => {
                copyBtn.innerHTML = copyIcon;
                copyBtn.classList.remove('copied');
              }, 2000);
            }
          });
        } else if (ai && aiUrls[ai]) {
          window.open(aiUrls[ai] + encodeURIComponent(prompt), '_blank');
        }
      });
    });

    updateQuestion();
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          overflow: hidden;
        }

        .jan2025-page {
          opacity: 1;
        }

        :root {
          --bg: #0a0a0b;
          --bg-card: #111113;
          --border: #1f1f22;
          --border-light: #2a2a2d;
          --text: #fafafa;
          --text-secondary: #a1a1aa;
          --text-muted: #71717a;
        }

        html, body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          height: 100%;
          line-height: 1.5;
          overflow: hidden;
        }

        .container {
          max-width: 680px;
          margin: 0 auto;
          padding: 40px 24px 40px;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .header {
          text-align: center;
          margin-bottom: 32px;
        }

        .header-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .header h1 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(42px, 10vw, 72px);
          font-weight: 400;
          line-height: 1.05;
          margin-bottom: 8px;
        }

        .header h1 em {
          font-style: italic;
          color: var(--text-secondary);
        }

        .header-meta {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 12px;
        }

        .section {
          margin-bottom: 32px;
        }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 20px;
          text-align: center;
        }

        .tools-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .tool-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tool-btn:hover {
          border-color: var(--border-light);
          color: var(--text);
        }

        .tool-btn.selected {
          border-color: var(--text-secondary);
          color: var(--text);
          background: rgba(255,255,255,0.03);
        }

        .tool-btn svg, .tool-btn img {
          width: 16px;
          height: 16px;
          min-width: 16px;
          min-height: 16px;
          flex-shrink: 0;
          object-fit: contain;
          fill: currentColor;
          opacity: 0.7;
        }

        .tool-btn.selected svg, .tool-btn.selected img {
          opacity: 1;
        }

        .question-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px 16px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .question-text {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(17px, 3vw, 20px);
          font-weight: 400;
          line-height: 1.5;
          text-align: center;
          margin: 0;
          color: var(--text);
          letter-spacing: -0.01em;
        }

        .ask-section {
          margin: 32px auto 0;
          text-align: center;
        }

        .ask-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .ask-bar {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 16px 20px;
        }

        .ask-title {
          font-family: 'Instrument Serif', serif;
          font-size: 22px;
          font-weight: 400;
          white-space: nowrap;
        }

        .ask-title em {
          font-style: italic;
          color: var(--text-secondary);
        }

        .ai-buttons {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: nowrap;
        }

        .ai-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          border-radius: 50%;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .ai-btn:hover {
          border-color: var(--border-light);
          color: var(--text);
          background: rgba(255,255,255,0.1);
        }

        .ai-btn svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        .ai-btn.copy-btn svg {
          width: 16px;
          height: 16px;
          fill: none;
        }

        .ai-btn.claude:hover { border-color: #D97757; color: #D97757; background: rgba(217, 119, 87, 0.15); }
        .ai-btn.openai:hover { border-color: #19C37D; color: #19C37D; background: rgba(25, 195, 125, 0.15); }
        .ai-btn.gemini:hover { border-color: #669DF6; color: #669DF6; background: rgba(102, 157, 246, 0.15); }

        .footer {
          text-align: center;
          margin-top: 32px;
          margin-bottom: 0;
        }

        .footer p {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 16px;
          font-size: 13px;
        }

        .footer-links a {
          font-family: 'DM Sans', sans-serif;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: var(--text);
        }

        .ai-btn.copy-btn.copied {
          border-color: #fafafa;
          color: #fafafa;
          background: rgba(250, 250, 250, 0.15);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .header { animation: fadeIn 0.7s ease-out; }
        .section:nth-of-type(1) { animation: fadeIn 0.7s ease-out 0.1s both; }
        .section:nth-of-type(2) { animation: fadeIn 0.7s ease-out 0.2s both; }
        .section:nth-of-type(3) { animation: fadeIn 0.7s ease-out 0.3s both; }
        .footer { animation: fadeIn 0.7s ease-out 0.4s both; }

        @media (max-width: 540px) {
          .container { padding: 24px 16px 32px; }
          .header { margin-bottom: 20px; }
          .header-eyebrow { font-size: 10px; margin-bottom: 10px; }
          .header h1 { font-size: 38px; margin-bottom: 4px; }
          .header-meta { font-size: 13px; margin-top: 8px; }
          .section { margin-bottom: 20px; }
          .section-label { font-size: 10px; margin-bottom: 12px; }
          .tools-grid { gap: 6px; }
          .tool-btn { padding: 6px 10px; font-size: 11px; gap: 4px; }
          .tool-btn img { width: 13px; height: 13px; min-width: 13px; min-height: 13px; }
          .question-card { padding: 14px 12px; height: 80px; border-radius: 12px; }
          .question-text { font-size: 15px; line-height: 1.4; }
          .ask-section { margin-top: 20px; }
          .ask-label { font-size: 10px; margin-bottom: 10px; }
          .ask-bar { flex-direction: column; padding: 12px 16px; gap: 10px; border-radius: 12px; }
          .ask-title { font-size: 18px; }
          .ai-buttons { gap: 8px; }
          .ai-btn { width: 40px; height: 40px; }
          .ai-btn svg { width: 18px; height: 18px; }
          .ai-btn.copy-btn svg { width: 16px; height: 16px; }
          .footer { margin-top: 24px; }
          .footer p { font-size: 12px; margin-bottom: 6px; }
          .footer-links { font-size: 12px; gap: 12px; }
        }

        @media (max-width: 375px) {
          .container { padding: 16px 12px 24px; }
          .header { margin-bottom: 14px; }
          .header-eyebrow { font-size: 9px; margin-bottom: 6px; letter-spacing: 0.15em; }
          .header h1 { font-size: 32px; margin-bottom: 2px; }
          .header-meta { font-size: 12px; margin-top: 6px; }
          .section { margin-bottom: 14px; }
          .section-label { font-size: 9px; margin-bottom: 10px; letter-spacing: 0.1em; }
          .tools-grid { gap: 5px; }
          .tool-btn { padding: 5px 8px; font-size: 10px; gap: 3px; }
          .tool-btn img { width: 12px; height: 12px; min-width: 12px; min-height: 12px; }
          .question-card { padding: 10px; height: 70px; border-radius: 10px; }
          .question-text { font-size: 13px; line-height: 1.35; }
          .ask-section { margin-top: 14px; }
          .ask-label { font-size: 9px; margin-bottom: 8px; }
          .ask-bar { padding: 10px 14px; gap: 8px; border-radius: 10px; }
          .ask-title { font-size: 16px; }
          .ai-buttons { gap: 6px; }
          .ai-btn { width: 36px; height: 36px; }
          .ai-btn svg { width: 16px; height: 16px; }
          .ai-btn.copy-btn svg { width: 14px; height: 14px; }
          .footer { margin-top: 16px; }
          .footer p { font-size: 11px; margin-bottom: 4px; }
          .footer-links { font-size: 11px; gap: 10px; }
        }
      `}</style>

      <div className={`jan2025-page container ${loaded ? 'loaded' : ''}`}>
        <header className="header">
          <div className="header-eyebrow">You&apos;re Invited</div>
          <h1>Continuous AI<br/><em>January Dinner</em></h1>
          <p className="header-meta">San Francisco · January 2025</p>
        </header>

        <section className="section">
          <div className="section-label">Which tools do you use?</div>
          <div className="tools-grid">
            <button className="tool-btn" data-tool="linear">
              <img src="/jan2025/icons/linear.svg" alt="" width={16} height={16} />
              Linear
            </button>
            <button className="tool-btn" data-tool="launchdarkly">
              <img src="/jan2025/icons/launchdarkly.svg" alt="" width={16} height={16} />
              LaunchDarkly
            </button>
            <button className="tool-btn" data-tool="snyk">
              <img src="/jan2025/icons/snyk.svg" alt="" width={16} height={16} />
              Snyk
            </button>
            <button className="tool-btn" data-tool="notion">
              <img src="/jan2025/icons/notion.svg" alt="" width={16} height={16} />
              Notion
            </button>
            <button className="tool-btn" data-tool="continue">
              <img src="/jan2025/icons/continue.svg" alt="" width={16} height={16} />
              Continue
            </button>
            <button className="tool-btn" data-tool="devin">
              <img src="/jan2025/icons/devin.svg" alt="" width={16} height={16} />
              Devin
            </button>
            <button className="tool-btn" data-tool="jules">
              <img src="/jan2025/icons/jules.svg" alt="" width={16} height={16} />
              Jules
            </button>
            <button className="tool-btn" data-tool="sentry">
              <img src="/jan2025/icons/sentry.svg" alt="" width={16} height={16} />
              Sentry
            </button>
            <button className="tool-btn" data-tool="datadog">
              <img src="/jan2025/icons/datadog.svg" alt="" width={16} height={16} />
              Datadog
            </button>
            <button className="tool-btn" data-tool="posthog">
              <img src="/jan2025/icons/posthog.svg" alt="" width={16} height={16} />
              PostHog
            </button>
            <button className="tool-btn" data-tool="vercel">
              <img src="/jan2025/icons/vercel.svg" alt="" width={16} height={16} />
              Vercel
            </button>
            <button className="tool-btn" data-tool="confluent">
              <img src="/jan2025/icons/confluent.svg" alt="" width={16} height={16} />
              Confluent
            </button>
            <button className="tool-btn" data-tool="cognee">
              <img src="/jan2025/icons/cognee.svg" alt="" width={16} height={16} />
              Cognee
            </button>
            <button className="tool-btn" data-tool="graphene">
              <img src="/jan2025/icons/graphene.svg" alt="" width={16} height={16} />
              Graphene
            </button>
            <button className="tool-btn" data-tool="github">
              <img src="/jan2025/icons/github.svg" alt="" width={16} height={16} />
              GitHub
            </button>
            <button className="tool-btn" data-tool="sanity">
              <img src="/jan2025/icons/sanity.svg" alt="" width={16} height={16} />
              Sanity
            </button>
          </div>
        </section>

        <section className="section">
          <div className="section-label">A question to consider</div>
          <div className="question-card">
            <p className="question-text" id="questionText">In 5 years, will AI agents be making more business decisions than humans?</p>
          </div>
        </section>

        <section className="ask-section">
          <div className="ask-label">Bring your answer to dinner</div>
          <div className="ask-bar">
            <span className="ask-title">Ask your <em>AI</em></span>
            <div className="ai-buttons">
              <a href="#" className="ai-btn claude" data-ai="claude" title="Ask Claude">
                <svg viewBox="0 0 24 24"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H8.2l-.927-.463-2.258-.695-.463-.231-.231-.463.115-.58.348-.347.463-.116 2.026.347 2.373.811h.116l.162-.208v-.115l-.046-.116-1.042-1.389-1.62-1.967-.347-.579v-.463l.231-.463.463-.232h.116l.463.116.463.348 1.736 2.083 1.041 1.389.116.115.194-.034.07-.081v-.116l.116-1.736.231-2.778.116-.463.347-.347.58-.116.463.232.231.463-.115 2.894-.232 2.2v.115l.058.088.09.028h.083l.115-.116 1.968-1.852 1.967-1.62.463-.232.579.116.348.348.115.579-.231.463-1.736 1.62-1.852 1.62-.116.115v.168l.046.078.07.058 2.315.348 2.778.463.463.231.231.463-.115.58-.348.347-.463.116-2.894-.348-2.199-.347h-.116l-.087.057-.07.09v.084l.116.115.926.695 2.315 1.852.347.463v.579l-.347.348-.58.115-.462-.231-2.2-1.62-1.157-.927-.116-.115h-.168l-.078.046-.058.07v.199l.347 2.43.232 2.315v.463l-.348.463-.463.116-.579-.116-.347-.463-.464-2.894-.231-2.083v-.116l-.058-.087-.09-.028h-.083l-.116.115-1.273 1.968-1.736 2.315-.463.347h-.579l-.347-.347-.116-.58.232-.462 1.157-1.736 1.505-2.084.115-.115v-.168l-.046-.078-.07-.058h-.199l-2.778.695-2.083.347-.463-.115-.347-.348-.116-.579z"/></svg>
              </a>
              <a href="#" className="ai-btn openai" data-ai="openai" title="Ask ChatGPT">
                <svg viewBox="0 0 24 24"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>
              </a>
              <a href="#" className="ai-btn gemini" data-ai="gemini" title="Ask Gemini">
                <svg viewBox="0 0 24 24"><path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12"/></svg>
              </a>
              <button className="ai-btn copy-btn" data-ai="copy" title="Copy prompt">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              </button>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>Looking forward to seeing you there</p>
          <div className="footer-links">
            <a href="https://www.continuousai.com" target="_blank" rel="noopener noreferrer">Continuous AI</a>
            <a href="https://blog.continue.dev/ai-is-glue" target="_blank" rel="noopener noreferrer">AI is Glue</a>
          </div>
        </footer>
      </div>
    </>
  );
}

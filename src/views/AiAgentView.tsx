import React, { useState, useEffect } from 'react';

export const AiAgentView: React.FC = () => {
  const [explainOpen, setExplainOpen] = useState(false);
  const [copiedPatch, setCopiedPatch] = useState(false);
  const [prStatus, setPrStatus] = useState<'idle' | 'created'>('idle');
  const [isRecording, setIsRecording] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [taskProgress, setTaskProgress] = useState(78);
  const [contrastFixed, setContrastFixed] = useState(false);

  // Chat message stream
  const [messages, setMessages] = useState<
    Array<{ id: string; sender: 'user' | 'assistant'; text: string; code?: string }>
  >([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaskProgress((prev) => (prev < 96 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const handleCopyPatch = () => {
    setCopiedPatch(true);
    navigator.clipboard?.writeText(
      `- <button className="absolute bottom-4 w-full bg-blue-600 ...">\n+ <button className="relative z-20 bottom-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg active:scale-95 ...">`
    );
    setTimeout(() => setCopiedPatch(false), 2000);
  };

  const handleCreatePr = () => {
    setPrStatus('created');
    setTimeout(() => setPrStatus('idle'), 3500);
  };

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || chatInput;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user' as const, text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      let reply = '';
      let codeSnippet: string | undefined = undefined;

      if (textToSend.toLowerCase().includes('cypress')) {
        reply = 'Here is the generated Cypress end-to-end test simulating mobile checkout touch gestures without sticky collision:';
        codeSnippet = `describe('Checkout Mobile Viewport Test', () => {
  beforeEach(() => {
    cy.viewport(390, 844); // iPhone 15 Pro
    cy.visit('https://stripe.com/checkout');
  });

  it('verifies Confirm Payment CTA is clickable above drawer', () => {
    cy.get('[data-testid="pay-button"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: false });
    cy.url().should('include', '/success');
  });
});`;
      } else if (textToSend.toLowerCase().includes('lcp')) {
        reply = 'LCP is currently 1.1s (Passed). The primary bottleneck is font subsetting and hero image delivery. Converting hero image to AVIF/WebP saves an estimated 640ms.';
      } else if (textToSend.toLowerCase().includes('wcag')) {
        reply = 'Audited WCAG 2.1 AA: Found 1 low-contrast label on dark mode toggle (3.2:1 instead of 4.5:1). Applying automatic CSS patch elevates contrast to 7.1:1 AAA compliant.';
      } else {
        reply = `I analyzed "${textToSend}" against our headless telemetry database for stripe.com. 0 unexpected regressions were flagged.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant' as const,
          text: reply,
          code: codeSnippet,
        },
      ]);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 py-6 gap-6 relative">
      {/* AI Agent Status Banner & Context Bar */}
      <section className="px-4 py-3 rounded-2xl bg-surface-container-low shadow-sm border border-surface-container-high/40">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-tertiary-container/30">
                <span className="material-symbols-outlined text-tertiary text-[18px]">neurology</span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-tertiary"></span>
              </div>
              <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold">
                SiteCheck Assistant v3.4
              </span>
              <span className="text-xs text-tertiary font-bold tracking-wide flex items-center gap-1">
                • Online
              </span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs border border-surface-container-high font-mono">
              <span className="material-symbols-outlined text-[13px] text-tertiary">lock</span>
              <span>Sandboxed v8</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container-high/30">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="material-symbols-outlined text-primary text-[16px] shrink-0">travel_explore</span>
              <span className="text-xs text-on-surface-variant shrink-0">Target:</span>
              <span className="text-xs text-primary font-mono truncate font-medium">stripe.com/checkout</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-xs shrink-0 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              <span>Live Hook</span>
            </div>
          </div>
        </div>
      </section>

      {/* Synthetic Journey Insight Card */}
      <article className="flex flex-col gap-2 p-5 rounded-2xl bg-surface-container shadow-md border border-surface-container-high/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            </div>
            <span className="font-headline-sm text-sm text-on-surface font-bold">Autonomous Diagnostic</span>
          </div>
          <span className="text-xs text-on-surface-variant font-mono">2m ago</span>
        </div>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          I ran <span className="font-semibold text-on-surface">14 synthetic user journeys</span> on{' '}
          <code className="font-mono text-primary text-xs bg-surface-container-high px-1 py-0.5 rounded">stripe.com</code>
          . I found <span className="text-error font-semibold">1 high-priority layout obstruction</span> preventing users
          from tapping <span className="font-semibold text-on-surface">"Confirm Payment"</span> on mobile viewport.
        </p>
        <div className="flex items-center gap-2 mt-1 px-3 py-1.5 rounded-xl bg-error-container/20 border border-error/20">
          <span className="material-symbols-outlined text-error text-[16px]">report_problem</span>
          <span className="text-xs text-error font-medium">Critical UI Defect: Tappable area occluded by sticky floating container</span>
        </div>
      </article>

      {/* Visual Regression / Defect Evidence */}
      <div className="flex flex-col gap-2 p-5 rounded-2xl bg-surface-container shadow-sm border border-surface-container-high/50">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">screenshot_monitor</span>
            DOM Collision Screenshot Snapshot
          </span>
          <span className="px-2 py-0.5 rounded-full bg-error text-on-error text-[10px] font-bold uppercase tracking-wider">
            Blocked Touch
          </span>
        </div>
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-surface-container-lowest flex items-center justify-center shadow-inner border border-surface-container-high/40">
          <img
            className="w-full h-full object-cover opacity-80"
            alt="DOM collision screenshot snapshot"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUEOR2g5yb57Z2Qu2X3W9sK0ZV7AJtytXhhJowv5Bv4PIkj4o1EogI4GfdsCk5hOojYfGx5-Kx-Qq-y27hbEK_OZttz-IW_Tq-_4hH6EYuUfDHuU17gF8fiAUqGKHMt9hIJ2aoCjFSfVIGPDhxSJ4E7PcTAyk2Z32-oB8JubY49koVQKsTrp98oIXaq79OGosgn0rHJFIUP5CLOHSV-AgKFa0dr-mdLG6lDoEOT4pjcB1IcpeuokXV"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-highest/90 text-on-surface text-xs backdrop-blur-md font-mono">
            <span className="material-symbols-outlined text-tertiary text-[14px]">touch_app</span>
            <span>Viewport: 390×844 (iOS WebKit)</span>
          </div>
        </div>
      </div>

      {/* Code Diff Card */}
      <div className="flex flex-col rounded-2xl bg-surface-container shadow-md overflow-hidden border border-surface-container-high/50">
        <div className="flex items-center justify-between px-4 py-3 bg-surface-container-high border-b border-surface-container-highest">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">code</span>
            <span className="text-xs text-on-surface font-mono truncate font-semibold">
              components/checkout/PaymentButton.tsx
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface-variant font-mono">
            TypeScript
          </span>
        </div>

        <div className="p-4 bg-surface-container-lowest font-mono text-xs leading-relaxed flex flex-col gap-1.5 overflow-x-auto">
          <div className="text-on-surface-variant text-[11px] mb-1 opacity-70">
            @@ -42,3 +42,3 @@ export const PaymentButton = () =&gt; &#123;
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-error-container/20 text-error">
            <span className="select-none font-bold text-error shrink-0">-</span>
            <code className="break-all whitespace-pre-wrap">&lt;button className="absolute bottom-4 w-full bg-blue-600 ..."&gt;</code>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-tertiary-container/20 text-tertiary">
            <span className="select-none font-bold text-tertiary shrink-0">+</span>
            <code className="break-all whitespace-pre-wrap">
              &lt;button className="relative z-20 bottom-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg active:scale-95 ..."&gt;
            </code>
          </div>
        </div>

        {/* Quick Actions Toolbar */}
        <div className="grid grid-cols-3 gap-1.5 p-2 bg-surface-container-high border-t border-surface-container-highest">
          <button
            onClick={handleCopyPatch}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-surface-container hover:bg-surface-bright text-on-surface text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">
              {copiedPatch ? 'done' : 'content_copy'}
            </span>
            <span>{copiedPatch ? 'Copied!' : 'Copy Patch'}</span>
          </button>
          <button
            onClick={handleCreatePr}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              prStatus === 'created'
                ? 'bg-tertiary-container text-on-tertiary-container'
                : 'bg-primary-container text-on-primary-container hover:bg-inverse-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">call_split</span>
            <span>{prStatus === 'created' ? 'PR #142 Created!' : 'PR #142'}</span>
          </button>
          <button
            onClick={() => setExplainOpen(!explainOpen)}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-surface-container hover:bg-surface-bright text-on-surface text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">psychology</span>
            <span>{explainOpen ? 'Hide Fix' : 'Explain Fix'}</span>
          </button>
        </div>

        {/* Collapsible Explanation Panel */}
        {explainOpen && (
          <div className="p-4 bg-surface-container-low text-xs text-on-surface-variant flex flex-col gap-1 border-t border-surface-container-high/40 animate-fade-in">
            <div className="flex items-center gap-1 font-semibold text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-secondary">lightbulb</span>
              Why this fixes the failure:
            </div>
            <p className="leading-relaxed">
              The original button used absolute positioning without a declared z-index inside an overflow-hidden wrapper, causing the sticky bottom cart drawer to capture hit testing. Changing it to <code className="font-mono text-tertiary">relative z-20</code> hoists it above the stacking context while preserving micro-haptics.
            </p>
          </div>
        )}
      </div>

      {/* Autonomous Task Runner Section */}
      <div className="flex flex-col gap-3 p-5 rounded-2xl bg-surface-container shadow-md border border-surface-container-high/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></div>
            <span className="font-headline-sm text-sm text-on-surface font-bold">Autonomous Task Runner</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary text-xs font-mono font-bold">
            {contrastFixed ? '5 of 5 Done' : '4 of 5 Done'}
          </span>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-high/30">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
              <span className="text-xs text-on-surface truncate">Crawl 45 internal pages</span>
            </div>
            <span className="text-xs text-tertiary font-mono">6.2s</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-high/30">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
              <span className="text-xs text-on-surface truncate">Synthetic contact form fill</span>
            </div>
            <span className="text-xs text-tertiary font-mono">Passed</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-high/30">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
              <span className="text-xs text-on-surface truncate">Checkout cart simulation (Stripe 4242)</span>
            </div>
            <span className="text-xs text-tertiary font-mono">Passed</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-high/30">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`material-symbols-outlined text-[18px] ${
                  contrastFixed ? 'text-tertiary' : 'text-secondary'
                }`}
              >
                {contrastFixed ? 'check_circle' : 'warning'}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-on-surface truncate">Contrast check on dark mode toggle</span>
                <span className={`text-[11px] truncate ${contrastFixed ? 'text-tertiary' : 'text-secondary'}`}>
                  {contrastFixed ? 'WCAG 2.1 AA resolved: 7.1:1 ratio' : 'WCAG 2.1 AA alert: 3.2:1 ratio'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setContrastFixed(true)}
              disabled={contrastFixed}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                contrastFixed
                  ? 'bg-tertiary-container/30 text-tertiary'
                  : 'bg-secondary-container/40 text-on-secondary-container hover:bg-secondary-container'
              }`}
            >
              {contrastFixed ? 'Fixed' : 'Fix'}
            </button>
          </div>

          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-primary text-[18px] animate-spin shrink-0">
                  progress_activity
                </span>
                <span className="text-xs text-on-surface truncate">Generating Playwright & Cypress suites</span>
              </div>
              <span className="text-xs text-primary font-mono font-bold">{taskProgress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${taskProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Chat Messages Stream if user asked questions */}
      {messages.length > 0 && (
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-surface-container border border-surface-container-high/50">
          <div className="text-xs font-bold text-outline uppercase tracking-wider">Conversation Stream</div>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col gap-1.5 p-3 rounded-xl ${
                m.sender === 'user'
                  ? 'bg-primary-container/20 text-on-surface self-end max-w-[85%]'
                  : 'bg-surface-container-lowest text-on-surface self-start max-w-[95%] border border-surface-container-high/40'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-outline">
                <span className="material-symbols-outlined text-[14px]">
                  {m.sender === 'user' ? 'person' : 'smart_toy'}
                </span>
                <span>{m.sender === 'user' ? 'You' : 'SiteCheck Assistant'}</span>
              </div>
              <p className="text-xs leading-relaxed">{m.text}</p>
              {m.code && (
                <pre className="p-3 mt-1 rounded-lg bg-surface-container-high font-mono text-[11px] text-tertiary overflow-x-auto whitespace-pre">
                  {m.code}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Suggested Action Pills */}
      <div className="flex flex-col gap-2">
        <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
          Suggested Prompts
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => handleSendMessage('Generate Cypress test')}
            className="shrink-0 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm border border-surface-container-highest"
          >
            <span className="material-symbols-outlined text-primary text-[15px]">terminal</span>
            <span>Generate Cypress test</span>
          </button>
          <button
            onClick={() => handleSendMessage('Why is LCP slow?')}
            className="shrink-0 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm border border-surface-container-highest"
          >
            <span className="material-symbols-outlined text-secondary text-[15px]">speed</span>
            <span>Why is LCP slow?</span>
          </button>
          <button
            onClick={() => handleSendMessage('Fix WCAG issue')}
            className="shrink-0 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm border border-surface-container-highest"
          >
            <span className="material-symbols-outlined text-tertiary text-[15px]">contrast</span>
            <span>Fix WCAG issue</span>
          </button>
        </div>
      </div>

      {/* Floating Chat Input Interface */}
      <div className="sticky bottom-4 w-full pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-2 rounded-2xl bg-surface-container-high/95 backdrop-blur-xl shadow-2xl flex items-center gap-2 border border-surface-container-highest"
        >
          <button
            type="button"
            onClick={() => setIsRecording(!isRecording)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
              isRecording
                ? 'bg-error-container text-error animate-pulse'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-bright'
            }`}
            title="Voice input dictation"
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask SiteCheck AI anything (e.g., 'Write Cypress test')..."
              className="w-full bg-transparent text-on-surface placeholder:text-outline text-xs sm:text-sm focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-primary-container hover:bg-primary-container/90 text-on-primary-container flex items-center justify-center transition-transform active:scale-95 shadow-md shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
          </button>
        </form>
      </div>
    </div>
  );
};

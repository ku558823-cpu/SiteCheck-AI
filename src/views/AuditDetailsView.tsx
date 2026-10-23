import React, { useState } from 'react';

export const AuditDetailsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All Checks');
  const [isBrokenLinkAccordionOpen, setIsBrokenLinkAccordionOpen] = useState(true);
  const [isPlayingReplay, setIsPlayingReplay] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handlePlayReplay = () => {
    setIsPlayingReplay(true);
    showToast('Loading synthetic video session playback for Form #work-email...');
    setTimeout(() => {
      setIsPlayingReplay(false);
      showToast('Simulation playback completed (420ms). All steps verified.');
    }, 2500);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 py-6 gap-6 relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-surface-container-high border border-primary text-on-surface shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-primary text-[18px]">info</span>
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Target Audit URL & Device Matrix Pill */}
      <section className="rounded-2xl bg-surface-container-low p-4 sm:p-5 flex flex-col gap-3 shadow-md border border-surface-container-high/40">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 text-tertiary">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-sm text-xs uppercase tracking-wider font-semibold">Audit Completed</span>
              <span className="text-xs text-on-surface-variant">• 2m ago</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="material-symbols-outlined text-[18px] text-primary">lock</span>
              <span className="font-headline-sm text-lg text-on-surface font-bold truncate">stripe.com/checkout</span>
            </div>
          </div>
          <div className="flex items-center justify-center bg-tertiary-container/30 px-3 py-1 rounded-full shrink-0 border border-tertiary/20">
            <span className="font-label-md text-xs text-on-tertiary-container font-bold">Score: 94/100</span>
          </div>
        </div>

        {/* Device Emulator Spec Ribbon */}
        <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-surface-container text-xs text-on-surface-variant flex-wrap border border-surface-container-high/50 font-mono">
          <span className="material-symbols-outlined text-[16px] text-primary">stay_current_portrait</span>
          <span className="font-semibold text-on-surface">iPhone 15 Pro</span>
          <span>•</span>
          <span>393×852</span>
          <span>•</span>
          <span className="flex items-center gap-0.5 text-on-surface">
            <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
            4G Throttling
          </span>
          <span>•</span>
          <span className="text-tertiary font-sans font-semibold">Edge: IAD1 (Virginia)</span>
        </div>
      </section>

      {/* Horizontal Scrollable Category Filter Tabs */}
      <section className="w-full overflow-x-auto no-scrollbar py-0.5">
        <div className="flex items-center gap-2 min-w-max">
          {[
            { label: 'All Checks', badge: '46', dotColor: '' },
            { label: 'Broken Links', badge: '3', dotColor: 'bg-error' },
            { label: 'Buttons & Forms', badge: '12', dotColor: 'bg-tertiary' },
            { label: 'Speed & Vitals', badge: '', dotColor: '' },
            { label: 'Accessibility', badge: '18', dotColor: '' },
            { label: 'Security & SSL', badge: '', dotColor: '' },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveCategory(tab.label)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                activeCategory === tab.label
                  ? 'bg-primary-container text-on-primary-container border-primary-container shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-surface-container-high'
              }`}
            >
              {tab.dotColor && <span className={`w-1.5 h-1.5 rounded-full ${tab.dotColor}`}></span>}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeCategory === tab.label
                      ? 'bg-primary/20 text-white'
                      : tab.dotColor === 'bg-error'
                      ? 'text-error font-bold'
                      : 'bg-surface-container-high text-outline'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Section 1: Broken Links & 404 Sentinel */}
      {(activeCategory === 'All Checks' || activeCategory === 'Broken Links') && (
        <section className="rounded-2xl bg-surface-container-low p-4 sm:p-5 flex flex-col gap-3 shadow-md border border-surface-container-high/40 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-error border border-error/20">
                <span className="material-symbols-outlined text-[20px]">link_off</span>
              </div>
              <div className="flex flex-col">
                <h2 className="font-headline-sm text-base text-on-surface font-bold">Broken Links Sentinel</h2>
                <span className="text-xs text-on-surface-variant">Real-time recursive crawl</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold">
              3 Dead 404s
            </span>
          </div>

          {/* Scanned Gauge Strip */}
          <div className="bg-surface-container rounded-xl p-3 flex items-center justify-between border border-surface-container-high/40">
            <div className="flex items-center gap-2.5">
              <span className="font-headline-md text-2xl font-bold text-on-surface font-mono">328</span>
              <span className="text-xs text-on-surface-variant leading-tight">
                Total Links<br />Evaluated
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-tertiary font-bold">325 Healthy (99.1%)</span>
              <span className="text-[11px] text-error font-medium">3 Unresolved 404s</span>
            </div>
          </div>

          {/* Issue Cards */}
          <div className="flex flex-col gap-2.5">
            {/* Accordion Card 1 */}
            <div className="rounded-xl bg-surface-container p-3 flex flex-col gap-2 border border-surface-container-high/40">
              <div
                className="flex items-start justify-between gap-2 cursor-pointer"
                onClick={() => setIsBrokenLinkAccordionOpen(!isBrokenLinkAccordionOpen)}
              >
                <div className="flex items-start gap-2 min-w-0">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-error-container text-on-error-container mt-0.5 shrink-0">
                    404
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-on-surface truncate">/docs/deprecated-v1</span>
                    <span className="text-[11px] text-on-surface-variant truncate">Found in: Footer Sitemap column 3</span>
                  </div>
                </div>
                <button className="text-on-surface-variant hover:text-on-surface p-1">
                  <span className="material-symbols-outlined text-[18px]">
                    {isBrokenLinkAccordionOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                  </span>
                </button>
              </div>

              {isBrokenLinkAccordionOpen && (
                <div className="bg-surface-container-lowest/80 rounded-lg p-3 flex flex-col gap-2 text-xs border border-surface-container-high/30 animate-fade-in">
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Canonical Anchor Text:</span>
                    <span className="text-on-surface font-mono text-[11px] bg-surface-container px-1.5 py-0.5 rounded">
                      "Legacy API Reference"
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Server Response:</span>
                    <span className="text-error font-medium">HTTP 404 (Not Found in 118ms)</span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Suggested Redirect:</span>
                    <span className="text-primary font-mono text-[11px] truncate max-w-[200px]">
                      /docs/api-versioning
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Issue 2 */}
            <div className="rounded-xl bg-surface-container p-3 flex items-center justify-between border border-surface-container-high/40">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-error-container text-on-error-container shrink-0">
                  404
                </span>
                <span className="text-xs font-semibold text-on-surface truncate">/legal/subprocessors-2022</span>
              </div>
              <span className="text-[11px] text-on-surface-variant shrink-0">Terms footer</span>
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Interactive Button & Form Tester */}
      {(activeCategory === 'All Checks' || activeCategory === 'Buttons & Forms') && (
        <section className="rounded-2xl bg-surface-container-low p-4 sm:p-5 flex flex-col gap-3 shadow-md border border-surface-container-high/40 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-secondary border border-secondary/20">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              </div>
              <div className="flex flex-col">
                <h2 className="font-headline-sm text-base text-on-surface font-bold">Button & Form Tester</h2>
                <span className="text-xs text-on-surface-variant">Synthetic automated input fuzzing</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-tertiary-container/30 text-on-tertiary-container text-xs font-bold">
              All Operational
            </span>
          </div>

          <div className="rounded-xl bg-surface-container p-3.5 flex flex-col gap-2.5 border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-on-surface">Modal: "Talk to Checkout Specialist"</span>
              <span className="text-tertiary text-xs flex items-center gap-1 font-mono">
                <span className="material-symbols-outlined text-[14px]">check_circle</span> 200 OK (420ms)
              </span>
            </div>

            <div className="flex flex-col gap-1.5 bg-surface-container-lowest/80 rounded-lg p-3 border border-surface-container-high/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[16px]">done_all</span>
                <span className="text-xs text-on-surface-variant">
                  Field <span className="text-on-surface font-mono">#work-email</span>: Synthetic input test{' '}
                  <span className="text-primary font-mono">'audit-bot@qa.stripe'</span> accepted
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[16px]">done_all</span>
                <span className="text-xs text-on-surface-variant">
                  Email validation regex passed <span className="font-mono text-[10px] text-secondary">RFC-5322</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[16px]">done_all</span>
                <span className="text-xs text-on-surface-variant">CSRF token handshake validated; no payload drop</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-on-surface-variant text-xs pt-1">
              <span>Tested 12 Buttons & 3 Field Groups</span>
              <button
                onClick={handlePlayReplay}
                className="text-primary hover:underline font-semibold flex items-center gap-1"
              >
                <span>{isPlayingReplay ? 'Playing Simulation...' : 'Replay Video'}</span>
                <span className={`material-symbols-outlined text-[14px] ${isPlayingReplay ? 'animate-spin' : ''}`}>
                  videocam
                </span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Mobile Responsive Design Inspector */}
      {(activeCategory === 'All Checks' || activeCategory === 'Speed & Vitals') && (
        <section className="rounded-2xl bg-surface-container-low p-4 sm:p-5 flex flex-col gap-3 shadow-md border border-surface-container-high/40 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-primary/20">
                <span className="material-symbols-outlined text-[20px]">responsive_layout</span>
              </div>
              <div className="flex flex-col">
                <h2 className="font-headline-sm text-base text-on-surface font-bold">Mobile Layout Inspector</h2>
                <span className="text-xs text-on-surface-variant">Viewport boundary & touch audit</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold">
              1 Warning
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-surface-container rounded-xl p-3 flex flex-col border border-surface-container-high/40">
              <span className="text-xs text-on-surface-variant">Horizontal Overflow</span>
              <span className="text-xs text-tertiary font-bold mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check</span> Clean (0px bleed)
              </span>
            </div>
            <div className="bg-surface-container rounded-xl p-3 flex flex-col border border-surface-container-high/40">
              <span className="text-xs text-on-surface-variant">Touch Target &lt; 44px</span>
              <span className="text-xs text-error font-bold mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">warning</span> 2 Buttons Deficient
              </span>
            </div>
          </div>

          {/* Screenshot Visual Box Preview */}
          <div className="rounded-xl bg-surface-container p-3 flex flex-col gap-2 border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-on-surface">Viewport Snapshot Highlight</span>
              <span className="text-xs text-on-surface-variant font-mono">Target size: 36×28px</span>
            </div>

            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-surface-container-lowest border border-surface-container-high/50">
              <img
                className="w-full h-full object-cover opacity-80"
                alt="Mobile checkout viewport highlight"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClvNOX8zTF0b2gCOx1nvgpnrpYtMQroK2yjAGrMBHeDgiE10ab68ZGAvJDsHzuRWHChYVJKhTOp1CHv240qpr7UzytRBHJlJsvWZ80uZz8mJ2cMtssYyoIQ-NrWmGfHUrQxZ8sKB8IPMYaOOjvgzrVgJH2vVIHHX6AH8uPdHF3YIQxwULV492-6xe8iTbKNJNmc74YOykZafWgNexzPbB6eKKCIxx5dJHKrF2kwjqrlmGkFMdJDlyE"
              />
              <div className="absolute inset-0 bg-surface-container-lowest/20 backdrop-blur-[0.5px]"></div>
              <div className="absolute top-12 left-10 w-32 h-10 border-2 border-dashed border-error rounded-lg bg-error/20 flex items-center justify-center shadow-lg animate-pulse">
                <span className="bg-error text-on-error px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  36px tap target
                </span>
              </div>
              <div className="absolute bottom-2 left-2 bg-surface-container-high/90 px-2.5 py-1 rounded-lg text-xs font-semibold text-on-surface flex items-center gap-1 backdrop-blur-md">
                <span className="material-symbols-outlined text-[14px] text-error">crop_free</span>
                <span>Hero 'Apply Promo' Button</span>
              </div>
            </div>

            <span className="text-[11px] text-on-surface-variant">
              WCAG 2.5.5 suggests minimum interactive dimension of 44×44 CSS pixels.
            </span>
          </div>
        </section>
      )}

      {/* Section 4: WCAG 2.1 Accessibility Matrix */}
      {(activeCategory === 'All Checks' || activeCategory === 'Accessibility') && (
        <section className="rounded-2xl bg-surface-container-low p-4 sm:p-5 flex flex-col gap-3 shadow-md border border-surface-container-high/40 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-tertiary border border-tertiary/20">
                <span className="material-symbols-outlined text-[20px]">accessibility_new</span>
              </div>
              <div className="flex flex-col">
                <h2 className="font-headline-sm text-base text-on-surface font-bold">WCAG 2.1 AA Matrix</h2>
                <span className="text-xs text-on-surface-variant">Screen reader & visual compliance</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-tertiary-container/30 text-on-tertiary-container text-xs font-bold">
              98% Pass
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="rounded-xl bg-surface-container p-3 flex items-center justify-between border border-surface-container-high/40">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">contrast</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Color Contrast Ratio</span>
                  <span className="text-[11px] text-on-surface-variant">Min: 4.8:1 (Baseline 4.5:1)</span>
                </div>
              </div>
              <span className="text-xs text-tertiary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span> Pass AA
              </span>
            </div>

            <div className="rounded-xl bg-surface-container p-3 flex items-center justify-between border border-surface-container-high/40">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">image</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Alt Text Coverage</span>
                  <span className="text-[11px] text-on-surface-variant">42 of 43 media tags marked</span>
                </div>
              </div>
              <span className="text-xs text-on-surface font-bold font-mono">97.7%</span>
            </div>

            <div className="rounded-xl bg-surface-container p-3 flex items-center justify-between border border-surface-container-high/40">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">account_tree</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">ARIA Semantic Landmarks</span>
                  <span className="text-[11px] text-on-surface-variant">Full hierarchical tree intact</span>
                </div>
              </div>
              <span className="text-xs text-tertiary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span> Valid
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Sticky Action Bar */}
      <div className="sticky bottom-4 z-40 w-full pt-2">
        <div className="p-3 rounded-2xl bg-surface-container-high/95 backdrop-blur-xl shadow-2xl flex flex-col gap-2.5 border border-surface-container-highest">
          <button
            onClick={() => showToast('Exporting 14-page PDF with before/after visual proof (2.4 MB)...')}
            className="w-full py-3.5 px-4 rounded-xl bg-primary-container hover:bg-inverse-primary text-on-primary-container font-headline-sm text-sm font-bold flex items-center justify-between shadow-lg transition-transform active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
              <span>Export 14-Page Audit PDF</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-on-primary-container/20 px-2 py-0.5 rounded text-[11px] font-mono font-normal">
                2.4 MB
              </span>
              <span className="material-symbols-outlined text-[18px]">download</span>
            </div>
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast('Audit tickets and regression trace pushed to Jira Project QA-842!')}
              className="py-2.5 px-3 rounded-xl bg-surface-container text-on-surface hover:bg-surface-bright text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">send</span>
              <span>Push to Jira</span>
            </button>
            <button
              onClick={() => showToast('GitHub Issue #144 opened with stacktrace & repro HAR file!')}
              className="py-2.5 px-3 rounded-xl bg-surface-container text-on-surface hover:bg-surface-bright text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">terminal</span>
              <span>Create GitHub Issue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

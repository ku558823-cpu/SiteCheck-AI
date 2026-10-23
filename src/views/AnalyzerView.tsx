import React, { useState } from 'react';
import { DesktopTab } from '../types';

interface AnalyzerViewProps {
  onNavigateTab: (tab: DesktopTab) => void;
  onSelectDomainForAudit?: (domain: string) => void;
}

export const AnalyzerView: React.FC<AnalyzerViewProps> = ({ onNavigateTab, onSelectDomainForAudit }) => {
  const [url, setUrl] = useState('https://linear.app');
  const [showPresets, setShowPresets] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('Spawning Headless Chromium cluster in us-east-4...');
  const [scanComplete, setScanComplete] = useState(false);

  // Scope checkboxes
  const [scopeChips, setScopeChips] = useState([
    { id: 'speed', label: 'Speed & CWV', desc: 'LCP, CLS, INP 75th', icon: 'speed', active: true },
    { id: 'deadlinks', label: 'Dead Links & 404', desc: 'Crawl sub-routes', icon: 'link_off', active: true },
    { id: 'cta', label: 'CTA & Forms', desc: 'AI fuzzing test', icon: 'smart_button', active: true },
    { id: 'viewport', label: 'Viewport Matrix', desc: 'Tap targets & shift', icon: 'devices', active: true },
    { id: 'wcag', label: 'WCAG 2.1 AA/AAA', desc: 'A11y contrast audit', icon: 'accessibility_new', active: true },
    { id: 'seo', label: 'Technical SEO', desc: 'Robots, OG tags', icon: 'troubleshoot', active: true },
  ]);

  const [aiSimulationEnabled, setAiSimulationEnabled] = useState(true);

  const toggleChip = (id: string) => {
    setScopeChips((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const toggleAllChips = () => {
    const allActive = scopeChips.every((c) => c.active);
    setScopeChips((prev) => prev.map((c) => ({ ...c, active: !allActive })));
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) setUrl(text);
      } else {
        setUrl('https://news.ycombinator.com');
      }
    } catch {
      setUrl('https://news.ycombinator.com');
    }
  };

  const handleAnalyze = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanComplete(false);
    setScanProgress(15);
    setScanStatus('Spawning Headless Chromium cluster in us-east-4...');

    const stages = [
      { p: 35, msg: 'Collecting DOM tree, LCP Candidates & Core Web Vitals...' },
      { p: 58, msg: 'Fuzzing CTA click handlers & simulating touch gestures...' },
      { p: 82, msg: 'Running WCAG 2.1 AA/AAA contrast & a11y tree audits...' },
      { p: 96, msg: 'Generating AI patch recommendations & diff snippets...' },
      { p: 100, msg: 'Diagnostic complete! 48 Checkpoints Evaluated.' }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < stages.length) {
        setScanProgress(stages[i].p);
        setScanStatus(stages[i].msg);
        i++;
      } else {
        clearInterval(interval);
        setScanComplete(true);
        setTimeout(() => {
          setIsScanning(false);
        }, 1200);
      }
    }, 700);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Notification Ribbon */}
      <aside aria-label="Environment Notice" className="w-full bg-surface-container-low px-4 sm:px-8 py-2.5 border-b border-surface-container-high/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-on-surface-variant font-label-md text-xs sm:text-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-mono text-[10px] tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              SANDBOX DEMO MODE
            </span>
            <span className="text-on-surface">
              Live crawlers active across 180+ global edge locations. Preset demo domains run on cached high-fidelity snapshots.
            </span>
          </div>
          <div className="flex items-center gap-4 text-outline text-xs">
            <span className="hidden md:inline font-mono">Telemetry Node: iad-edge-09</span>
            <button
              onClick={() => onNavigateTab('audit-details')}
              className="text-primary hover:underline font-semibold flex items-center gap-1"
            >
              Switch to Live Audit
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Hero & URL Analyzer Console Section */}
      <section className="relative w-full px-4 sm:px-8 pt-10 pb-16 overflow-hidden">
        {/* Atmospheric Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-primary-container/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[420px] h-[260px] bg-secondary-container/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high border border-surface-container-highest shadow-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-label-sm text-xs font-semibold tracking-wider uppercase text-on-primary-fixed-variant">
              ✨ NEXT-GEN QA AUTOMATION • MULTI-MODAL AI VISION & CHROMIUM ENGINE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-headline-xl text-3xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight max-w-4xl font-extrabold leading-tight">
            Autonomous Website Auditing & <span className="text-primary">Instant AI Fix Generation</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-3xl mt-4 mb-10 leading-relaxed">
            Enter any production or staging URL to continuously discover broken links, dead CTA buttons, mobile layout collisions, Core Web Vitals regressions, and WCAG accessibility gaps.
          </p>

          {/* URL Analyzer Glassmorphism Console */}
          <div className="w-full max-w-5xl text-left bg-surface-container/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-surface-container-high relative">
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            {/* Input Row */}
            <div className="flex flex-col gap-3">
              <label className="font-label-md text-xs text-outline uppercase tracking-wider flex items-center justify-between">
                <span>Target Web Domain or Endpoint</span>
                <span className="text-[11px] text-tertiary font-mono flex items-center gap-1 font-normal">
                  <span className="material-symbols-outlined text-[13px]">verified_user</span>
                  Pre-flight DNS & TLS Handshake Verified
                </span>
              </label>

              <div className="flex flex-col lg:flex-row items-stretch gap-3">
                {/* URL Input Container */}
                <div className="relative flex-1 flex items-center bg-surface-container-lowest rounded-xl border border-surface-container-high/60 shadow-inner focus-within:bg-surface-container-low transition-colors">
                  <div className="pl-4 pr-2 flex items-center text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    className="w-full bg-transparent py-3.5 pr-4 text-on-surface font-mono text-sm placeholder:text-outline focus:outline-none"
                    placeholder="https://yourcompany.com"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <div className="hidden sm:flex items-center gap-1.5 pr-3">
                    <button
                      onClick={handlePaste}
                      className="px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-xs transition-colors flex items-center gap-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">content_paste</span>
                      Paste
                    </button>
                    <button
                      onClick={() => setShowPresets(!showPresets)}
                      className="px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-xs transition-colors flex items-center gap-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">bolt</span>
                      Presets
                    </button>
                  </div>
                </div>

                {/* Analyze CTA Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={isScanning}
                  className="relative group px-8 py-3.5 rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-base font-bold shadow-xl flex items-center justify-center gap-2 hover:bg-inverse-primary transition-all active:scale-[0.99] overflow-hidden cursor-pointer"
                  type="button"
                >
                  <span className={`material-symbols-outlined text-[22px] ${isScanning ? 'animate-spin' : 'group-hover:rotate-45'} transition-transform`}>
                    {isScanning ? 'sync' : 'bolt'}
                  </span>
                  <span>{isScanning ? 'Auditing URL...' : scanComplete ? 'Audit Ready' : 'Analyze Website Now'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>

              <div className="flex items-center justify-between text-outline text-xs pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-primary">schedule</span>
                  Estimated Execution Time: <strong className="text-on-surface font-mono">24s</strong> • 48 Autonomous Checkpoints
                </span>
                <span className="hidden md:inline font-mono text-[11px] text-outline">HTTP/3 QUIC • TLS 1.3 Strict</span>
              </div>
            </div>

            {/* Presets Ribbon */}
            {showPresets && (
              <div className="mt-4 pt-3 flex flex-wrap items-center gap-2 bg-surface-container-low/60 p-2.5 rounded-xl border border-surface-container-high/40">
                <span className="font-label-sm text-xs text-outline uppercase font-semibold">Quick Test Presets:</span>
                {['linear.app', 'stripe.com', 'vercel.com', 'shopify.dev', 'github.com'].map((domain) => (
                  <button
                    key={domain}
                    onClick={() => setUrl(`https://${domain}`)}
                    className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-mono text-xs hover:bg-surface-container-high border border-surface-container-high/40 transition-colors"
                    type="button"
                  >
                    {domain}
                  </button>
                ))}
              </div>
            )}

            {/* Audit Scope Selector Chips */}
            <div className="mt-6 pt-5 border-t border-surface-container-high/40">
              <div className="flex items-center justify-between mb-3">
                <span className="font-label-md text-sm text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-primary">rule</span>
                  Select Diagnostic Checkpoints
                </span>
                <button
                  onClick={toggleAllChips}
                  className="text-primary hover:underline text-xs"
                  type="button"
                >
                  Toggle All ({scopeChips.length})
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {scopeChips.map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => toggleChip(chip.id)}
                    className={`cursor-pointer text-left rounded-xl p-2.5 flex flex-col justify-between gap-2 border transition-all ${
                      chip.active
                        ? 'bg-surface-container-high border-surface-container-highest shadow-sm'
                        : 'bg-surface-container-lowest/50 border-surface-container-high/30 opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-primary text-[20px]">{chip.icon}</span>
                      <span className={`w-2 h-2 rounded-full ${chip.active ? 'bg-tertiary' : 'bg-outline'}`}></span>
                    </div>
                    <div>
                      <span className="text-xs text-on-surface font-semibold block">{chip.label}</span>
                      <span className="text-[11px] text-outline">{chip.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Agent Automation Settings Sub-panel */}
            <div className="mt-6 pt-5 bg-surface-container-low rounded-xl p-4 flex flex-col lg:flex-row items-center justify-between gap-4 border border-surface-container-high/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-sm text-on-surface font-semibold">Synthetic User Journey Agent</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-mono text-[10px] font-bold">
                      AUTONOMOUS
                    </span>
                  </div>
                  <p className="text-xs text-outline">AI simulates multi-step authentication, cart checkouts, and dynamic JS hydration.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-mono">
                  <span className="material-symbols-outlined text-[16px] text-primary">terminal</span>
                  <span>Chromium v122 (Headless)</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-mono">
                  <span className="material-symbols-outlined text-[16px] text-secondary">aspect_ratio</span>
                  <span>1440px + 390px</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAiSimulationEnabled(!aiSimulationEnabled)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
                    aiSimulationEnabled ? 'bg-primary-container flex justify-end' : 'bg-surface-container-highest flex justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-md"></span>
                </button>
              </div>
            </div>

            {/* Scan Progress Simulation Bar */}
            {(isScanning || scanComplete) && (
              <div className="mt-6 pt-5 border-t border-surface-container-high/40 animate-fade-in">
                <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high/50 shadow-inner flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                      <span className="font-mono text-xs">{scanStatus}</span>
                    </div>
                    <span className="font-mono text-primary font-bold">{scanProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary via-primary-container to-secondary rounded-full transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-outline">
                    <span>Checkpoint: DOM Mutation Tree • LCP candidate check</span>
                    <button
                      onClick={() => onNavigateTab('dashboard')}
                      className="text-tertiary hover:underline font-bold flex items-center gap-1"
                    >
                      View Live Diagnostic Dashboard →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Live Edge Telemetry Bar */}
      <section aria-label="Global Edge Telemetry" className="w-full bg-surface-container-low py-6 border-y border-surface-container-high/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1 pl-3 border-l-2 border-primary-container">
              <div className="flex items-center gap-1.5 text-outline text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-primary">auto_stories</span>
                Pages Audited
              </div>
              <div className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">14.2M+</div>
              <div className="text-xs text-tertiary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +184k today • Global mesh
              </div>
            </div>

            <div className="flex flex-col gap-1 pl-3 border-l-2 border-tertiary">
              <div className="flex items-center gap-1.5 text-outline text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                Anomaly Accuracy
              </div>
              <div className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">99.98%</div>
              <div className="text-xs text-on-surface-variant flex items-center gap-1">
                Zero synthetic false positives
              </div>
            </div>

            <div className="flex flex-col gap-1 pl-3 border-l-2 border-secondary">
              <div className="flex items-center gap-1.5 text-outline text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-secondary">hub</span>
                Edge Crawlers
              </div>
              <div className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">180+</div>
              <div className="text-xs text-tertiary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                All regions healthy
              </div>
            </div>

            <div className="flex flex-col gap-1 pl-3 border-l-2 border-primary">
              <div className="flex items-center gap-1.5 text-outline text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-primary">timelapse</span>
                Avg Triage Time
              </div>
              <div className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">&lt; 3 mins</div>
              <div className="text-xs text-on-surface-variant flex items-center gap-1">
                From error alert to PR fix
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Audited Web Domains Grid */}
      <section className="w-full px-4 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-surface-container text-primary font-mono text-xs uppercase tracking-wider mb-2 font-semibold border border-surface-container-high/60">
                <span className="material-symbols-outlined text-[14px]">history</span>
                Continuous Monitoring Stream
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">
                Recently Audited Web Domains
              </h2>
              <p className="text-sm text-on-surface-variant">Real-world health telemetry, regression scores, and direct deep-link diagnostics.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-surface-container rounded-lg p-1 text-on-surface text-xs border border-surface-container-high">
                <button className="px-3 py-1.5 rounded bg-primary-container text-on-primary-container font-semibold" type="button">
                  Active Watchlist
                </button>
                <button className="px-3 py-1.5 rounded text-on-surface-variant hover:text-on-surface" type="button">
                  Staging Envs
                </button>
              </div>
              <button
                onClick={() => onNavigateTab('testing-reports')}
                className="px-3.5 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-bright text-xs font-semibold flex items-center gap-1.5 transition-colors border border-surface-container-highest"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                View All Audits
              </button>
            </div>
          </div>

          {/* Domain Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Domain 1: Linear */}
            <article className="bg-surface-container/80 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:bg-surface-container transition-all flex flex-col justify-between group border border-surface-container-high/60">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center font-bold text-primary font-mono text-sm border border-surface-container-highest">
                      LN
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-base text-on-surface font-semibold group-hover:text-primary transition-colors">
                        linear.app
                      </h3>
                      <span className="text-[11px] text-outline font-mono">audited 4m ago</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-mono text-xs font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">arrow_upward</span>
                    +4pts
                  </span>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-3.5 mb-4 flex items-center justify-between border border-surface-container-high/40">
                  <div>
                    <span className="text-xs text-outline block">Health Index</span>
                    <span className="text-2xl font-extrabold text-on-surface font-mono">
                      98<span className="text-outline text-sm font-normal">/100</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary text-xs font-bold">
                      GRADE A+
                    </span>
                    <span className="text-[11px] text-outline block mt-1">0 Critical Issues</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-1.5 text-xs text-on-surface-variant mb-5">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>LCP 0.8s</span>
                    <span className="text-tertiary font-mono">PASS</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>WCAG AA Color Contrast</span>
                    <span className="text-tertiary font-mono">100%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>Dead Links</span>
                    <span className="text-outline font-mono">0 found</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-surface-container-high/50">
                <button
                  onClick={() => onNavigateTab('dashboard')}
                  className="flex-1 py-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-bright text-xs font-semibold transition-colors text-center flex items-center justify-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">description</span>
                  Report
                </button>
                <button
                  onClick={handleAnalyze}
                  className="p-2 rounded-xl bg-primary-container/20 text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">replay</span>
                </button>
              </div>
            </article>

            {/* Domain 2: Vercel */}
            <article className="bg-surface-container/80 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:bg-surface-container transition-all flex flex-col justify-between group border border-surface-container-high/60">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center font-bold text-on-surface font-mono text-sm border border-surface-container-highest">
                      ▲
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-base text-on-surface font-semibold group-hover:text-primary transition-colors">
                        vercel.com
                      </h3>
                      <span className="text-[11px] text-outline font-mono">audited 18m ago</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-mono text-xs font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">arrow_upward</span>
                    +1pt
                  </span>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-3.5 mb-4 flex items-center justify-between border border-surface-container-high/40">
                  <div>
                    <span className="text-xs text-outline block">Health Index</span>
                    <span className="text-2xl font-extrabold text-on-surface font-mono">
                      96<span className="text-outline text-sm font-normal">/100</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary text-xs font-bold">
                      GRADE A
                    </span>
                    <span className="text-[11px] text-outline block mt-1">1 Non-blocking</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-1.5 text-xs text-on-surface-variant mb-5">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>LCP 1.1s</span>
                    <span className="text-tertiary font-mono">PASS</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>Cumulative Layout Shift</span>
                    <span className="text-tertiary font-mono">0.01</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>Missing Alt Text</span>
                    <span className="text-secondary font-mono">1 SVG tag</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-surface-container-high/50">
                <button
                  onClick={() => onNavigateTab('dashboard')}
                  className="flex-1 py-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-bright text-xs font-semibold transition-colors text-center flex items-center justify-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">description</span>
                  Report
                </button>
                <button
                  onClick={handleAnalyze}
                  className="p-2 rounded-xl bg-primary-container/20 text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">replay</span>
                </button>
              </div>
            </article>

            {/* Domain 3: Stripe */}
            <article className="bg-surface-container/80 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:bg-surface-container transition-all flex flex-col justify-between group border border-surface-container-high/60">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center font-bold text-secondary font-mono text-sm border border-surface-container-highest">
                      ST
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-base text-on-surface font-semibold group-hover:text-primary transition-colors">
                        stripe.com
                      </h3>
                      <span className="text-[11px] text-outline font-mono">audited 42m ago</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container/30 text-secondary font-mono text-xs font-semibold flex items-center gap-1">
                    ±0pts
                  </span>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-3.5 mb-4 flex items-center justify-between border border-surface-container-high/40">
                  <div>
                    <span className="text-xs text-outline block">Health Index</span>
                    <span className="text-2xl font-extrabold text-on-surface font-mono">
                      94<span className="text-outline text-sm font-normal">/100</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary text-xs font-bold">
                      GRADE A
                    </span>
                    <span className="text-[11px] text-outline block mt-1">2 Warnings</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-1.5 text-xs text-on-surface-variant mb-5">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>DOM Tree Depth</span>
                    <span className="text-tertiary font-mono">Optimal</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span>Font Subsetting</span>
                    <span className="text-outline font-mono">Warn (240kb)</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>Security Headers</span>
                    <span className="text-tertiary font-mono">HSTS+CSP OK</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-surface-container-high/50">
                <button
                  onClick={() => onNavigateTab('dashboard')}
                  className="flex-1 py-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-bright text-xs font-semibold transition-colors text-center flex items-center justify-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">description</span>
                  Report
                </button>
                <button
                  onClick={handleAnalyze}
                  className="p-2 rounded-xl bg-primary-container/20 text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">replay</span>
                </button>
              </div>
            </article>

            {/* Domain 4: Shopify Dev */}
            <article className="bg-surface-container/80 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:bg-surface-container transition-all flex flex-col justify-between group border border-surface-container-high/60">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center font-bold text-tertiary font-mono text-sm border border-surface-container-highest">
                      SH
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-base text-on-surface font-semibold group-hover:text-primary transition-colors">
                        shopify.dev
                      </h3>
                      <span className="text-[11px] text-outline font-mono">audited 1h ago</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-error-container/40 text-error font-mono text-xs font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">arrow_downward</span>
                    -3pts
                  </span>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-3.5 mb-4 flex items-center justify-between border border-surface-container-high/40">
                  <div>
                    <span className="text-xs text-outline block">Health Index</span>
                    <span className="text-2xl font-extrabold text-on-surface font-mono">
                      89<span className="text-outline text-sm font-normal">/100</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container/40 text-error text-xs font-bold">
                      GRADE B+
                    </span>
                    <span className="text-[11px] text-error block mt-1">1 Regression</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-1.5 text-xs text-on-surface-variant mb-5">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-error"></span>Mobile Tap Collision</span>
                    <span className="text-error font-mono">Failed (390px)</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>Cache Invalidation</span>
                    <span className="text-tertiary font-mono">PASS</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>Sub-routes Crawled</span>
                    <span className="text-outline font-mono">142 endpoints</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-surface-container-high/50">
                <button
                  onClick={() => onNavigateTab('dashboard')}
                  className="flex-1 py-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-bright text-xs font-semibold transition-colors text-center flex items-center justify-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">description</span>
                  Report
                </button>
                <button
                  onClick={handleAnalyze}
                  className="p-2 rounded-xl bg-primary-container/20 text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">replay</span>
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Interactive Feature Showcase: 3 High-Density Columns */}
      <section className="w-full px-4 sm:px-8 py-16 bg-surface-container-low/50 border-t border-surface-container-high/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider text-primary font-bold">Autonomous QA Infrastructure</span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold mt-1">
              Engineered for Dev Teams Who Ship Daily
            </h2>
            <p className="text-sm text-on-surface-variant mt-2">
              From multi-modal headless visual comparison to automatic remediation code PRs on GitHub.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feature 1: Autonomous AI Agent */}
            <div className="bg-surface-container rounded-2xl p-6 shadow-xl flex flex-col justify-between border border-surface-container-high/50">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[26px]">smart_toy</span>
                </div>
                <h3 className="font-headline-md text-lg text-on-surface font-bold mb-2">Autonomous Agent Vision</h3>
                <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Our Vision-LLM simulates real mouse moves, keystrokes, and touch gestures. It navigates modal traps, fills checkout forms, and logs unhandled exceptions.
                </p>

                <div className="bg-surface-container-lowest rounded-xl p-3.5 font-mono text-[11px] text-outline mb-4 space-y-1 border border-surface-container-high/40">
                  <div className="text-tertiary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                    <span>Agent #402 initialized headless session</span>
                  </div>
                  <div className="text-on-surface-variant">&gt; Clicked [data-cta="checkout"] at (820, 410)</div>
                  <div className="text-on-surface-variant">&gt; Injected fuzzy email: qa-bot@sitecheck.ai</div>
                  <div className="text-error flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[12px]">priority_high</span>
                    <span>Uncaught TypeError: cart.mutate is undefined</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('ai-assistant')}
                className="flex items-center gap-2 pt-2 text-primary text-xs font-semibold hover:underline"
              >
                <span>Explore Agent Architecture</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Feature 2: Multi-Viewport Visual Regression */}
            <div className="bg-surface-container rounded-2xl p-6 shadow-xl flex flex-col justify-between border border-surface-container-high/50">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[26px]">compare</span>
                </div>
                <h3 className="font-headline-md text-lg text-on-surface font-bold mb-2">Multi-Viewport Regression</h3>
                <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Pixel-level perceptual difference mapping across 4 standard viewports simultaneously. Flags horizontal scroll overflow and overlapping text spans.
                </p>

                <div className="bg-surface-container-lowest rounded-xl p-3 mb-4 border border-surface-container-high/40">
                  <div className="flex items-center justify-between text-[11px] font-mono text-outline mb-2">
                    <span>Viewport: iPhone 15 Pro (390x844)</span>
                    <span className="text-error font-semibold">14px layout collision</span>
                  </div>
                  <div className="relative w-full h-28 bg-surface-container-high rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-error/20 to-transparent"></div>
                    <div className="flex items-center gap-4 text-center">
                      <div className="p-2 rounded bg-surface-container text-[11px] font-mono text-on-surface">
                        .btn-primary<br /><span className="text-outline">w: 180px</span>
                      </div>
                      <span className="material-symbols-outlined text-error text-[20px]">close</span>
                      <div className="p-2 rounded bg-surface-container text-[11px] font-mono text-on-surface">
                        .nav-drawer<br /><span className="text-outline">z-index: 10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('audit-details')}
                className="flex items-center gap-2 pt-2 text-primary text-xs font-semibold hover:underline"
              >
                <span>View Regression Engine Specs</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Feature 3: 1-Click Pull Request Fixes */}
            <div className="bg-surface-container rounded-2xl p-6 shadow-xl flex flex-col justify-between border border-surface-container-high/50">
              <div>
                <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[26px]">commit</span>
                </div>
                <h3 className="font-headline-md text-lg text-on-surface font-bold mb-2">1-Click Pull Request Fixes</h3>
                <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                  SiteCheck AI doesn't just complain about bugs. It connects to GitHub or GitLab and issues verified pull requests with patched CSS and React components.
                </p>

                <div className="bg-surface-container-lowest rounded-xl p-3 font-mono text-[11px] mb-4 space-y-1 overflow-x-auto border border-surface-container-high/40">
                  <div className="text-outline">// components/HeroNav.tsx (Auto-generated fix)</div>
                  <div className="bg-error/15 text-error px-1.5 py-0.5 rounded flex items-center gap-2">
                    <span>-</span>
                    <span>&lt;button className="w-full flex justify-between"&gt;</span>
                  </div>
                  <div className="bg-tertiary/15 text-tertiary px-1.5 py-0.5 rounded flex items-center gap-2">
                    <span>+</span>
                    <span>&lt;button className="w-full flex justify-between touch-manipulation min-h-[44px]"&gt;</span>
                  </div>
                  <div className="text-on-surface-variant text-[10px] pt-1">Validated against WCAG 2.5.5 Target Size criteria</div>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('ai-assistant')}
                className="flex items-center gap-2 pt-2 text-primary text-xs font-semibold hover:underline"
              >
                <span>See GitHub Bot Integration</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* High Impact Bottom Action Callout */}
      <section className="w-full px-4 sm:px-8 py-12">
        <div className="max-w-7xl mx-auto rounded-2xl bg-gradient-to-r from-primary-container via-surface-container-high to-surface-container p-8 lg:p-12 shadow-2xl border border-primary-container/40 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-wider font-bold mb-2">
              <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
              Automate Continuous Staging Audits
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">
              Never let a dead link or broken layout hit production again.
            </h2>
            <p className="text-sm text-on-surface-variant mt-2">
              Plug SiteCheck AI into your GitHub Actions, Vercel deployments, or run on-demand edge diagnostics in seconds.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => onNavigateTab('pricing')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-on-surface text-surface-container-lowest font-headline-sm text-sm font-bold shadow-lg hover:bg-white transition-all text-center"
              type="button"
            >
              Start Free Team Trial
            </button>
            <button
              onClick={() => onNavigateTab('pricing')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-container-low/80 text-on-surface hover:bg-surface-container-low font-headline-sm text-sm font-semibold transition-colors text-center border border-surface-container-high"
              type="button"
            >
              Request Enterprise Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { ViewMode } from '../types';
import { mockReports } from '../data/mockData';

interface MobileShellProps {
  onSwitchToDesktop: () => void;
  onOpenInspectNode?: (selector: string, error: string) => void;
  onOpenAuth?: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const MobileShell: React.FC<MobileShellProps> = ({
  onSwitchToDesktop,
  onOpenInspectNode,
  onOpenAuth,
  theme,
  setTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'audit' | 'dashboard' | 'ai-agent' | 'reports'>('home');
  const [deviceFrame, setDeviceFrame] = useState<boolean>(true);

  // Home Screen States
  const [inputUrl, setInputUrl] = useState('https://stripe.com');
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['all']);
  const [aiSimulationActive, setAiSimulationActive] = useState(true);
  const [telemetryRunning, setTelemetryRunning] = useState(false);
  const [telemetryStep, setTelemetryStep] = useState(0);

  // Dashboard filter state
  const [dashboardFilter, setDashboardFilter] = useState<'all' | 'critical' | 'warning' | 'notice'>('all');
  const [autoFixedIds, setAutoFixedIds] = useState<string[]>([]);

  // Audit Details states
  const [selectedDevice, setSelectedDevice] = useState<'iphone' | 'pixel' | 'galaxy' | 'ipad'>('iphone');
  const [sentinelExpanded, setSentinelExpanded] = useState<number | null>(0);

  // AI Agent states
  const [copiedPatch, setCopiedPatch] = useState(false);
  const [prCreated, setPrCreated] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Diagnostic run complete on stripe.com/checkout. Found 1 critical DOM bounding overflow causing 42px touch target clipping.',
      time: '10:42 AM',
    },
    {
      sender: 'ai',
      text: 'Recommended fix: apply `contain: paint` on #nav-wrapper and clamp max-width to 100vw. Shall I generate a GitHub PR?',
      time: '10:43 AM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Simulation handler
  const handleStartAnalyze = () => {
    setTelemetryRunning(true);
    setTelemetryStep(1);

    const timer1 = setTimeout(() => setTelemetryStep(2), 1200);
    const timer2 = setTimeout(() => setTelemetryStep(3), 2400);
    const timer3 = setTimeout(() => {
      setTelemetryStep(4);
      setTimeout(() => {
        setTelemetryRunning(false);
        setActiveTab('dashboard');
      }, 1000);
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleToggleScope = (scope: string) => {
    if (scope === 'all') {
      setSelectedScopes(['all']);
    } else {
      const next = selectedScopes.includes(scope)
        ? selectedScopes.filter((s) => s !== scope && s !== 'all')
        : [...selectedScopes.filter((s) => s !== 'all'), scope];
      setSelectedScopes(next.length ? next : ['all']);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = { sender: 'user' as const, text: chatInput, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai' as const,
          text: `Analyzed query. Headless Chromium re-verified viewports: No CLS regression detected with proposed patch. Ready to deploy.`,
          time: 'Just now',
        },
      ]);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface flex flex-col items-center py-4 px-2 sm:px-4">
      {/* Top Device Bar & Mode Switcher */}
      <div className="w-full max-w-md mb-3 flex items-center justify-between px-2 bg-surface-container/60 backdrop-blur-md rounded-xl p-2 border border-outline-variant/30 text-[12px]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[18px]">smartphone</span>
          <span className="font-semibold text-on-surface">Mobile Companion View</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface text-[11px] font-semibold flex items-center gap-1 transition-colors"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to White Mode'}
          >
            <span className="material-symbols-outlined text-[14px] text-primary">
              {theme === 'light' ? 'light_mode' : 'dark_mode'}
            </span>
            <span>{theme === 'light' ? 'White' : 'Dark'}</span>
          </button>
          <button
            onClick={() => setDeviceFrame(!deviceFrame)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              deviceFrame ? 'bg-primary-container text-white' : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            {deviceFrame ? 'Frame ON' : 'Frame OFF'}
          </button>
          <button
            onClick={onSwitchToDesktop}
            className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container text-primary hover:text-primary-fixed-dim text-[11px] font-semibold flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">desktop_windows</span>
            <span>Desktop</span>
          </button>
        </div>
      </div>

      {/* Main Container / Phone Mockup Shell */}
      <div
        className={`w-full max-w-[420px] transition-all duration-300 relative bg-surface overflow-hidden flex flex-col ${
          deviceFrame
            ? 'rounded-[44px] border-[10px] border-surface-container-highest shadow-2xl ring-1 ring-outline-variant/30 min-h-[860px]'
            : 'rounded-2xl border border-outline-variant/30 min-h-[820px]'
        }`}
      >
        {/* Dynamic Island / Speaker Notch (When frame enabled) */}
        {deviceFrame && (
          <div className="w-full pt-3 pb-1 flex justify-center items-center bg-surface shrink-0 z-50">
            <div className="w-28 h-5 rounded-full bg-surface-container-lowest flex items-center justify-between px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest/60"></span>
              <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"></span>
            </div>
          </div>
        )}

        {/* Mobile Header */}
        <header className="sticky top-0 w-full z-40 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20">
          <div className="h-14 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <img
                  alt="SiteCheck AI Logo"
                  className="h-7 w-auto object-contain drop-shadow-[0_0_12px_rgba(37,99,235,0.45)]"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1URNQJjQ6Xxpb_rr5B_n2GQcngpqZ_EI9lCPytW8iLKFSqW_XnmfKGTJN3JFRYs6rXXEay6pMP96Kj0I55rM1wLDjF4gerkiOSlJLZ-YSkVhhpOR7pdDkceJ4PuTqDGRcSVz3-Oyz56iRXgG3WoZSy3XO1S224OUwgR1B11E4DnI_x94u0VPT7slYHlLJOYVggN3aaI7SXV6xrGMwl5hIBSpM3EQMfeip9xWV6i2RBfICOriiAecQ_2bgM"
                />
              </div>
              <span className="font-bold text-[16px] tracking-tight text-on-surface font-headline-sm">SiteCheck</span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-container/20 border border-tertiary/30">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                <span className="text-[9px] text-tertiary tracking-wide uppercase font-bold">AI Active</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                aria-label="Toggle Theme"
                className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center text-on-surface transition-colors"
                title={theme === 'light' ? 'Dark Mode' : 'White Mode'}
              >
                <span className="material-symbols-outlined text-[17px] text-primary">
                  {theme === 'light' ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <button
                onClick={onOpenAuth}
                aria-label="Account Access"
                className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">key</span>
              </button>
              <div className="relative w-8 h-8 flex items-center justify-center">
                <img
                  alt="Profile"
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-primary/40"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7nJzUJcbKFqzI293intaRHOc7G24DX3Nv2j_3g_SNvxyd6jee2Z-dRcNYOJ5meVkqJRcEdQjFm3uKOAPrg4UGKLPSHX3P32KgePC5TLntAta5b1OkKLIaUzk5zzOKHlzS4p0VfhQk_c98y2hhunea0mF9ohDv6YTplOlAaG5TiCH_1GH1pCpvcMLRYHEqkFKpT6ZzIJyWRubjRR2DeHcEZnRXxIrbR278KC0Ep-v4TbpzP97Q9pBS"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Viewport Content */}
        <main className="flex-1 overflow-y-auto pb-24 p-4 space-y-4">
          {/* TAB 1: HOME / AUDIT LAUNCHER (Image 1 & 2) */}
          {activeTab === 'home' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Pitch */}
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high w-fit text-[10px] text-on-surface font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                  <span>Powered by Claude 3.5 &amp; GPT-4o Vision</span>
                </div>
                <h1 className="text-xl font-bold font-headline-lg-mobile text-on-surface tracking-tight mt-1">
                  Autonomous Web Testing &amp; QA in Seconds
                </h1>
                <p className="text-[12px] text-on-surface-variant leading-relaxed">
                  Enter any URL to test performance, broken links, mobile responsiveness, SEO, forms, and accessibility.
                </p>
              </div>

              {/* URL Input Card */}
              <div className="rounded-xl bg-surface-container/85 border border-outline-variant/30 p-3.5 space-y-3 shadow-lg">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-on-surface-variant flex justify-between">
                    <span>Target Production or Staging URL</span>
                    <button
                      onClick={() => setInputUrl('https://linear.app')}
                      className="text-primary hover:underline text-[10px] flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-[12px]">bolt</span> Quick Preset
                    </button>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined text-[18px] text-primary absolute left-3 pointer-events-none">
                      language
                    </span>
                    <input
                      type="url"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="https://yourcompany.com"
                      className="w-full pl-9 pr-8 py-2 rounded-lg bg-surface-container-lowest text-on-surface text-[13px] border border-outline-variant/30 focus:outline-none focus:border-primary"
                    />
                    {inputUrl && (
                      <button
                        onClick={() => setInputUrl('')}
                        className="absolute right-2.5 text-on-surface-variant hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Audit Scope & Checkpoints */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                    Audit Scope &amp; Checkpoints
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: '✨ All Audits (Full Scan)' },
                      { id: 'perf', label: '⚡ Performance (CWV)' },
                      { id: 'links', label: '🔗 Broken Links' },
                      { id: 'a11y', label: '♿ Accessibility' },
                      { id: 'forms', label: '📝 Contact Forms' },
                    ].map((scope) => {
                      const isActive = selectedScopes.includes(scope.id);
                      return (
                        <button
                          key={scope.id}
                          onClick={() => handleToggleScope(scope.id)}
                          type="button"
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                            isActive
                              ? 'bg-primary-container text-white shadow-sm'
                              : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                          }`}
                        >
                          {scope.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live AI Agent Simulation Toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-on-surface">Live AI Agent Simulation</div>
                      <div className="text-[9px] text-on-surface-variant">Simulates human clicks &amp; inputs</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAiSimulationActive(!aiSimulationActive)}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                      aiSimulationActive ? 'bg-primary-container' : 'bg-surface-container-highest'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        aiSimulationActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleStartAnalyze}
                  disabled={telemetryRunning}
                  className="w-full py-3 px-3 rounded-xl bg-primary-container hover:bg-blue-600 text-white font-bold text-[14px] flex flex-col items-center justify-center shadow-lg shadow-primary-container/30 transition-all disabled:opacity-75"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                    <span>{telemetryRunning ? 'Simulating Engine Scan...' : 'Analyze Website'}</span>
                  </span>
                  <span className="text-[10px] font-normal text-white/80">Est. 18s • 42 Automated Checkpoints</span>
                </button>
              </div>

              {/* Telemetry Progress Bar */}
              {telemetryRunning && (
                <div className="rounded-lg bg-surface-container-high border border-outline-variant/30 p-3 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-on-surface font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                      <span>
                        {telemetryStep === 1 && 'Launching headless chromium swarm...'}
                        {telemetryStep === 2 && 'Simulating DOM interaction & form fuzzing...'}
                        {telemetryStep === 3 && 'Evaluating WCAG contrast & network payload...'}
                        {telemetryStep === 4 && 'Audit complete! 0 critical regressions.'}
                      </span>
                    </div>
                    <span className="text-primary font-mono font-bold">
                      {telemetryStep === 1 && '00:03'}
                      {telemetryStep === 2 && '00:08'}
                      {telemetryStep === 3 && '00:14'}
                      {telemetryStep === 4 && '00:18'}
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-500"
                      style={{
                        width:
                          telemetryStep === 1
                            ? '25%'
                            : telemetryStep === 2
                            ? '55%'
                            : telemetryStep === 3
                            ? '85%'
                            : '100%',
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Recent Scans */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[13px] font-bold text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-primary">history</span>
                    <span>Recent Scans</span>
                  </div>
                  <span className="text-[11px] text-primary font-semibold">View All</span>
                </div>

                <div className="space-y-2">
                  {[
                    { domain: 'github.com', time: '2m ago', score: 96, pass: true, icon: 'G' },
                    { domain: 'airbnb.com', time: '14m ago', score: 84, pass: true, icon: 'A' },
                    { domain: 'linear.app', time: '1h ago', score: 98, pass: true, icon: 'L' },
                  ].map((scan) => (
                    <div
                      key={scan.domain}
                      onClick={() => setActiveTab('dashboard')}
                      className="p-2.5 rounded-xl bg-surface-container/70 border border-outline-variant/20 flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-primary text-[13px]">
                          {scan.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold text-on-surface truncate">{scan.domain}</div>
                          <div className="text-[10px] text-on-surface-variant">{scan.time} • Core Web Vitals</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-[13px] font-bold text-tertiary">{scan.score}/100</div>
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-tertiary-container/30 text-tertiary font-bold">
                            PASS
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AUDIT DETAILS (Image 5 & 6) */}
          {activeTab === 'audit' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Target & Device Ribbon */}
              <div className="rounded-xl bg-surface-container-low border border-outline-variant/20 p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-outline uppercase font-mono font-semibold">Live Device Viewport</span>
                  <span className="text-tertiary font-medium">Headless Chrome 124</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[18px]">devices</span>
                    <span className="font-bold text-[14px]">Viewport Matrix</span>
                  </div>
                  <div className="flex gap-1">
                    {[
                      { id: 'iphone', label: 'iPhone 15' },
                      { id: 'pixel', label: 'Pixel 8' },
                      { id: 'galaxy', label: 'S24' },
                    ].map((dev) => (
                      <button
                        key={dev.id}
                        onClick={() => setSelectedDevice(dev.id as any)}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          selectedDevice === dev.id
                            ? 'bg-primary-container text-white'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {dev.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Responsive Snapshot with Interactive Tap Target Warning */}
              <div className="rounded-xl bg-surface-container border border-outline-variant/30 overflow-hidden shadow-lg">
                <div className="bg-surface-container-highest px-3 py-1.5 flex items-center justify-between text-[10px]">
                  <span className="font-mono text-on-surface-variant">390 x 844 px (DPR 3.0)</span>
                  <span className="text-error font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">warning</span> Tap target &lt; 48px
                  </span>
                </div>
                <div className="relative p-2 bg-surface-container-lowest flex justify-center">
                  <div className="relative rounded-lg overflow-hidden border border-outline-variant/40">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTm-Xk5wV385o373f73_P1L-rYl-3Uu-4tE5L3cI9t7r4Gg6u9qL3e8qM-1W0T8jE9x"
                      alt="Mobile Audit Viewport Screenshot"
                      className="w-full h-48 object-cover object-top"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                    {/* Bounding box overlay indicator */}
                    <div
                      onClick={() =>
                        onOpenInspectNode &&
                        onOpenInspectNode('button.mobile-cta-subscribe', 'Tap target bounding box is 36x36px (<48px WCAG min)')
                      }
                      className="absolute bottom-6 right-6 border-2 border-dashed border-error bg-error/20 p-1 rounded cursor-pointer hover:bg-error/30 transition-colors"
                    >
                      <span className="text-[9px] font-bold text-white bg-error px-1 py-0.2 rounded font-mono">
                        36px [Fail]
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Broken Link Sentinel Accordion */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-on-surface flex items-center gap-1">
                    <span className="material-symbols-outlined text-error text-[16px]">link_off</span>
                    <span>Broken Link Sentinel</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-error-container/30 text-error font-bold">
                    3 Failures
                  </span>
                </div>

                {[
                  {
                    code: '404',
                    title: 'Not Found',
                    url: 'https://stripe.com/docs/deprecated-api-v1',
                    source: 'Footer > Developer Docs',
                  },
                  {
                    code: '502',
                    title: 'Bad Gateway',
                    url: 'https://api.stripe.com/v1/sandbox/status-ping',
                    source: 'Status Banner Widget',
                  },
                ].map((link, idx) => (
                  <div
                    key={link.url}
                    className="rounded-lg bg-surface-container/70 border border-outline-variant/30 overflow-hidden text-[11px]"
                  >
                    <div
                      onClick={() => setSentinelExpanded(sentinelExpanded === idx ? null : idx)}
                      className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-surface-container"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-mono font-bold text-[10px]">
                          {link.code}
                        </span>
                        <div className="min-w-0">
                          <div className="font-semibold text-on-surface truncate">{link.url}</div>
                          <div className="text-[9px] text-on-surface-variant">{link.source}</div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                        {sentinelExpanded === idx ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                    {sentinelExpanded === idx && (
                      <div className="p-2.5 pt-0 border-t border-outline-variant/20 bg-surface-container-low/60 space-y-1.5">
                        <div className="text-[10px] text-on-surface-variant">
                          Triggered by automated link crawler. Anchor tag href references obsolete path.
                        </div>
                        <button
                          onClick={() => {
                            if (onOpenInspectNode) {
                              onOpenInspectNode(`a[href="${link.url}"]`, `Link returns HTTP ${link.code}`);
                            }
                          }}
                          className="px-2 py-1 rounded bg-primary-container text-white text-[10px] font-semibold flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[12px]">auto_fix_high</span> Auto-Redirect Patch
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DASHBOARD (Image 3 & 4) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Target Host Card */}
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono text-outline">Target Host</div>
                  <div className="text-[15px] font-bold text-on-surface flex items-center gap-1.5 mt-0.5">
                    <span className="material-symbols-outlined text-primary text-[18px]">public</span>
                    <span>stripe.com</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-on-surface-variant font-mono">Mobile Chrome</span>
                  <div className="text-[10px] text-tertiary flex items-center gap-1 justify-end font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> 3 mins ago
                  </div>
                </div>
              </div>

              {/* Radial Score Gauge Card */}
              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col items-center shadow-lg relative overflow-hidden">
                <div className="relative w-32 h-32 flex items-center justify-center my-1">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                    <circle
                      className="text-surface-container-highest fill-none"
                      cx="70"
                      cy="70"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="10"
                    ></circle>
                    <circle
                      className="fill-none transition-all duration-1000 ease-out"
                      cx="70"
                      cy="70"
                      r="58"
                      stroke="#4edea3"
                      strokeDasharray="364.4"
                      strokeDashoffset="29.15"
                      strokeLinecap="round"
                      strokeWidth="10"
                    ></circle>
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-on-surface">92</span>
                    <span className="text-[9px] text-outline uppercase font-mono">OUT OF 100</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-container/30 text-tertiary text-[11px] font-bold mt-1">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>Grade A • Production Ready</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-on-surface-variant mt-2 font-medium">
                  <span className="text-tertiary font-bold">42 Passed</span>
                  <span>•</span>
                  <span className="text-error font-bold">1 Critical</span>
                  <span>•</span>
                  <span className="text-secondary font-bold">1 Warning</span>
                </div>

                {/* Quick action buttons */}
                <div className="grid grid-cols-3 gap-2 w-full mt-3 pt-2 border-t border-outline-variant/20">
                  <button
                    onClick={() => alert('Exporting Mobile PDF report...')}
                    className="p-2 rounded-lg bg-primary-container text-white text-[11px] font-semibold flex flex-col items-center gap-0.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span> PDF Report
                  </button>
                  <button
                    onClick={handleStartAnalyze}
                    className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-[11px] font-medium flex flex-col items-center gap-0.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">replay</span> Re-run
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-[11px] font-medium flex flex-col items-center gap-0.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">share</span> Share
                  </button>
                </div>
              </div>

              {/* 4 Pillars Grid */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-outline px-1">Audit Pillars</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-surface-container/70 border border-outline-variant/20 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-primary text-[15px]">bolt</span> Speed
                      </span>
                      <span className="text-tertiary font-bold">94</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                      <div className="bg-tertiary h-full rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <div className="text-[9px] text-on-surface-variant flex justify-between">
                      <span>LCP: 1.1s</span>
                      <span>FID: 12ms</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container/70 border border-outline-variant/20 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-error text-[15px]">bug_report</span> Functions
                      </span>
                      <span className="text-error font-bold">88</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                      <div className="bg-error h-full rounded-full" style={{ width: '88%' }}></div>
                    </div>
                    <div className="text-[9px] text-on-surface-variant flex justify-between">
                      <span>3 broken</span>
                      <span>1 timeout</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container/70 border border-outline-variant/20 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-secondary text-[15px]">accessibility_new</span> A11y
                      </span>
                      <span className="text-tertiary font-bold">96</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                      <div className="bg-tertiary h-full rounded-full" style={{ width: '96%' }}></div>
                    </div>
                    <div className="text-[9px] text-on-surface-variant flex justify-between">
                      <span>Contrast: Pass</span>
                      <span>ARIA: 100%</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container/70 border border-outline-variant/20 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-primary text-[15px]">travel_explore</span> SEO
                      </span>
                      <span className="text-tertiary font-bold">91</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '91%' }}></div>
                    </div>
                    <div className="text-[9px] text-on-surface-variant flex justify-between">
                      <span>Meta: Valid</span>
                      <span>JSON-LD: Yes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Issue Tracker Card with Filter Tabs & Auto-Fix */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-on-surface">Issue Tracker</span>
                  <div className="flex gap-1">
                    {(['all', 'critical', 'warning'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setDashboardFilter(filter)}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          dashboardFilter === filter
                            ? 'bg-primary-container text-white'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  {[
                    {
                      id: 'iss-1',
                      severity: 'critical',
                      title: 'Tap target size < 48px on mobile CTA',
                      node: 'button.mobile-cta-subscribe',
                      fix: 'touch-action: manipulation; min-height: 48px;',
                    },
                    {
                      id: 'iss-2',
                      severity: 'warning',
                      title: 'Hero background image missing width/height',
                      node: 'img.hero-cover-banner',
                      fix: 'aspect-ratio: 16/9; fetchpriority: high;',
                    },
                  ].map((issue) => {
                    const isFixed = autoFixedIds.includes(issue.id);
                    return (
                      <div
                        key={issue.id}
                        className="p-2.5 rounded-xl bg-surface-container/70 border border-outline-variant/30 text-[11px] space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-1.5 py-0.2 rounded font-mono text-[9px] font-bold uppercase ${
                              issue.severity === 'critical'
                                ? 'bg-error-container text-on-error-container'
                                : 'bg-secondary-container/40 text-secondary'
                            }`}
                          >
                            {issue.severity}
                          </span>
                          <span className="font-mono text-[10px] text-on-surface-variant">{issue.node}</span>
                        </div>
                        <div className="font-semibold text-on-surface">{issue.title}</div>
                        <div className="flex items-center justify-between pt-1">
                          <button
                            onClick={() =>
                              onOpenInspectNode && onOpenInspectNode(issue.node, issue.title)
                            }
                            className="text-primary hover:underline text-[10px] flex items-center gap-0.5 font-medium"
                          >
                            <span className="material-symbols-outlined text-[12px]">search</span> Inspect Node
                          </button>
                          <button
                            onClick={() => {
                              if (isFixed) {
                                setAutoFixedIds(autoFixedIds.filter((id) => id !== issue.id));
                              } else {
                                setAutoFixedIds([...autoFixedIds, issue.id]);
                              }
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-semibold flex items-center gap-1 transition-colors ${
                              isFixed
                                ? 'bg-tertiary-container/40 text-tertiary border border-tertiary/40'
                                : 'bg-primary-container text-white'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[12px]">
                              {isFixed ? 'check' : 'auto_fix_high'}
                            </span>
                            <span>{isFixed ? 'Patched' : 'Auto-Fix'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI AGENT (Image 7 & 8) */}
          {activeTab === 'ai-agent' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Agent Status Hero */}
              <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">psychology</span>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-on-surface">Autonomous AI Inspector</div>
                    <div className="text-[10px] text-tertiary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span> Analyzing DOM AST &amp; Visual Render Tree
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-on-surface-variant">Claude 3.5</span>
              </div>

              {/* Code Diff Repair Card */}
              <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/40 overflow-hidden shadow-lg">
                <div className="bg-surface-container-high px-3 py-1.5 flex items-center justify-between text-[10px]">
                  <span className="font-mono text-on-surface-variant">header.nav-desktop-v2.css</span>
                  <span className="text-tertiary flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[12px]">auto_fix_high</span> Auto-Generated Patch
                  </span>
                </div>
                <div className="p-3 font-mono text-[11px] leading-5 space-y-1">
                  <div className="p-1.5 rounded bg-error-container/20 text-error flex items-start gap-1">
                    <span className="font-bold">-</span>
                    <code>overflow-x: scroll; /* Visual clip regression */</code>
                  </div>
                  <div className="p-1.5 rounded bg-tertiary-container/20 text-tertiary flex items-start gap-1">
                    <span className="font-bold">+</span>
                    <code>overflow-x: clip; contain: paint; /* Patch */</code>
                  </div>
                </div>
                <div className="p-2 bg-surface-container-low border-t border-outline-variant/20 flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('overflow-x: clip; contain: paint;');
                      setCopiedPatch(true);
                      setTimeout(() => setCopiedPatch(false), 1500);
                    }}
                    className="flex-1 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface text-[10px] font-semibold flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {copiedPatch ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedPatch ? 'Copied!' : 'Copy Patch'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setPrCreated(true);
                      setTimeout(() => setPrCreated(false), 2000);
                    }}
                    className="flex-1 py-1.5 rounded bg-primary-container text-white text-[10px] font-semibold flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {prCreated ? 'check_circle' : 'merge'}
                    </span>
                    <span>{prCreated ? 'PR #42 Created' : 'Create GitHub PR'}</span>
                  </button>
                </div>
              </div>

              {/* Interactive Chat Stream */}
              <div className="rounded-xl bg-surface-container border border-outline-variant/30 p-3 space-y-2.5">
                <div className="text-[11px] font-bold text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">forum</span>
                  <span>AI Diagnostic Feed</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg text-[11px] leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-primary-container text-white ml-6'
                          : 'bg-surface-container-high text-on-surface mr-4 border border-outline-variant/20'
                      }`}
                    >
                      <div className="text-[9px] opacity-70 mb-0.5">{m.sender === 'user' ? 'You' : 'SiteCheck AI Agent'} • {m.time}</div>
                      <div>{m.text}</div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="relative flex items-center pt-1">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask AI agent to fix or explain..."
                    className="w-full pl-3 pr-8 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface text-[12px] border border-outline-variant/30 focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 text-primary hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: REPORTS (Image 9 & 10 Mobile version) */}
          {activeTab === 'reports' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-on-surface">Historical Testing Reports</span>
                <span className="text-[10px] text-on-surface-variant font-mono">1,420 Total Runs</span>
              </div>

              <div className="space-y-2">
                {mockReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-3 rounded-xl bg-surface-container/70 border border-outline-variant/30 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-[13px] text-on-surface truncate">{report.domain}{report.subpath}</div>
                      <span className="text-tertiary font-bold text-[13px]">{report.score}/100</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-on-surface-variant">
                      <span>{report.timestamp}</span>
                      <span>{report.viewport}</span>
                      <span className="px-1.5 py-0.2 rounded bg-tertiary-container/30 text-tertiary font-semibold">
                        {report.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20 text-[10px]">
                      <span className="text-on-surface-variant">
                        LCP: <b className="text-on-surface">{report.metrics.lcp}</b> • CLS: <b className="text-on-surface">{report.metrics.cls}</b>
                      </span>
                      <button
                        onClick={() => alert(`Downloading report for ${report.domain}`)}
                        className="text-primary hover:underline font-semibold flex items-center gap-0.5"
                      >
                        <span className="material-symbols-outlined text-[12px]">download</span> PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Mobile Bottom Fixed Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-outline-variant/30">
          <div className="flex justify-around items-center h-16 px-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center min-w-[50px] transition-colors ${
                activeTab === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">home</span>
              <span className="text-[10px]">Home</span>
            </button>

            {/* Elevated Radar Audit Button */}
            <button
              onClick={() => setActiveTab('audit')}
              className="relative -top-3 flex flex-col items-center justify-center group"
            >
              <div className="w-11 h-11 rounded-full bg-primary-container flex items-center justify-center shadow-[0_0_16px_rgba(37,99,235,0.6)] group-hover:scale-105 transition-all">
                <span className="material-symbols-outlined text-[22px] text-white">radar</span>
              </div>
              <span
                className={`text-[10px] mt-0.5 font-medium ${
                  activeTab === 'audit' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                Audit
              </span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center justify-center min-w-[50px] transition-colors ${
                activeTab === 'dashboard' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">bar_chart</span>
              <span className="text-[10px]">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-agent')}
              className={`flex flex-col items-center justify-center min-w-[50px] transition-colors ${
                activeTab === 'ai-agent' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              <span className="text-[10px]">AI Agent</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`flex flex-col items-center justify-center min-w-[50px] transition-colors ${
                activeTab === 'reports' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">description</span>
              <span className="text-[10px]">Reports</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

export const PricingView: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'monthly'>('yearly');
  const [sliderPages, setSliderPages] = useState(250);
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Dynamic ROI calculation formulas matching screenshot
  const hoursSaved = (sliderPages * 0.074).toFixed(1);
  const devValue = Math.round(sliderPages * 0.074 * 85 * 4); // $85/hr loaded rate * 4 weeks

  const toggleFaq = (id: number) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-surface-container-high border border-primary text-on-surface shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-primary text-[18px]">info</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Atmospheric Gradient Canvas */}
      <div className="relative w-full overflow-hidden px-4 sm:px-8 pt-8 pb-16">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-r from-primary-container/20 via-secondary-container/20 to-tertiary-container/10 blur-[130px] pointer-events-none rounded-full"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-container/10 blur-[120px] pointer-events-none rounded-full"></div>

        {/* Header Section */}
        <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary border border-surface-container-highest mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-sm text-xs tracking-wider uppercase font-semibold text-primary">
              Transparent, Performance-Driven Pricing
            </span>
          </div>

          <h1 className="font-headline-xl text-3xl sm:text-5xl text-on-surface tracking-tight max-w-3xl font-extrabold leading-tight">
            Predictable Pricing for{' '}
            <span className="bg-gradient-to-r from-primary via-primary-fixed-dim to-secondary bg-clip-text text-transparent">
              Autonomous Quality
            </span>{' '}
            Engineering
          </h1>

          <p className="mt-4 text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            From individual developers to enterprise engineering organizations auditing millions of URLs per week. Zero hidden telemetry fees.
          </p>

          {/* Billing Toggle Switch */}
          <div className="mt-8 flex items-center justify-center gap-2 bg-surface-container-low/90 backdrop-blur-md p-1.5 rounded-xl border border-surface-container-high/60 shadow-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary-container text-on-primary-container shadow-md'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`relative flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-primary-container text-on-primary-container shadow-md'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-tertiary text-on-tertiary text-[10px] font-bold tracking-tight shadow-sm">
                Save 20% + 2 Mo Free
              </span>
            </button>
          </div>

          {/* Trust Badges Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-outline text-xs">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>
              <span>SOC2 Type II Certified Runners</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">bolt</span>
              <span>Edge Sub-30ms Crawl Engines</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">sync</span>
              <span>Instant GitHub & Jira Auto-PRs</span>
            </div>
          </div>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="relative max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* TIER 1: Developer & Indie */}
          <div className="flex flex-col justify-between bg-surface-container/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-surface-container-high/60 transition-all hover:bg-surface-container">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-lg text-on-surface font-bold">Developer & Indie</span>
                <span className="p-2 rounded-xl bg-surface-container-high text-primary border border-surface-container-highest">
                  <span className="material-symbols-outlined text-[20px]">terminal</span>
                </span>
              </div>
              <p className="mt-2 text-xs text-on-surface-variant min-h-[36px] leading-relaxed">
                For solo software engineers, consultants, and independent web projects needing instant regression safety.
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-headline-xl text-4xl font-extrabold text-on-surface">
                  {billingCycle === 'yearly' ? '$24' : '$29'}
                </span>
                <span className="text-xs text-outline font-medium">/ month</span>
              </div>
              <p className="text-[11px] text-outline font-mono mt-1">
                {billingCycle === 'yearly' ? 'Billed annually ($288/yr)' : 'Billed month-to-month'}
              </p>

              <div className="mt-6 pt-6 bg-surface-container-lowest/50 rounded-xl p-4 flex flex-col gap-3 border border-surface-container-high/40">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface font-medium">100 on-demand audits / mo</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface font-medium">5 automated crawl schedules</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">Broken link & CTA click health</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">Basic AI fix explanations</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">Standard PDF QA reports</span>
                </div>
                <div className="flex items-center gap-3 text-outline">
                  <span className="material-symbols-outlined text-[18px] text-outline">cancel</span>
                  <span className="text-xs text-outline">Autonomous agent checkout fuzzing</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => showToast('Activated Developer Trial! 14 days unrestricted.')}
                className="w-full py-3 px-4 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-bright text-xs font-bold transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 border border-surface-container-highest cursor-pointer"
              >
                <span>Start Free 14-Day Trial</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <span className="block text-center text-[11px] text-outline mt-2">
                No credit card required • Cancel anytime
              </span>
            </div>
          </div>

          {/* TIER 2: Pro Team & Scale (Highlighted) */}
          <div className="relative flex flex-col justify-between bg-gradient-to-b from-surface-container-high/90 via-surface-container/90 to-surface-container-low/95 backdrop-blur-2xl rounded-2xl p-8 shadow-[0_0_40px_rgba(37,99,235,0.25)] border-2 border-primary-container lg:-translate-y-4">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary-container via-secondary-container to-primary-container text-on-primary-container text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span>Most Popular for Scale</span>
            </div>

            <div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-headline-sm text-lg text-on-surface font-bold">Pro Team & Scale</span>
                <span className="p-2 rounded-xl bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(37,99,235,0.5)]">
                  <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                </span>
              </div>
              <p className="mt-2 text-xs text-on-surface-variant min-h-[36px] leading-relaxed">
                For growing SaaS applications, high-velocity digital engineering squads, and modern web agencies.
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-headline-xl text-4xl font-extrabold text-primary">
                  {billingCycle === 'yearly' ? '$72' : '$89'}
                </span>
                <span className="text-xs text-outline font-medium">/ month</span>
              </div>
              <p className="text-[11px] text-tertiary-fixed-dim font-mono mt-1 font-semibold">
                {billingCycle === 'yearly' ? 'Billed annually ($864/yr) — 2 Months Free' : 'Billed month-to-month'}
              </p>

              <div className="mt-6 pt-6 bg-surface-container-lowest/70 rounded-xl p-4 flex flex-col gap-3 shadow-inner border border-surface-container-high/40">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface font-bold">Unlimited on-demand audits</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">50 monitored production domains</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface font-semibold text-primary">
                    Autonomous Agent Fuzzing (Forms & Cart)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">Multi-viewport mobile & tablet rendering</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">Instant GitHub PRs & Jira bi-directional sync</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">Core Web Vitals real-time regressions</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">White-label export reports with client brand</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => showToast('Activated Pro Team Trial! Connect your repo anytime.')}
                className="w-full py-3.5 px-4 rounded-xl bg-primary-container text-on-primary-container hover:bg-inverse-primary text-xs font-bold transition-all active:scale-[0.98] shadow-[0_0_24px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Get Started with Pro</span>
              </button>
              <span className="block text-center text-[11px] text-on-surface-variant mt-2 font-medium">
                Immediate setup • 14 days full feature access
              </span>
            </div>
          </div>

          {/* TIER 3: Enterprise AI Guard */}
          <div className="flex flex-col justify-between bg-surface-container/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-surface-container-high/60 transition-all hover:bg-surface-container">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-lg text-on-surface font-bold">Enterprise AI Guard</span>
                <span className="p-2 rounded-xl bg-surface-container-high text-secondary border border-surface-container-highest">
                  <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
                </span>
              </div>
              <p className="mt-2 text-xs text-on-surface-variant min-h-[36px] leading-relaxed">
                For mission-critical web platforms, banking, and global e-commerce requiring isolation & bespoke pipelines.
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-headline-xl text-4xl font-extrabold text-on-surface">
                  {billingCycle === 'yearly' ? '$319' : '$399'}
                </span>
                <span className="text-xs text-outline font-medium">/ mo or Custom</span>
              </div>
              <p className="text-[11px] text-outline font-mono mt-1">Custom procurement & invoicing available</p>

              <div className="mt-6 pt-6 bg-surface-container-lowest/50 rounded-xl p-4 flex flex-col gap-3 border border-surface-container-high/40">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface font-semibold">Unlimited monitored domains</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">Private isolated Chromium runner nodes</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">SAML / SSO (Okta, Azure AD, Ping)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">Custom Playwright & Cypress synthetic injection</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">Dedicated residential IP pool</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface font-semibold text-secondary">
                    99.99% Uptime SLA Guarantee
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                  <span className="text-xs text-on-surface">Dedicated Solutions Architect & Slack channel</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => showToast('Enterprise inquiry dispatched to enterprise@sitecheck.ai')}
                className="w-full py-3 px-4 rounded-xl bg-surface-container-high text-on-surface hover:bg-secondary-container hover:text-on-secondary-container text-xs font-bold transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 border border-surface-container-highest cursor-pointer"
              >
                <span>Contact Enterprise Sales</span>
                <span className="material-symbols-outlined text-[16px]">headset_mic</span>
              </button>
              <span className="block text-center text-[11px] text-outline mt-2">
                Custom DPA & security review support
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive ROI & Dev Time Saved Section */}
      <div className="w-full px-4 sm:px-8 py-12 bg-surface-container-low/50 border-y border-surface-container-high/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Calculator Left Column */}
          <div className="lg:col-span-7 flex flex-col bg-surface-container/90 rounded-2xl p-6 sm:p-8 shadow-xl border border-surface-container-high/50">
            <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[20px]">calculate</span>
              <span>Return On Investment Simulator</span>
            </div>
            <h2 className="font-headline-md text-xl sm:text-2xl text-on-surface font-bold">
              How much engineering time does SiteCheck AI reclaim?
            </h2>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
              Drag to match your team’s scale and discover the hours diverted from repetitive manual browser testing back into product shipping.
            </p>

            {/* Slider input container */}
            <div className="mt-8 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-on-surface">Production URLs / Pages Monitored:</span>
                <span className="text-primary font-bold font-mono text-base">{sliderPages >= 2500 ? '2,500+ Pages' : `${sliderPages} Pages`}</span>
              </div>
              <input
                className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary-container"
                max="2500"
                min="20"
                step="10"
                type="range"
                value={sliderPages}
                onChange={(e) => setSliderPages(Number(e.target.value))}
              />
              <div className="flex justify-between text-[11px] text-outline font-mono">
                <span>20 URLs</span>
                <span>500 URLs</span>
                <span>1,000 URLs</span>
                <span>2,500+ URLs</span>
              </div>
            </div>

            {/* Computed Metric Results */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-lowest/70 flex flex-col shadow-inner border border-surface-container-high/30">
                <span className="text-xs text-outline uppercase font-semibold">Manual QA Saved</span>
                <span className="text-2xl font-extrabold text-tertiary mt-1 font-mono">{hoursSaved} hrs</span>
                <span className="text-[11px] text-on-surface-variant mt-0.5">every single week</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-lowest/70 flex flex-col shadow-inner border border-surface-container-high/30">
                <span className="text-xs text-outline uppercase font-semibold">Dev Team Value</span>
                <span className="text-2xl font-extrabold text-primary mt-1 font-mono">
                  ${devValue.toLocaleString()}
                </span>
                <span className="text-[11px] text-on-surface-variant mt-0.5">monthly dev cost parity</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-lowest/70 flex flex-col shadow-inner border border-surface-container-high/30">
                <span className="text-xs text-outline uppercase font-semibold">Defect Escape Rate</span>
                <span className="text-2xl font-extrabold text-on-surface mt-1 font-mono">-88%</span>
                <span className="text-[11px] text-on-surface-variant mt-0.5">caught pre-deployment</span>
              </div>
            </div>
          </div>

          {/* Social Proof & Customer Voices Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 rounded-2xl bg-surface-container/70 shadow-lg flex flex-col justify-between border border-surface-container-high/40">
              <p className="text-xs sm:text-sm text-on-surface-variant italic leading-relaxed">
                "SiteCheck AI caught a broken checkout state on Mobile Safari during our black Friday rush before a single customer reported it. The automated GitHub PR had the exact CSS patch ready."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Elena Rostova"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVewVysQro499VHw4RElE7Xy-tI0gfVoDkOU222j5ufrv4xj4ius-nt7kgSwwjuPR7DDN89pWfkC-nSKKvga9RTjsAtpo90c4366vhCmHxE_xNqZPtnoI6pj64mWFfgYrGRx6FWUOwP3ZilTgpmwDdvvIawsAs0c5ipephzkT19x4CoE3nIJjxQqPxDCcnbUSd9lmSSIVnIX5BV_JAhpvJuve0ZBxcfBumo2DVqSnraNqBBZe-iUyO"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Elena Rostova</span>
                  <span className="text-[11px] text-outline">VP of Engineering at FinEdge Global</span>
                </div>
                <div className="ml-auto text-primary font-mono text-xs font-bold">FINTECH</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container/70 shadow-lg flex flex-col justify-between border border-surface-container-high/40">
              <p className="text-xs sm:text-sm text-on-surface-variant italic leading-relaxed">
                "Our agency manages 70+ Shopify Plus storefronts. Moving from manual staging audits to SiteCheck AI Pro cut our release cycle verification down from 4 hours to 90 seconds."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Marcus Tremblay"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMXfaV2r5KBgat3u4L6IqfYtxerDo8Iw3GNBRK5MBLB9MB7tqp6wO7_WVUFwH12eKleny2Zej5FonBTZBE0R8Ewk3FxhUNvLPdd2rwzoJR4H-dWBb-lWHSG2FnHaCIlPLtXfm4NkvBmXbaYe2MSFNWY8AFXL2kOe8p1PwQf1cnBpK8iZMS4eE1WIPfU3mAJYF8YmYoTwt_KIRN2hck0wJv7Ij8ZcRn-kuBrtQCWFk_8hmkQaMkvzfC"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Marcus Tremblay</span>
                  <span className="text-[11px] text-outline">Head of Quality at Hyperion Agency</span>
                </div>
                <div className="ml-auto text-secondary font-mono text-xs font-bold">DEVTOOLS</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-high/60 flex items-center justify-around text-center border border-surface-container-highest">
              <div>
                <span className="text-lg font-extrabold text-on-surface">4.2M+</span>
                <span className="block text-[11px] text-outline">URLs audited daily</span>
              </div>
              <div className="w-px h-8 bg-surface-variant"></div>
              <div>
                <span className="text-lg font-extrabold text-tertiary">99.98%</span>
                <span className="block text-[11px] text-outline">Precision rating</span>
              </div>
              <div className="w-px h-8 bg-surface-variant"></div>
              <div>
                <span className="text-lg font-extrabold text-primary">12 min</span>
                <span className="block text-[11px] text-outline">Avg fix deploy time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Feature Breakdown Matrix */}
      <div className="w-full px-4 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">
              Comprehensive Feature Breakdown
            </h2>
            <p className="text-sm text-on-surface-variant mt-2">
              Compare full platform specifications across every test layer, security clearance, and reporting pipeline.
            </p>
          </div>

          <div className="w-full bg-surface-container/70 rounded-2xl shadow-2xl border border-surface-container-high/60 overflow-x-auto">
            <table className="w-full text-left min-w-[768px] text-xs">
              <thead>
                <tr className="bg-surface-container-high/90 backdrop-blur-sm text-on-surface border-b border-surface-container-highest">
                  <th className="p-5 font-semibold w-2/5 text-sm">Capabilities & Infrastructure</th>
                  <th className="p-5 font-semibold w-1/5 text-center text-sm">Developer & Indie</th>
                  <th className="p-5 font-bold w-1/5 text-center text-sm text-primary bg-primary-container/10">
                    Pro Team & Scale
                  </th>
                  <th className="p-5 font-semibold w-1/5 text-center text-sm">Enterprise AI Guard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/30">
                {/* CATEGORY 1 */}
                <tr className="bg-surface-container-low text-primary uppercase tracking-wider font-bold">
                  <td className="px-5 py-3" colSpan={4}>1. Crawl & Testing Capacity</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Monthly On-Demand Audits</td>
                  <td className="px-5 py-3.5 text-center">100 / mo</td>
                  <td className="px-5 py-3.5 text-center font-bold text-primary bg-primary-container/5">Unlimited</td>
                  <td className="px-5 py-3.5 text-center font-bold text-on-surface">Custom Volume (Millions)</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Scheduled Production Domains</td>
                  <td className="px-5 py-3.5 text-center">5 domains</td>
                  <td className="px-5 py-3.5 text-center font-bold text-on-surface bg-primary-container/5">50 domains</td>
                  <td className="px-5 py-3.5 text-center font-bold text-secondary">Unlimited domains</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Concurrent Headless Runners</td>
                  <td className="px-5 py-3.5 text-center">2 runners</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-on-surface bg-primary-container/5">16 runners</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-secondary">Dedicated cluster (64+)</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Edge Geographic Probe Regions</td>
                  <td className="px-5 py-3.5 text-center">US-East (1 node)</td>
                  <td className="px-5 py-3.5 text-center text-on-surface bg-primary-container/5">12 Global Edge Nodes</td>
                  <td className="px-5 py-3.5 text-center text-on-surface">36 Global Nodes + Custom IP</td>
                </tr>

                {/* CATEGORY 2 */}
                <tr className="bg-surface-container-low text-primary uppercase tracking-wider font-bold">
                  <td className="px-5 py-3" colSpan={4}>2. AI Agent Capabilities & Autonomy</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Autonomous Checkout & Form Fuzzing</td>
                  <td className="px-5 py-3.5 text-center text-outline"><span className="material-symbols-outlined text-[18px]">remove</span></td>
                  <td className="px-5 py-3.5 text-center bg-primary-container/5"><span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span></td>
                  <td className="px-5 py-3.5 text-center"><span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span></td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Contextual Root-Cause Code Explanation</td>
                  <td className="px-5 py-3.5 text-center">Basic overview</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-on-surface bg-primary-container/5">Deep AST & DOM stacktrace</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-secondary">Custom trained LLM weights</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Automated GitHub Pull Request Generator</td>
                  <td className="px-5 py-3.5 text-center text-outline"><span className="material-symbols-outlined text-[18px]">remove</span></td>
                  <td className="px-5 py-3.5 text-center bg-primary-container/5"><span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span></td>
                  <td className="px-5 py-3.5 text-center"><span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span></td>
                </tr>

                {/* CATEGORY 3 */}
                <tr className="bg-surface-container-low text-primary uppercase tracking-wider font-bold">
                  <td className="px-5 py-3" colSpan={4}>3. Bug Detection & Diagnostics</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Visual Regression Diff (Pixel & Structural)</td>
                  <td className="px-5 py-3.5 text-center">Standard Diff</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-on-surface bg-primary-container/5">Sub-pixel + Semantic Shifts</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-on-surface">Sub-pixel + Semantic Shifts</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Core Web Vitals Metric Diagnostics</td>
                  <td className="px-5 py-3.5 text-center">LCP & CLS only</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-on-surface bg-primary-container/5">Full INP, TTFB, LCP, CLS</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-on-surface">Full Real-User Telemetry + Edge</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">WCAG 2.2 AA & AAA Accessibility Radar</td>
                  <td className="px-5 py-3.5 text-center">Basic tags</td>
                  <td className="px-5 py-3.5 text-center bg-primary-container/5"><span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span></td>
                  <td className="px-5 py-3.5 text-center"><span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span></td>
                </tr>

                {/* CATEGORY 4 */}
                <tr className="bg-surface-container-low text-primary uppercase tracking-wider font-bold">
                  <td className="px-5 py-3" colSpan={4}>4. Integrations & Workflows</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">CI/CD Gatekeeper (GitHub Actions, GitLab, CircleCI)</td>
                  <td className="px-5 py-3.5 text-center text-outline"><span className="material-symbols-outlined text-[18px]">remove</span></td>
                  <td className="px-5 py-3.5 text-center bg-primary-container/5"><span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span></td>
                  <td className="px-5 py-3.5 text-center"><span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span></td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Issue Trackers (Jira, Linear, Asana)</td>
                  <td className="px-5 py-3.5 text-center text-outline"><span className="material-symbols-outlined text-[18px]">remove</span></td>
                  <td className="px-5 py-3.5 text-center font-semibold text-on-surface bg-primary-container/5">Linear & Jira 2-way</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-on-surface">Custom Webhooks + Enterprise Jira</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Export Formats</td>
                  <td className="px-5 py-3.5 text-center">Standard PDF</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-on-surface bg-primary-container/5">White-Label PDF & JSON API</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-on-surface">Snowflake, S3, BigQuery Streaming</td>
                </tr>

                {/* CATEGORY 5 */}
                <tr className="bg-surface-container-low text-primary uppercase tracking-wider font-bold">
                  <td className="px-5 py-3" colSpan={4}>5. Security, Compliance & SLAs</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Single Sign-On (SAML / Okta / Azure AD)</td>
                  <td className="px-5 py-3.5 text-center text-outline"><span className="material-symbols-outlined text-[18px]">remove</span></td>
                  <td className="px-5 py-3.5 text-center text-outline bg-primary-container/5"><span className="material-symbols-outlined text-[18px]">remove</span></td>
                  <td className="px-5 py-3.5 text-center"><span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span></td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">SOC2 Type II Report & Custom DPA</td>
                  <td className="px-5 py-3.5 text-center text-outline">Standard Terms</td>
                  <td className="px-5 py-3.5 text-center bg-primary-container/5">SOC2 Type II Report</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-secondary">SOC2 + Custom BAA / DPA</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 text-on-surface font-medium">Uptime Service Level Agreement</td>
                  <td className="px-5 py-3.5 text-center">99.5%</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-on-surface bg-primary-container/5">99.9%</td>
                  <td className="px-5 py-3.5 text-center font-bold text-tertiary">99.99% Financially Backed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="w-full px-4 sm:px-8 py-16 bg-surface-container-low/40 border-t border-surface-container-high/40">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="text-center mb-10">
            <span className="text-xs text-primary uppercase font-bold tracking-widest">Everything You Need To Know</span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold tracking-tight mt-1">
              Frequently Answered Questions
            </h2>
          </div>

          <div className="w-full flex flex-col gap-3">
            {[
              {
                id: 1,
                q: 'How does the automated GitHub Pull Request generator work?',
                a: 'When our autonomous test runners detect a regression (such as a broken responsive layout break, missing accessibility ARIA tags, or broken routing state), SiteCheck AI’s static analysis engine generates an isolated branch. It applies the surgical CSS or JSX correction, runs validation against our staging runners, and opens a clean GitHub Pull Request containing before/after diffs and visual regression proof.'
              },
              {
                id: 2,
                q: 'Can SiteCheck AI audit staging environments behind firewalls or VPNs?',
                a: 'Yes. Pro and Enterprise plans support authenticated crawling via Basic Auth, custom HTTP headers, Cookie injection, and our lightweight Docker-based runner proxy that can run directly inside your private VPC or Kubernetes cluster.'
              },
              {
                id: 3,
                q: 'What happens if we exceed our monthly audit limits?',
                a: 'We never abruptly halt scheduled monitoring for your live apps. On the Developer plan, once you reach 100 audits, you can either upgrade instantly to Pro with one click or purchase an on-demand burst pack ($10 for 50 audits). Pro Team and Enterprise plans enjoy fully unlimited audits with no overage penalties.'
              },
              {
                id: 4,
                q: 'Do you support custom Playwright or Cypress synthetic test suites?',
                a: 'Yes. On the Enterprise tier, engineering teams can upload existing Playwright .spec.ts files or Cypress test bundles. SiteCheck AI executes them in sandboxed micro-containers across 30+ edge geolocations with full telemetry recording, video capture, and HAR logs.'
              }
            ].map((faq) => (
              <div
                key={faq.id}
                className="bg-surface-container/80 rounded-xl overflow-hidden shadow-md border border-surface-container-high/50"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-surface-container-high/50 transition-colors"
                >
                  <span className="text-sm font-semibold text-on-surface">{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-outline transition-transform duration-200 ${
                      openFaq === faq.id ? 'rotate-180 text-primary' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-5 pt-1 text-on-surface-variant text-xs sm:text-sm leading-relaxed border-t border-surface-container-high/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Final Conversion Banner */}
      <div className="relative w-full px-4 sm:px-8 py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-primary-container via-surface-container-high to-secondary-container p-1 shadow-2xl">
          <div className="w-full bg-surface-container-lowest/90 backdrop-blur-xl rounded-[22px] px-8 py-14 text-center flex flex-col items-center">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
              Autonomous QA Infrastructure
            </span>
            <h2 className="font-headline-xl text-2xl sm:text-4xl text-on-surface font-extrabold max-w-2xl leading-tight">
              Ready to eliminate manual regression passes forever?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mt-4">
              Start your 14-day free trial on the Pro Team plan. No credit card required. Connect your repo in under 2 minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => showToast('Redirecting to 1-click GitHub repo setup...')}
                className="px-8 py-4 rounded-xl bg-primary-container text-on-primary-container text-sm font-bold shadow-[0_0_24px_rgba(37,99,235,0.4)] hover:bg-inverse-primary transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                <span>Deploy First Autonomous Audit Now</span>
              </button>
              <button
                onClick={() => showToast('Technical architecture demo booked with Solutions team.')}
                className="px-6 py-4 rounded-xl bg-surface-container text-on-surface text-sm font-semibold hover:bg-surface-bright transition-all border border-surface-container-high"
              >
                Schedule Technical Architecture Demo
              </button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-outline text-xs">
              <span>✓ 14-Day Free Trial</span>
              <span>✓ Instant CI/CD Setup</span>
              <span>✓ Zero Vendor Lock-in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

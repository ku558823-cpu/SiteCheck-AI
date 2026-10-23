import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('lead.auditor@enterprise.io');
  const [password, setPassword] = useState('SiteCheck#Enterprise2025');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [autofillSuccess, setAutofillSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAutofill = () => {
    setEmail('demo.operator@sitecheck.ai');
    setPassword('SiteCheck-Autonomous2025!');
    setAutofillSuccess(true);
    setTimeout(() => {
      setAutofillSuccess(false);
    }, 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      if (onLoginSuccess) {
        onLoginSuccess(email);
      }
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl rounded-2xl bg-surface-container/90 border border-outline-variant/30 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
          aria-label="Close authentication modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Ambient Radial Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* LEFT PANEL: Technical Aesthetic & Live Preview */}
        <div className="relative lg:w-5/12 p-8 lg:p-10 flex flex-col justify-between overflow-hidden bg-surface-container-low/85 border-b lg:border-b-0 lg:border-r border-outline-variant/20">
          {/* Faint Ambient SVG Grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern height="36" id="auth-audit-grid" patternUnits="userSpaceOnUse" width="36">
                  <path className="text-primary" d="M 36 0 L 0 0 0 36" fill="none" stroke="currentColor" strokeWidth="0.75" />
                </pattern>
              </defs>
              <rect fill="url(#auth-audit-grid)" height="100%" width="100%" />
            </svg>
          </div>

          {/* Top Header Context & Edge Node Telemetry */}
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high/90 border border-outline-variant/20">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_rgba(78,222,163,0.8)]"></span>
                <span className="text-[11px] font-semibold text-tertiary uppercase tracking-wider font-mono">Cluster us-east-4 • Active</span>
              </div>
              <span className="text-[11px] text-on-surface-variant font-mono">v3.4.12-rc</span>
            </div>
            <div>
              <span className="text-[11px] text-primary uppercase tracking-widest font-semibold block mb-1">Autonomous QA Infrastructure</span>
              <h2 className="text-xl sm:text-2xl font-bold font-headline-lg text-on-surface tracking-tight">Zero-drift visual &amp; semantic test pipeline.</h2>
            </div>
          </div>

          {/* Centerpiece: Floating Live AI Code Repair & Telemetry Card */}
          <div className="relative z-10 my-6">
            <div className="rounded-xl bg-surface-container-lowest/95 border border-outline-variant/30 p-4 shadow-xl">
              {/* Terminal / Studio Window Header */}
              <div className="flex items-center justify-between pb-2 mb-3 bg-surface-container-low/60 px-2.5 py-1.5 rounded-lg border border-outline-variant/20">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-error/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary/80"></span>
                  <span className="text-[11px] text-on-surface-variant ml-2 font-mono">audit_runner.worker.ts</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] text-tertiary font-medium">
                  <span className="material-symbols-outlined text-[14px]">auto_fix_high</span> AI Self-Heal Active
                </span>
              </div>

              {/* Diff / Repair Visualization */}
              <div className="font-mono text-[11px] leading-5 space-y-1 mb-3 select-none">
                <div className="text-on-surface-variant/70 flex items-center justify-between text-[10px] pb-1">
                  <span>// Target DOM: header.nav-desktop-v2</span>
                  <span className="text-primary font-sans">Headless Chrome 124</span>
                </div>
                <div className="p-2 rounded bg-error-container/20 border border-error/20 text-error flex items-start gap-2">
                  <span className="font-bold">-</span>
                  <code className="text-[11px]">overflow-x: scroll; /* Visual clip regression detected */</code>
                </div>
                <div className="p-2 rounded bg-tertiary-container/20 border border-tertiary/20 text-tertiary flex items-start gap-2">
                  <span className="font-bold">+</span>
                  <code className="text-[11px]">overflow-x: clip; contain: paint; /* Automated patch applied */</code>
                </div>
              </div>

              {/* Micro Metric Ribbons */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-outline-variant/20">
                <div className="p-2 rounded-lg bg-surface-container-high/60 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-medium">LCP Score</span>
                  <span className="text-[16px] font-bold text-tertiary mt-0.5">0.84s</span>
                  <span className="text-[10px] text-tertiary">▲ 38% faster</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-high/60 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-medium">DOM Shift</span>
                  <span className="text-[16px] font-bold text-on-surface mt-0.5">0.000</span>
                  <span className="text-[10px] text-on-surface-variant">Zero drift</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-high/60 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-medium">Healed Nodes</span>
                  <span className="text-[16px] font-bold text-primary mt-0.5">14/14</span>
                  <span className="text-[10px] text-primary">100% pass</span>
                </div>
              </div>
            </div>

            {/* Floating Live Telemetry Badge */}
            <div className="absolute -bottom-3 right-3 bg-surface-container-high/95 border border-outline-variant/30 px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              <span className="text-[11px] text-on-surface font-mono">edge_worker_fra1: 18ms latency</span>
            </div>
          </div>

          {/* Bottom Trust Summary */}
          <div className="relative z-10 pt-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-container/20 border border-primary/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-on-surface truncate">Trusted by 1,400+ Enterprise Engineering Teams</p>
              <p className="text-[11px] text-on-surface-variant">Running 8.4M automated synthetic runs weekly</p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Main Auth Form */}
        <div className="relative lg:w-7/12 p-8 lg:p-10 flex flex-col justify-between bg-surface-container-highest/20">
          <div>
            {/* Top Brand Header & Quick Autofill Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shadow-lg shadow-primary-container/30">
                  <span className="material-symbols-outlined text-white text-[22px]">troubleshoot</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold font-headline-sm text-on-surface tracking-tight">SiteCheck AI</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold tracking-wider uppercase border border-primary/30">QA Studio</span>
                  </div>
                  <p className="text-[12px] text-on-surface-variant">Sign in to orchestrate visual regressions and audit suites</p>
                </div>
              </div>

              {/* Autofill Demo Access Button */}
              <button
                onClick={handleAutofill}
                type="button"
                className={`group self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all duration-200 ${
                  autofillSuccess
                    ? 'bg-tertiary-container/40 border-tertiary text-tertiary'
                    : 'bg-surface-container-high border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-bright'
                }`}
              >
                <span className={`material-symbols-outlined text-[15px] ${autofillSuccess ? 'text-tertiary' : 'text-primary group-hover:rotate-45'} transition-transform duration-300`}>
                  {autofillSuccess ? 'check_circle' : 'bolt'}
                </span>
                <span>{autofillSuccess ? 'Demo Credentials Loaded' : 'Autofill Demo'}</span>
              </button>
            </div>

            {/* Mode Toggle Tabs (Sign In vs Create Account) */}
            <div className="p-1 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center mb-5">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-2 text-center rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                  mode === 'signin'
                    ? 'bg-primary-container text-white shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 text-center rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                  mode === 'signup'
                    ? 'bg-primary-container text-white shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Create Free Account
              </button>
            </div>

            {/* Quick 1-Click Social Sign-In Providers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
              {/* GitHub SSO */}
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-surface-container hover:bg-surface-bright border border-outline-variant/30 text-on-surface text-[12px] font-medium transition-all duration-200 group"
              >
                <svg className="w-4 h-4 text-on-surface group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd" />
                </svg>
                <span>GitHub</span>
              </button>

              {/* Google SSO */}
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-surface-container hover:bg-surface-bright border border-outline-variant/30 text-on-surface text-[12px] font-medium transition-all duration-200 group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" fill="#EA4335" />
                  <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" fill="#4285F4" />
                  <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8 0-1.3.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12c0 1.2.7 3.3 1.9 5.7l3.7-2.9z" fill="#FBBC05" />
                  <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" fill="#34A853" />
                </svg>
                <span>Google</span>
              </button>

              {/* SAML / Okta SSO */}
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-surface-container hover:bg-surface-bright border border-outline-variant/30 text-on-surface text-[12px] font-medium transition-all duration-200"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">key</span>
                <span>SSO / SAML</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-5">
              <div className="w-full h-px bg-surface-container-high border-t border-outline-variant/20"></div>
              <span className="absolute bg-surface-container-low px-3 text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                or continue with work email
              </span>
            </div>

            {/* Credentials Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-[12px] font-semibold text-on-surface mb-1.5" htmlFor="auth-modal-email">
                  Work Email
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center pointer-events-none text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </div>
                  <input
                    id="auth-modal-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-container text-on-surface text-[14px] border border-outline-variant/30 placeholder:text-outline-variant focus:outline-none focus:border-primary focus:bg-surface-container-high transition-colors"
                  />
                  {email.includes('@') && email.includes('.') && (
                    <div className="absolute right-3.5 flex items-center text-tertiary">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[12px] font-semibold text-on-surface" htmlFor="auth-modal-password">
                    Password
                  </label>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center pointer-events-none text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  </div>
                  <input
                    id="auth-modal-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your security token or password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-container text-on-surface text-[14px] font-mono border border-outline-variant/30 placeholder:text-outline-variant focus:outline-none focus:border-primary focus:bg-surface-container-high transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 flex items-center text-on-surface-variant hover:text-on-surface focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                {/* Password Strength Bar Indicator */}
                <div className="mt-2 space-y-1">
                  <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden flex gap-1">
                    <div className="h-full w-1/4 bg-tertiary rounded-full"></div>
                    <div className="h-full w-1/4 bg-tertiary rounded-full"></div>
                    <div className="h-full w-1/4 bg-tertiary rounded-full"></div>
                    <div className="h-full w-1/4 bg-tertiary rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-on-surface-variant font-mono">Entropy: High (128-bit)</span>
                    <span className="text-tertiary font-medium">Enterprise Compliant</span>
                  </div>
                </div>
              </div>

              {/* Session Controls */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="w-4 h-4 rounded bg-surface-container text-primary-container accent-primary-container focus:ring-0 cursor-pointer"
                  />
                  <span className="text-[12px] text-on-surface-variant">Remember this verified device (30 days)</span>
                </label>
              </div>

              {/* Primary Launch CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-xl bg-primary-container hover:bg-blue-600 text-white font-semibold text-[15px] tracking-wide shadow-lg shadow-primary-container/25 hover:shadow-primary-container/40 flex items-center justify-center gap-2 transition-all duration-200 mt-2 group disabled:opacity-75"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Authenticating Workspace...</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'signin' ? 'Launch SiteCheck Studio' : 'Create Team Studio Account'}</span>
                    <span className="material-symbols-outlined text-[19px] transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Compliance & Security Assurance Strip */}
          <div className="pt-4 mt-6 border-t border-outline-variant/20 -mx-8 -mb-8 lg:-mx-10 lg:-mb-10 p-4 px-8 lg:px-10 bg-surface-container-high/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-on-surface-variant text-[11px]">
              <span className="material-symbols-outlined text-tertiary text-[15px]">security</span>
              <span>256-bit TLS Strict</span>
              <span className="text-outline-variant">•</span>
              <span>SOC-2 Type II Certified</span>
              <span className="text-outline-variant">•</span>
              <span>Zero Telemetry Retention</span>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-primary hover:underline font-medium">
              Compliance Specs →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

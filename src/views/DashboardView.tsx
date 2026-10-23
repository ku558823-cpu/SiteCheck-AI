import React, { useState } from 'react';
import { mockIssues } from '../data/mockData';
import { IssueItem } from '../types';

interface DashboardViewProps {
  onInspectDom: (issue: IssueItem) => void;
  onNavigateTab?: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onInspectDom }) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'optimizations'>('all');
  const [isReRunning, setIsReRunning] = useState(false);
  const [fixedIssues, setFixedIssues] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredIssues = mockIssues.filter(
    (issue) => filter === 'all' || issue.severity === filter
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReRun = () => {
    setIsReRunning(true);
    showToast('Re-running chromium headless audit on stripe.com...');
    setTimeout(() => {
      setIsReRunning(false);
      showToast('Audit complete: Score 94/100 verified.');
    }, 1500);
  };

  const handleAutoFix = (issueId: string) => {
    setFixedIssues((prev) => [...prev, issueId]);
    showToast('AI Auto-Fix applied! Opened PR #143 with patch.');
  };

  const handleShare = () => {
    setCopiedLink(true);
    showToast('Audit report link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadPdf = () => {
    showToast('Generating 14-page PDF Diagnostic summary...');
    setTimeout(() => {
      showToast('PDF Report downloaded (2.4 MB)');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 py-6 gap-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-surface-container-high border border-primary text-on-surface shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-primary text-[18px]">info</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Target Header Metadata Card */}
      <div className="flex flex-col gap-2 p-4 rounded-xl bg-surface-container-low shadow-sm border border-surface-container-high/40">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-xs uppercase tracking-wider text-outline">Target Host</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-highest">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            <span className="font-label-sm text-xs text-on-surface-variant">3 mins ago</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">public</span>
            <span className="font-headline-sm text-lg text-on-surface font-semibold tracking-tight">stripe.com</span>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-xs">
            <span className="material-symbols-outlined text-[16px]">phone_iphone</span>
            <span>Mobile Chrome</span>
          </div>
        </div>
      </div>

      {/* Overall Health Hero Card */}
      <div className="relative overflow-hidden flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-surface-container shadow-md gap-6 border border-surface-container-high/60">
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-primary-container/10 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-tertiary/10 blur-2xl pointer-events-none"></div>

        {/* Radial Progress Ring & Grade */}
        <div className="relative flex items-center justify-center w-44 h-44">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
            <defs>
              <linearGradient id="scoreGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#4edea3" />
                <stop offset="100%" stopColor="#b4c5ff" />
              </linearGradient>
            </defs>
            <circle
              className="text-surface-container-highest fill-none"
              cx="70"
              cy="70"
              r="58"
              stroke="currentColor"
              strokeWidth="10"
            />
            <circle
              className="fill-none transition-all duration-1000 ease-out"
              cx="70"
              cy="70"
              r="58"
              stroke="url(#scoreGrad)"
              strokeDasharray="364.4"
              strokeDashoffset={isReRunning ? '364.4' : '29.15'}
              strokeLinecap="round"
              strokeWidth="10"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-headline-xl text-4xl sm:text-5xl font-bold tracking-tight text-on-surface">92</span>
            <span className="font-label-sm text-xs text-outline">OUT OF 100</span>
          </div>
        </div>

        {/* Health Badge & Status */}
        <div className="flex flex-col items-center gap-2 text-center w-full">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-tertiary-container text-on-tertiary font-label-md text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Grade A • Production Ready</span>
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant flex items-center justify-center gap-1.5 flex-wrap">
            <span className="text-tertiary font-semibold">42 Passed</span>
            <span className="text-outline">•</span>
            <span className="text-error font-semibold">1 Critical</span>
            <span className="text-outline">•</span>
            <span className="text-secondary font-semibold">1 Warning</span>
          </p>
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-3 gap-2 w-full pt-1">
          <button
            onClick={handleDownloadPdf}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-primary-container text-on-primary-container shadow hover:opacity-95 transition-opacity active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px] mb-0.5">download</span>
            <span className="font-label-sm text-xs font-semibold">PDF Report</span>
          </button>
          <button
            onClick={handleReRun}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-bright transition-colors active:scale-[0.98] border border-surface-container-highest"
          >
            <span className={`material-symbols-outlined text-[20px] mb-0.5 ${isReRunning ? 'animate-spin' : ''}`}>
              replay
            </span>
            <span className="font-label-sm text-xs">Re-run</span>
          </button>
          <button
            onClick={handleShare}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-bright transition-colors active:scale-[0.98] border border-surface-container-highest"
          >
            <span className="material-symbols-outlined text-[20px] mb-0.5">
              {copiedLink ? 'done' : 'share'}
            </span>
            <span className="font-label-sm text-xs">{copiedLink ? 'Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Score Breakdown Grid: 4 Pillars */}
      <div className="flex flex-col gap-2.5">
        <span className="font-label-sm text-xs uppercase tracking-wider text-outline px-1 font-semibold">
          Audit Pillars
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Speed */}
          <div className="flex flex-col p-4 rounded-xl bg-surface-container shadow-sm justify-between gap-3 border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
                <span className="font-label-md text-xs text-on-surface font-semibold">Speed</span>
              </div>
              <span className="font-headline-sm text-base text-tertiary font-bold">94</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full rounded-full" style={{ width: '94%' }}></div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>LCP</span>
                <span className="text-on-surface font-medium">1.1s</span>
              </div>
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>FID</span>
                <span className="text-on-surface font-medium">12ms</span>
              </div>
            </div>
          </div>

          {/* Functions */}
          <div className="flex flex-col p-4 rounded-xl bg-surface-container shadow-sm justify-between gap-3 border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-error text-[18px]">bug_report</span>
                <span className="font-label-md text-xs text-on-surface font-semibold">Functions</span>
              </div>
              <span className="font-headline-sm text-base text-error font-bold">88</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
              <div className="bg-error h-full rounded-full" style={{ width: '88%' }}></div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>Broken</span>
                <span className="text-error font-medium">3 links</span>
              </div>
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>Form</span>
                <span className="text-on-surface font-medium">1 delay</span>
              </div>
            </div>
          </div>

          {/* A11y */}
          <div className="flex flex-col p-4 rounded-xl bg-surface-container shadow-sm justify-between gap-3 border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">accessibility_new</span>
                <span className="font-label-md text-xs text-on-surface font-semibold">A11y</span>
              </div>
              <span className="font-headline-sm text-base text-tertiary font-bold">96</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full rounded-full" style={{ width: '96%' }}></div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>WCAG</span>
                <span className="text-tertiary font-medium">2.1 AA</span>
              </div>
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>Contrast</span>
                <span className="text-on-surface font-medium">100%</span>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="flex flex-col p-4 rounded-xl bg-surface-container shadow-sm justify-between gap-3 border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary-fixed-dim text-[18px]">travel_explore</span>
                <span className="font-label-md text-xs text-on-surface font-semibold">SEO</span>
              </div>
              <span className="font-headline-sm text-base text-primary font-bold">91</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '91%' }}></div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>OG Tags</span>
                <span className="text-secondary font-medium">1 Miss</span>
              </div>
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>Robots</span>
                <span className="text-tertiary font-medium">Valid</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Issue Severity Tracker */}
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-lg text-on-surface font-semibold">Issue Tracker</span>
          <span className="text-xs text-primary font-semibold">4 Diagnostics</span>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
              filter === 'all'
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All (4)
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
              filter === 'critical'
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Critical (1)
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
              filter === 'warning'
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Warning (1)
          </button>
          <button
            onClick={() => setFilter('optimizations')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
              filter === 'optimizations'
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Optimizations (2)
          </button>
        </div>

        {/* Issues List */}
        <div className="flex flex-col gap-4">
          {filteredIssues.map((issue) => {
            const isFixed = fixedIssues.includes(issue.id);
            return (
              <div
                key={issue.id}
                className="flex flex-col p-4 sm:p-5 rounded-2xl bg-surface-container shadow-md gap-3.5 border border-surface-container-high/60 transition-all hover:border-surface-container-highest"
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
                      issue.severity === 'critical'
                        ? 'bg-error-container text-on-error-container'
                        : issue.severity === 'warning'
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container-highest text-on-surface-variant'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        issue.severity === 'critical'
                          ? 'bg-error animate-pulse'
                          : issue.severity === 'warning'
                          ? 'bg-secondary'
                          : 'bg-primary'
                      }`}
                    ></span>
                    <span>
                      {issue.severity.toUpperCase()} • {issue.category}
                    </span>
                  </div>
                  <span className="text-xs text-outline">{issue.device}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <h4 className="text-base text-on-surface font-semibold leading-tight">{issue.title}</h4>
                  <span className="text-xs text-outline font-mono truncate">{issue.path}</span>
                </div>

                {/* AI Fix Suggestion Box */}
                <div className="flex flex-col p-3 rounded-xl bg-surface-container-low gap-2 border border-surface-container-high/40">
                  <div className="flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    <span>AI Recommendation</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{issue.recommendation}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  {issue.severity === 'critical' && (
                    <button
                      onClick={() => handleAutoFix(issue.id)}
                      disabled={isFixed}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-label-md text-xs font-semibold transition-all active:scale-[0.98] ${
                        isFixed
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : 'bg-primary-container text-on-primary-container hover:opacity-95 shadow'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isFixed ? 'check' : 'smart_toy'}
                      </span>
                      <span>{isFixed ? 'Auto-Fixed via PR #143' : 'Auto-Fix with AI'}</span>
                    </button>
                  )}
                  {issue.severity === 'warning' && (
                    <button
                      onClick={() => showToast('Image optimization script queued: converting hero-dashboard.png to WebP')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-surface-container-high text-on-surface font-label-md text-xs font-semibold hover:bg-surface-bright transition-colors active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-[16px]">compress</span>
                      <span>Optimize Asset</span>
                    </button>
                  )}
                  <button
                    onClick={() => onInspectDom(issue)}
                    className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-surface-container-high text-on-surface font-label-md text-xs hover:bg-surface-bright transition-colors active:scale-[0.98] border border-surface-container-highest"
                  >
                    <span className="material-symbols-outlined text-[16px]">code</span>
                    <span>DOM Node</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Telemetry Footnote Notice */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-lowest text-outline border border-surface-container-high/30 mt-2">
        <span className="material-symbols-outlined text-[18px] text-tertiary animate-spin" style={{ animationDuration: '6s' }}>
          terminal
        </span>
        <p className="text-xs flex-1 leading-normal">
          Real-time telemetry gathered via headless chromium container (us-east-1 node).
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { mockReports } from '../data/mockData';
import { AuditReport } from '../types';

interface TestingReportsViewProps {
  onInspectReportDetails?: (report: AuditReport) => void;
}

export const TestingReportsView: React.FC<TestingReportsViewProps> = ({ onInspectReportDetails }) => {
  const [selectedReportId, setSelectedReportId] = useState<string>('rep-stripe');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isGeneratingFix, setIsGeneratingFix] = useState(false);
  const [fixSuccess, setFixSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedReport = mockReports.find((r) => r.id === selectedReportId) || mockReports[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(mockReports.map((r) => r.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGenerateFix = () => {
    setIsGeneratingFix(true);
    setFixSuccess(false);
    setTimeout(() => {
      setIsGeneratingFix(false);
      setFixSuccess(true);
      showToast('Automated AST patch generated! Opened branch fix/a11y-cta on GitHub.');
      setTimeout(() => setFixSuccess(false), 4000);
    }, 1800);
  };

  const filteredReports = mockReports.filter((r) =>
    r.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.subpath.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.commit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 gap-8 relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-surface-container-high border border-primary text-on-surface shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-primary text-[18px]">info</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Action Bar & Title Block */}
      <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-sm text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm border border-surface-container-highest">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span> Continuous Monitoring Archive
            </span>
            <span className="text-outline text-xs">• Node telemetry synched 14s ago</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
            Testing Reports & Audit Logs
          </h1>
          <p className="text-sm text-on-surface-variant">
            Complete historical archive of all automated crawler runs, regression suites, and AI agent diagnostic reports across production & preview targets.
          </p>
        </div>

        {/* Global Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => showToast('Exporting combined multi-site executive PDF summary (5.8 MB)...')}
            className="group flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high shadow-sm transition-all active:scale-95 border border-surface-container-high text-xs font-semibold"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-primary group-hover:rotate-12 transition-transform">
              picture_as_pdf
            </span>
            <span>Export Multi-Site PDF</span>
          </button>
          <button
            onClick={() => {
              if (selectedRows.length === 2) {
                showToast(`Comparing ${selectedRows[0]} vs ${selectedRows[1]}: 0 new visual regressions.`);
              } else {
                showToast('Please select exactly 2 checkboxes to compare reports.');
              }
            }}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high shadow-sm transition-all active:scale-95 border border-surface-container-high text-xs font-semibold"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">compare_arrows</span>
            <span>Compare 2 Reports</span>
            <span
              className={`px-1.5 py-0.2 rounded font-mono text-[10px] ${
                selectedRows.length === 2
                  ? 'bg-secondary-container text-secondary font-bold'
                  : 'bg-surface-container-highest text-outline'
              }`}
            >
              {selectedRows.length}/2
            </span>
          </button>
          <button
            onClick={() => showToast('Configured Slack & GitHub webhook endpoints active.')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high shadow-sm transition-all active:scale-95 border border-surface-container-high text-xs font-semibold"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">webhook</span>
            <span>Webhooks</span>
          </button>
          <button
            onClick={() => showToast('Next automated crawl scheduled for 02:00 UTC.')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-label-md text-xs font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-inverse-primary transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
            <span>Schedule Automated Audit</span>
          </button>
        </div>
      </section>

      {/* Executive Audit Summary Metrics (4 Bento Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="relative p-5 rounded-2xl bg-surface-container-low/80 backdrop-blur-md shadow-md flex flex-col justify-between border border-surface-container-high/40 overflow-hidden">
          <div className="flex items-center justify-between text-outline">
            <span className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Total Scans Executed</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">radar</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-bold text-on-surface">1,428</span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary text-xs flex items-center gap-0.5 font-semibold">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +12%
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-outline text-xs">
            <span>vs. 1,275 last month</span>
            <span className="text-on-surface-variant font-mono">99.8% uptime</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-container to-transparent opacity-80"></div>
        </div>

        {/* Metric 2 */}
        <div className="relative p-5 rounded-2xl bg-surface-container-low/80 backdrop-blur-md shadow-md flex flex-col justify-between border border-surface-container-high/40 overflow-hidden">
          <div className="flex items-center justify-between text-outline">
            <span className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Critical Vulnerabilities</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[20px]">bug_report</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-bold text-error">3 Unresolved</span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary text-xs flex items-center gap-0.5 font-semibold">
              <span className="material-symbols-outlined text-[14px]">arrow_downward</span> -5
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-outline text-xs">
            <span>Down from 8 logged</span>
            <span className="text-error font-semibold">1 Blocking Release</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-error to-transparent opacity-70"></div>
        </div>

        {/* Metric 3 */}
        <div className="relative p-5 rounded-2xl bg-surface-container-low/80 backdrop-blur-md shadow-md flex flex-col justify-between border border-surface-container-high/40 overflow-hidden">
          <div className="flex items-center justify-between text-outline">
            <span className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Avg. Platform Health</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-bold text-on-surface">
              93.4<span className="text-sm font-normal text-outline"> / 100</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">Grade A</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-outline text-xs">
            <span>Aggregated across 28 sites</span>
            <span className="text-tertiary font-mono font-semibold">+1.8 pts</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-tertiary to-transparent opacity-80"></div>
        </div>

        {/* Metric 4 */}
        <div className="relative p-5 rounded-2xl bg-surface-container-low/80 backdrop-blur-md shadow-md flex flex-col justify-between border border-surface-container-high/40 overflow-hidden">
          <div className="flex items-center justify-between text-outline">
            <span className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Autonomous Fixes</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-bold text-secondary">47 Fixes</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary text-xs font-semibold">
              PRs Merged
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-outline text-xs">
            <span>Avg time-to-patch: 18m</span>
            <span className="text-on-surface-variant font-mono">100% CI pass</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-container to-transparent opacity-80"></div>
        </div>
      </section>

      {/* Search, Filter & View Controls */}
      <section className="p-3.5 rounded-2xl bg-surface-container-low/90 backdrop-blur-md shadow-md border border-surface-container-high/40 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[280px]">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-outline">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container text-on-surface placeholder:text-outline text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-container border border-surface-container-high/50"
            placeholder="Search by URL, test ID, commit hash, or environment..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select className="px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-semibold focus:outline-none border border-surface-container-high cursor-pointer">
            <option>Last 30 Days (114 Runs)</option>
            <option>Last 7 Days (28 Runs)</option>
            <option>Last 90 Days</option>
          </select>

          <select className="px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-semibold focus:outline-none border border-surface-container-high cursor-pointer">
            <option>All Health Scores</option>
            <option>Grade A (&gt;90)</option>
            <option>Grade B (75 - 89)</option>
            <option>Grade C (&lt;75)</option>
          </select>

          <select className="px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-semibold focus:outline-none border border-surface-container-high cursor-pointer">
            <option>All Environments</option>
            <option>Production (Live)</option>
            <option>Staging</option>
            <option>CI/CD Pull Request</option>
          </select>

          {/* Toggle Table vs Grid */}
          <div className="flex items-center p-1 rounded-xl bg-surface-container border border-surface-container-high">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'table' ? 'bg-surface-container-high text-primary shadow-sm' : 'text-outline hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">table_rows</span>
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'grid' ? 'bg-surface-container-high text-primary shadow-sm' : 'text-outline hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              <span>Grid</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Layout: Table View (Left) & Inspector Preview Drawer (Right) */}
      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6 items-start">
        {/* Table & Grid Container */}
        <div className="2xl:col-span-8 flex flex-col gap-4">
          {viewMode === 'table' ? (
            <div className="w-full rounded-2xl bg-surface-container-low/90 backdrop-blur-md shadow-md border border-surface-container-high/40 overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high/60 text-outline uppercase tracking-wider font-semibold border-b border-surface-container-high">
                      <th className="py-3.5 px-4 w-10">
                        <input
                          type="checkbox"
                          checked={selectedRows.length === mockReports.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded bg-surface-container border-0 accent-primary-container cursor-pointer w-4 h-4"
                        />
                      </th>
                      <th className="py-3.5 px-4">Domain & Target</th>
                      <th className="py-3.5 px-4">Date & Execution</th>
                      <th className="py-3.5 px-4">Viewport</th>
                      <th className="py-3.5 px-4">Score & Trend</th>
                      <th className="py-3.5 px-4">Key Findings</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high/40">
                    {filteredReports.map((report) => {
                      const isSelected = selectedReportId === report.id;
                      const isChecked = selectedRows.includes(report.id);
                      return (
                        <tr
                          key={report.id}
                          onClick={() => setSelectedReportId(report.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-surface-container/60'
                              : report.status === 'Failed'
                              ? 'bg-error-container/10 hover:bg-surface-container/40'
                              : 'hover:bg-surface-container/40'
                          }`}
                        >
                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleRow(report.id)}
                              className="rounded bg-surface-container border-0 accent-primary-container cursor-pointer w-4 h-4"
                            />
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                                  report.status === 'Failed'
                                    ? 'bg-error-container/30 text-error'
                                    : 'bg-primary-container/20 text-primary'
                                }`}
                              >
                                {report.domain[0].toUpperCase()}
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-on-surface hover:underline">
                                    {report.domain}
                                    {report.subpath}
                                  </span>
                                  <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-primary font-mono text-[10px]">
                                    {report.env}
                                  </span>
                                </div>
                                <span className="font-mono text-[11px] text-outline flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[12px]">commit</span> {report.branch} @{' '}
                                  {report.commit}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-col">
                              <span className="text-on-surface font-medium">{report.timestamp}</span>
                              <span className="text-outline font-mono text-[11px] flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">timer</span> {report.duration} (
                                {report.pagesAudited} pages)
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5 text-on-surface-variant font-mono text-[11px]">
                              <span className="material-symbols-outlined text-[16px] text-outline">devices</span>
                              <span>{report.viewport}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="flex flex-col items-center">
                                <span
                                  className={`font-headline-sm text-sm font-bold ${
                                    report.score >= 90
                                      ? 'text-tertiary'
                                      : report.score >= 80
                                      ? 'text-primary'
                                      : 'text-error'
                                  }`}
                                >
                                  {report.score}
                                </span>
                                <span className="text-[9px] text-outline">/100</span>
                              </div>
                              <svg
                                className={`w-12 h-5 ${
                                  report.score >= 90
                                    ? 'text-tertiary'
                                    : report.score >= 80
                                    ? 'text-primary'
                                    : 'text-error'
                                }`}
                                fill="none"
                                viewBox="0 0 56 24"
                              >
                                <path
                                  d="M2 18L14 14L26 19L38 8L54 4"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                />
                              </svg>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-on-surface-variant font-medium">{report.keyFindings[0]}</span>
                              <span className="text-outline text-[10px]">{report.keyFindings[1]}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                                report.status === 'Failed'
                                  ? 'bg-error-container/40 text-error'
                                  : 'bg-tertiary/15 text-tertiary'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  report.status === 'Failed' ? 'bg-error' : 'bg-tertiary'
                                }`}
                              ></span>{' '}
                              {report.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => onInspectReportDetails?.(report)}
                                className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
                                title="View Full Diagnostic"
                              >
                                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                              </button>
                              <button
                                onClick={() => showToast(`Downloaded PDF report for ${report.domain}`)}
                                className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
                                title="Download PDF"
                              >
                                <span className="material-symbols-outlined text-[18px]">download</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination */}
              <div className="px-5 py-3.5 bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-3 text-outline text-xs border-t border-surface-container-high/40">
                <div className="flex items-center gap-2">
                  <span>
                    Showing <strong className="text-on-surface font-semibold">1 - 5</strong> of 1,428 total audits
                  </span>
                  <span className="text-surface-container-highest">•</span>
                  <span className="text-tertiary font-mono">Archive synched with Git provider</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-semibold">
                    Previous
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container text-xs font-bold shadow-sm">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-semibold">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-semibold">
                    3
                  </button>
                  <span className="px-1 text-outline">...</span>
                  <button className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-semibold">
                    286
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-semibold">
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  className={`p-5 rounded-2xl bg-surface-container-low shadow-md hover:bg-surface-container transition-all flex flex-col justify-between gap-4 border cursor-pointer ${
                    selectedReportId === report.id
                      ? 'border-primary-container shadow-xl'
                      : 'border-surface-container-high/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary font-bold">
                        {report.domain[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-on-surface">
                          {report.domain}
                          {report.subpath}
                        </h3>
                        <p className="font-mono text-[11px] text-outline">
                          {report.branch} @ {report.commit} • {report.timestamp}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        report.status === 'Failed'
                          ? 'bg-error-container/40 text-error'
                          : 'bg-tertiary/15 text-tertiary'
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-surface-container-lowest text-center border border-surface-container-high/30">
                    <div>
                      <div
                        className={`text-lg font-bold ${
                          report.score >= 90 ? 'text-tertiary' : report.score >= 80 ? 'text-primary' : 'text-error'
                        }`}
                      >
                        {report.score}
                      </div>
                      <div className="text-[10px] text-outline">Health Score</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-on-surface">{report.duration}</div>
                      <div className="text-[10px] text-outline">Scan Time</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-on-surface">{report.pagesAudited}</div>
                      <div className="text-[10px] text-outline">URLs Tested</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-on-surface-variant">{report.keyFindings[0]}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReportId(report.id);
                        onInspectReportDetails?.(report);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-high text-primary hover:bg-primary-container hover:text-on-primary-container text-xs font-semibold transition-all"
                    >
                      Inspect Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Audit Telemetry Banner */}
          <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4 border border-surface-container-high/40">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-tertiary animate-ping"></div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-on-surface">Edge Agent Scheduled Run: In 14 mins</span>
                <span className="text-xs text-outline">Auto-auditing 6 staging endpoints for pull requests #820-#824</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('Scheduled run frequency set to: Every 15 minutes on PR update.')}
                className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-bright text-xs font-semibold transition-colors border border-surface-container-highest"
              >
                Configure Frequency
              </button>
              <button
                onClick={() => showToast('Executing immediacy check across staging swarm...')}
                className="px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-xs font-bold transition-colors"
              >
                Run Immediacy Check
              </button>
            </div>
          </div>
        </div>

        {/* Selected Report Quick-Drawer / Inspector Preview Pane (4 cols on 2xl) */}
        <aside className="2xl:col-span-4 w-full flex flex-col gap-4 sticky top-24">
          <div className="rounded-2xl bg-surface-container-low/95 backdrop-blur-xl p-5 shadow-xl border border-surface-container-high/60 flex flex-col gap-4 overflow-hidden relative">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>

            {/* Drawer Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="text-xs uppercase tracking-wider text-outline font-semibold">Active Inspector Target</span>
                </div>
                <h2 className="font-headline-sm text-lg text-on-surface font-bold mt-1">
                  {selectedReport.domain}
                  {selectedReport.subpath}
                </h2>
                <span className="font-mono text-xs text-outline">
                  Audit ID: #REP-{selectedReport.id.toUpperCase()} • Target: US-East-1 Edge
                </span>
              </div>
            </div>

            {/* Overall Health Score Gauge */}
            <div className="p-4 rounded-xl bg-surface-container flex items-center justify-between gap-4 border border-surface-container-high/40">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-outline font-semibold">Overall QA Score</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span
                    className={`text-4xl font-extrabold ${
                      selectedReport.score >= 90
                        ? 'text-tertiary'
                        : selectedReport.score >= 80
                        ? 'text-primary'
                        : 'text-error'
                    }`}
                  >
                    {selectedReport.score}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">/ 100</span>
                </div>
                <span className="text-tertiary text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span> {selectedReport.grade}
                </span>
              </div>

              {/* Polar Gauge */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-surface-container-highest"
                    cx="50"
                    cy="50"
                    fill="none"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <circle
                    className={selectedReport.score >= 90 ? 'text-tertiary' : 'text-error'}
                    cx="50"
                    cy="50"
                    fill="none"
                    r="40"
                    stroke="currentColor"
                    strokeDasharray="251"
                    strokeDashoffset={`${251 - (251 * selectedReport.score) / 100}`}
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="material-symbols-outlined text-primary text-[20px]">speed</span>
                  <span className="text-[10px] text-outline font-mono">RADAR</span>
                </div>
              </div>
            </div>

            {/* Core Web Vitals Triple Gauge */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">bolt</span> Core Web Vitals (P75 Data)
                </span>
                <span className="text-[10px] text-tertiary font-mono">ALL PASS</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-surface-container flex flex-col items-center text-center border border-surface-container-high/40">
                  <span className="text-[10px] text-outline uppercase font-semibold">LCP</span>
                  <span className="text-sm font-bold text-tertiary mt-0.5">{selectedReport.metrics.lcp}</span>
                  <span className="text-[9px] text-outline">Target &lt; 2.5s</span>
                  <div className="w-full h-1 bg-surface-container-highest rounded-full mt-1.5 overflow-hidden">
                    <div className="w-4/5 h-full bg-tertiary rounded-full"></div>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container flex flex-col items-center text-center border border-surface-container-high/40">
                  <span className="text-[10px] text-outline uppercase font-semibold">CLS</span>
                  <span className="text-sm font-bold text-tertiary mt-0.5">{selectedReport.metrics.cls}</span>
                  <span className="text-[9px] text-outline">Target &lt; 0.1</span>
                  <div className="w-full h-1 bg-surface-container-highest rounded-full mt-1.5 overflow-hidden">
                    <div className="w-11/12 h-full bg-tertiary rounded-full"></div>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container flex flex-col items-center text-center border border-surface-container-high/40">
                  <span className="text-[10px] text-outline uppercase font-semibold">INP</span>
                  <span className="text-sm font-bold text-tertiary mt-0.5">{selectedReport.metrics.inp}</span>
                  <span className="text-[9px] text-outline">Target &lt; 200ms</span>
                  <div className="w-full h-1 bg-surface-container-highest rounded-full mt-1.5 overflow-hidden">
                    <div className="w-3/4 h-full bg-tertiary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnostic Radar Vectors */}
            <div className="p-3.5 rounded-xl bg-surface-container flex flex-col gap-2.5 border border-surface-container-high/40">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                Audited Vectors Breakdown
              </span>
              <div className="flex flex-col gap-2 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-on-surface">Visual Regression (DOM Tree Diff)</span>
                    <span className="text-tertiary font-mono font-semibold">99.4% Match</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="w-[99%] h-full bg-tertiary rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-on-surface">WCAG 2.2 AA Accessibility</span>
                    <span className="text-on-surface-variant font-mono font-semibold">{selectedReport.metrics.wcagScore}</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-primary-container rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-on-surface">Security & CSP Headers</span>
                    <span className="text-tertiary font-mono font-semibold">100% Secure</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="w-full h-full bg-tertiary rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-on-surface">Mobile Touch & Tap Target Area</span>
                    <span className="text-on-surface-variant font-mono font-semibold">88.5% (1 Warning)</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="w-[88%] h-full bg-secondary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detected Issues */}
            <div className="p-3.5 rounded-xl bg-surface-container-highest/60 flex flex-col gap-2 border border-surface-container-high/50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-error">warning</span> Critical Diagnostics
                </span>
                <span className="px-1.5 py-0.2 rounded bg-surface-container text-outline font-mono text-[10px]">2 items</span>
              </div>
              <ul className="flex flex-col gap-2 text-xs">
                <li className="flex items-start gap-2 p-2 rounded-lg bg-surface-container-low border border-surface-container-high/30">
                  <span className="material-symbols-outlined text-outline text-[16px] mt-0.5">link_off</span>
                  <div className="flex flex-col">
                    <span className="text-on-surface font-medium">Dead link on footer navigation</span>
                    <span className="text-outline font-mono text-[10px]">/docs/v3/legacy-webhook-migrator (HTTP 404)</span>
                  </div>
                </li>
                <li className="flex items-start gap-2 p-2 rounded-lg bg-surface-container-low border border-surface-container-high/30">
                  <span className="material-symbols-outlined text-outline text-[16px] mt-0.5">touch_app</span>
                  <div className="flex flex-col">
                    <span className="text-on-surface font-medium">Payment modal CTA tap target small</span>
                    <span className="text-outline font-mono text-[10px]">#submit-button is 34×32px (min 48×48px req)</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* One-Click AI Fix Automation Action */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleGenerateFix}
                disabled={isGeneratingFix}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-container via-secondary-container to-primary-container text-on-primary-container text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:brightness-110 active:scale-98 transition-all cursor-pointer"
                type="button"
              >
                <span className={`material-symbols-outlined text-[18px] ${isGeneratingFix ? 'animate-spin' : ''}`}>
                  {isGeneratingFix ? 'sync' : fixSuccess ? 'done' : 'magic_button'}
                </span>
                <span>
                  {isGeneratingFix
                    ? 'Synthesizing AST Code Patch...'
                    : fixSuccess
                    ? 'PR #834 Opened in GitHub!'
                    : 'Generate Autonomous AI Fix Script'}
                </span>
              </button>
              <div className="flex items-center justify-between text-outline text-[11px] px-1 font-mono">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">check</span> Prepares GitHub PR Branch
                </span>
                <span>sitecheck-bot/v3.4</span>
              </div>
            </div>
          </div>

          {/* Execution Worker Footprint Widget */}
          <div className="rounded-2xl bg-surface-container-low/70 backdrop-blur-md p-4 shadow-sm border border-surface-container-high/40 flex flex-col gap-2 text-xs">
            <span className="text-xs uppercase tracking-wider text-outline font-semibold">Execution Worker Footprint</span>
            <div className="grid grid-cols-2 gap-2 text-on-surface-variant font-mono text-[11px]">
              <div className="p-2 rounded-lg bg-surface-container border border-surface-container-high/30">
                <span className="text-outline block text-[9px] uppercase">Engine</span>
                <span>{selectedReport.workerFootprint.engine}</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-container border border-surface-container-high/30">
                <span className="text-outline block text-[9px] uppercase">Emulation</span>
                <span>{selectedReport.workerFootprint.emulation}</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-container border border-surface-container-high/30">
                <span className="text-outline block text-[9px] uppercase">Edge Cluster</span>
                <span>{selectedReport.workerFootprint.edgeCluster}</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-container border border-surface-container-high/30">
                <span className="text-outline block text-[9px] uppercase">Proxy Mode</span>
                <span>{selectedReport.workerFootprint.proxyMode}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

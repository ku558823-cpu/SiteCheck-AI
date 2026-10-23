import React, { useState } from 'react';
import { mockReports } from '../data/mockData';
import { DesktopTab } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReport: (reportId: string) => void;
  onNavigateTab: (tab: DesktopTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectReport,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = mockReports.filter(
    (r) =>
      r.domain.toLowerCase().includes(query.toLowerCase()) ||
      r.subpath.toLowerCase().includes(query.toLowerCase()) ||
      r.commit.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-surface-container border border-surface-container-high/60 shadow-2xl overflow-hidden flex flex-col">
        {/* Search bar */}
        <div className="flex items-center px-4 py-3.5 bg-surface-container-high border-b border-surface-container-highest">
          <span className="material-symbols-outlined text-outline text-[22px] mr-3">search</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search audits, URLs, tests, commits (e.g., stripe, linear, 404)..."
            className="w-full bg-transparent text-on-surface text-base focus:outline-none placeholder:text-outline"
          />
          <kbd className="px-2 py-0.5 rounded bg-surface-container text-xs text-outline font-mono">ESC</kbd>
        </div>

        {/* Results */}
        <div className="p-4 max-h-96 overflow-y-auto flex flex-col gap-2">
          <div className="px-2 text-xs font-semibold text-outline uppercase tracking-wider">Quick Actions</div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => {
                onNavigateTab('analyzer');
                onClose();
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-left transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
              <div>
                <span className="text-xs font-semibold text-on-surface block">Start New Analyzer Run</span>
                <span className="text-[11px] text-outline">Open domain scanner</span>
              </div>
            </button>
            <button
              onClick={() => {
                onNavigateTab('ai-assistant');
                onClose();
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-left transition-colors"
            >
              <span className="material-symbols-outlined text-secondary text-[18px]">psychology</span>
              <div>
                <span className="text-xs font-semibold text-on-surface block">SiteCheck AI Assistant</span>
                <span className="text-[11px] text-outline">Interactive debugging chat</span>
              </div>
            </button>
          </div>

          <div className="px-2 text-xs font-semibold text-outline uppercase tracking-wider mt-2">
            Audits & Reports ({filtered.length})
          </div>
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-outline text-sm">No matches found for "{query}"</div>
          ) : (
            filtered.map((report) => (
              <button
                key={report.id}
                onClick={() => {
                  onSelectReport(report.id);
                  onNavigateTab('testing-reports');
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary font-bold text-xs">
                    {report.domain[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                        {report.domain}
                        {report.subpath}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-surface-container-highest text-primary">
                        {report.env}
                      </span>
                    </div>
                    <span className="text-xs text-outline font-mono">
                      {report.timestamp} • {report.duration}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-bold ${
                      report.score >= 90 ? 'text-tertiary' : report.score >= 80 ? 'text-primary' : 'text-error'
                    }`}
                  >
                    {report.score}/100
                  </span>
                  <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-surface-container-high/50 border-t border-surface-container-highest flex items-center justify-between text-xs text-outline">
          <span>Navigate with arrows • Press ESC to close</span>
          <button onClick={onClose} className="hover:text-on-surface">Close</button>
        </div>
      </div>
    </div>
  );
};

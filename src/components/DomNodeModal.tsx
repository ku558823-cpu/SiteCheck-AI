import React from 'react';
import { IssueItem } from '../types';

interface DomNodeModalProps {
  issue: IssueItem | null;
  onClose: () => void;
}

export const DomNodeModal: React.FC<DomNodeModalProps> = ({ issue, onClose }) => {
  if (!issue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-surface-container border border-surface-container-high/60 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-surface-container-high border-b border-surface-container-highest">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">code</span>
            <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
              DOM Inspector: {issue.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
          <div>
            <span className="text-outline text-xs uppercase font-semibold">Target Element</span>
            <h3 className="font-headline-sm text-[16px] text-on-surface mt-0.5">{issue.title}</h3>
            <span className="text-primary font-mono text-xs block mt-1">{issue.path}</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high/50 flex flex-col gap-2 font-mono text-xs">
            <span className="text-outline text-[11px] uppercase tracking-wider font-sans">Resolved HTML Element</span>
            <pre className="text-tertiary overflow-x-auto whitespace-pre-wrap">{issue.domNode}</pre>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/30 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              <span>AI Remediation Strategy</span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">{issue.recommendation}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-surface-container-high/50 border-t border-surface-container-highest flex items-center justify-between">
          <span className="text-outline text-xs font-mono">Selector: #submit-checkout</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-primary-container text-on-primary-container font-label-md text-xs font-semibold hover:bg-inverse-primary transition-all"
          >
            Done Inspecting
          </button>
        </div>
      </div>
    </div>
  );
};

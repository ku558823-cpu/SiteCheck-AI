import React from 'react';
import { DesktopTab } from '../types';

interface FooterProps {
  onNavigateTab?: (tab: DesktopTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_16px_rgba(0,0,0,0.4)] border-t border-surface-container-high/40 mt-16">
      <div className="w-full px-4 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container-low text-primary">
            <span className="material-symbols-outlined text-[18px]">shield</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-[14px] text-on-surface font-semibold">SiteCheck AI Platform</span>
            <span className="font-body-sm text-body-sm text-outline">Autonomous visual regression, edge diagnostic runner & accessibility auditor.</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-outline font-label-md text-label-md">
          <button
            onClick={() => onNavigateTab && onNavigateTab('analyzer')}
            className="hover:text-on-surface transition-colors"
          >
            Live Analyzer
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab('pricing')}
            className="hover:text-on-surface transition-colors"
          >
            Pricing &amp; ROI
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab('testing-reports')}
            className="hover:text-on-surface transition-colors"
          >
            Testing Reports
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab('ai-assistant')}
            className="hover:text-on-surface transition-colors"
          >
            AI Agent
          </button>
        </div>

        <div className="font-body-sm text-body-sm text-outline">
          © 2025 SiteCheck AI Labs Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

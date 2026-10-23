import React from 'react';
import { DesktopTab, ViewMode } from '../types';

interface HeaderProps {
  activeTab: DesktopTab;
  setActiveTab: (tab: DesktopTab) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onOpenNewAudit: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  theme,
  setTheme,
  onOpenNewAudit,
  onOpenSearch,
  onOpenAuth,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_16px_rgba(0,0,0,0.15)] border-b border-surface-container-high/60 transition-colors">
      <div className="h-20 w-full px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Logo & Engine Status */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('analyzer')} 
            className="flex items-center gap-3 group transition-transform active:scale-95 text-left"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container via-secondary-container to-surface-container-high shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <span className="material-symbols-outlined text-white text-[22px]">shield_with_heart</span>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-30 blur-sm group-hover:opacity-75 transition duration-500"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">SiteCheck</span>
                <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-extrabold">AI</span>
              </div>
              <span className="font-label-sm text-[10px] text-outline uppercase tracking-widest font-semibold">Automated QA Suite</span>
            </div>
          </button>

          <div className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-container-low shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border border-surface-container-high/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono tracking-tight">
              AI ENGINE v3.4 ACTIVE <span className="text-outline mx-1">•</span> Edge Node US-East
            </span>
          </div>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-container-low/70 p-1 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] border border-surface-container-high/40">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`px-3.5 py-2 rounded-lg font-label-md text-label-md transition-all ${
              activeTab === 'analyzer'
                ? 'bg-primary-container text-white font-semibold shadow-[0_0_16px_rgba(37,99,235,0.35)]'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            Analyzer
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-2 rounded-lg font-label-md text-label-md transition-all ${
              activeTab === 'dashboard'
                ? 'bg-primary-container text-white font-semibold shadow-[0_0_16px_rgba(37,99,235,0.35)]'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('testing-reports')}
            className={`px-3.5 py-2 rounded-lg font-label-md text-label-md transition-all ${
              activeTab === 'testing-reports'
                ? 'bg-primary-container text-white font-semibold shadow-[0_0_16px_rgba(37,99,235,0.35)]'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            Testing Reports
          </button>
          <button
            onClick={() => setActiveTab('audit-details')}
            className={`px-3.5 py-2 rounded-lg font-label-md text-label-md transition-all ${
              activeTab === 'audit-details'
                ? 'bg-primary-container text-white font-semibold shadow-[0_0_16px_rgba(37,99,235,0.35)]'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            Audit Details
          </button>
          <button
            onClick={() => setActiveTab('ai-assistant')}
            className={`px-3.5 py-2 rounded-lg font-label-md text-label-md transition-all ${
              activeTab === 'ai-assistant'
                ? 'bg-primary-container text-white font-semibold shadow-[0_0_16px_rgba(37,99,235,0.35)]'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            AI Assistant
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-3.5 py-2 rounded-lg font-label-md text-label-md transition-all ${
              activeTab === 'pricing'
                ? 'bg-primary-container text-white font-semibold shadow-[0_0_16px_rgba(37,99,235,0.35)]'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            Pricing
          </button>
        </nav>

        {/* Right: Theme Toggle, View Mode Toggle, Search, New Audit & Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle Button (White Mode / Dark Mode) */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high/60 text-xs font-semibold text-on-surface transition-all shadow-sm"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to White / Light Mode'}
          >
            <span className="material-symbols-outlined text-[17px] text-primary">
              {theme === 'light' ? 'light_mode' : 'dark_mode'}
            </span>
            <span className="hidden sm:inline">{theme === 'light' ? 'White' : 'Dark'}</span>
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-surface-container-high/60">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'desktop'
                  ? 'bg-primary-container text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Desktop Suite View"
            >
              <span className="material-symbols-outlined text-[16px]">desktop_mac</span>
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'mobile'
                  ? 'bg-primary-container text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Mobile Companion Shell"
            >
              <span className="material-symbols-outlined text-[16px]">smartphone</span>
              <span className="hidden sm:inline">Mobile Shell</span>
            </button>
          </div>

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors border border-surface-container-high/50"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-outline">search</span>
            <span className="font-body-sm text-body-sm text-outline">Search</span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container-high text-[10px] font-mono text-outline font-semibold shadow-sm">
              ⌘K
            </kbd>
          </button>

          {/* New Audit CTA */}
          <button
            onClick={onOpenNewAudit}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg bg-primary-container text-white font-label-md text-label-md hover:bg-blue-600 shadow-[0_0_16px_rgba(37,99,235,0.35)] transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            <span className="hidden sm:inline">New Audit</span>
          </button>

          {/* User Profile / Auth Toggle */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 pl-1 hover:opacity-90 transition-opacity"
            title="User Settings & Enterprise Access"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-2 ring-primary-container/40">
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-label-md text-label-md text-on-surface leading-none">Alex Vance</span>
                <span className="px-1.5 py-0.5 rounded-full bg-secondary-container text-secondary text-[10px] font-semibold leading-none">
                  Pro Team
                </span>
              </div>
              <span className="font-label-sm text-[11px] text-outline leading-tight">alex@sitecheck.ai</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

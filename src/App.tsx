/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewMode, DesktopTab, IssueItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileShell } from './components/MobileShell';
import { SearchModal } from './components/SearchModal';
import { NewAuditModal } from './components/NewAuditModal';
import { DomNodeModal } from './components/DomNodeModal';
import { AuthModal } from './views/AuthModal';

// Views
import { AnalyzerView } from './views/AnalyzerView';
import { DashboardView } from './views/DashboardView';
import { TestingReportsView } from './views/TestingReportsView';
import { AuditDetailsView } from './views/AuditDetailsView';
import { AiAgentView } from './views/AiAgentView';
import { PricingView } from './views/PricingView';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [activeTab, setActiveTab] = useState<DesktopTab>('analyzer');

  // Theme state ('light' = white theme as requested, 'dark' = dark theme)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sitecheck-theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  useEffect(() => {
    document.documentElement.className = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sitecheck-theme', theme);
  }, [theme]);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewAuditOpen, setIsNewAuditOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [inspectedIssue, setInspectedIssue] = useState<IssueItem | null>(null);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K and Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNewAuditOpen(false);
        setIsAuthOpen(false);
        setInspectedIssue(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInspectDom = (issue: IssueItem) => {
    setInspectedIssue(issue);
  };

  const handleInspectNodeSimple = (domNode: string, errorDescription: string) => {
    setInspectedIssue({
      id: 'custom-' + Date.now(),
      title: errorDescription,
      path: window.location.pathname,
      severity: 'critical',
      category: 'Viewport Collision & Tap Target',
      device: 'Mobile (Viewport 390x844)',
      recommendation: 'Increase touch area to minimum 48x48px and add touch-action: manipulation.',
      domNode,
    });
  };

  const handleStartAudit = (url: string) => {
    setActiveTab('analyzer');
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col selection:bg-primary-container selection:text-on-primary-container antialiased transition-colors duration-200">
      {/* View Switcher Bar (Mobile vs Desktop) */}
      {viewMode === 'mobile' ? (
        <MobileShell
          onSwitchToDesktop={() => setViewMode('desktop')}
          onOpenInspectNode={handleInspectNodeSimple}
          onOpenAuth={() => setIsAuthOpen(true)}
          theme={theme}
          setTheme={setTheme}
        />
      ) : (
        <div className="flex flex-col min-h-screen">
          {/* Desktop Universal Header */}
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            viewMode={viewMode}
            setViewMode={setViewMode}
            theme={theme}
            setTheme={setTheme}
            onOpenNewAudit={() => setIsNewAuditOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
          />

          {/* Main Content Area */}
          <main className="flex-1 w-full pt-20">
            {activeTab === 'analyzer' && (
              <AnalyzerView
                onNavigateTab={setActiveTab}
                onSelectDomainForAudit={handleStartAudit}
              />
            )}
            {activeTab === 'dashboard' && (
              <DashboardView
                onInspectDom={handleInspectDom}
                onNavigateTab={(tab) => setActiveTab(tab as DesktopTab)}
              />
            )}
            {activeTab === 'testing-reports' && (
              <TestingReportsView
                onInspectReportDetails={() => setActiveTab('audit-details')}
              />
            )}
            {activeTab === 'audit-details' && <AuditDetailsView />}
            {activeTab === 'ai-assistant' && <AiAgentView />}
            {activeTab === 'pricing' && <PricingView />}
            {activeTab === 'auth' && (
              <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="px-6 py-3 rounded-xl bg-primary-container hover:bg-blue-600 text-white font-semibold text-[15px] shadow-lg flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">troubleshoot</span>
                  <span>Launch QA Studio Authentication Modal</span>
                </button>
              </div>
            )}
          </main>

          {/* Universal Footer */}
          <Footer onNavigateTab={setActiveTab} />
        </div>
      )}

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectReport={(reportId) => {
          setIsSearchOpen(false);
          setActiveTab('testing-reports');
        }}
        onNavigateTab={(tab) => {
          setIsSearchOpen(false);
          setActiveTab(tab);
        }}
      />

      <NewAuditModal
        isOpen={isNewAuditOpen}
        onClose={() => setIsNewAuditOpen(false)}
        onStartAudit={(url) => {
          setIsNewAuditOpen(false);
          setActiveTab('analyzer');
        }}
      />

      <DomNodeModal
        issue={inspectedIssue}
        onClose={() => setInspectedIssue(null)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(email) => {
          setIsAuthOpen(false);
        }}
      />
    </div>
  );
}

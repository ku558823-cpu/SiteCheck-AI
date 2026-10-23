import React, { useState } from 'react';

interface NewAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAudit: (url: string) => void;
}

export const NewAuditModal: React.FC<NewAuditModalProps> = ({
  isOpen,
  onClose,
  onStartAudit,
}) => {
  const [url, setUrl] = useState('https://stripe.com');
  const [browserEngine, setBrowserEngine] = useState('chromium');
  const [viewport, setViewport] = useState('both');
  const [aiSimulation, setAiSimulation] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onStartAudit(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-surface-container border border-surface-container-high/60 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-surface-container-high border-b border-surface-container-highest">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-[16px] text-on-surface font-semibold">Launch New Website Audit</h2>
              <p className="text-outline text-xs">Run autonomous crawling across 180+ global edge locations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase font-semibold text-outline">Target Production or Staging URL</label>
            <div className="relative flex items-center bg-surface-container-lowest rounded-xl border border-surface-container-high/50 p-1">
              <span className="material-symbols-outlined text-primary text-[20px] ml-3 mr-2">language</span>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourcompany.com"
                className="w-full bg-transparent py-2.5 text-on-surface text-sm focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setUrl('https://linear.app')}
                className="px-2 py-1 text-xs text-primary bg-surface-container-high hover:bg-surface-bright rounded-lg mr-2 font-medium"
              >
                linear.app
              </button>
              <button
                type="button"
                onClick={() => setUrl('https://shopify.dev')}
                className="px-2 py-1 text-xs text-primary bg-surface-container-high hover:bg-surface-bright rounded-lg mr-2 font-medium"
              >
                shopify.dev
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-semibold text-outline">Headless Engine</label>
              <select
                value={browserEngine}
                onChange={(e) => setBrowserEngine(e.target.value)}
                className="bg-surface-container-lowest border border-surface-container-high/50 rounded-xl px-3 py-2.5 text-xs text-on-surface focus:outline-none"
              >
                <option value="chromium">Chromium 122 (Swarm)</option>
                <option value="webkit">WebKit (Safari 17)</option>
                <option value="firefox">Firefox Gecko ESR</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-semibold text-outline">Viewport Target</label>
              <select
                value={viewport}
                onChange={(e) => setViewport(e.target.value)}
                className="bg-surface-container-lowest border border-surface-container-high/50 rounded-xl px-3 py-2.5 text-xs text-on-surface focus:outline-none"
              >
                <option value="both">Desktop + Mobile (390px)</option>
                <option value="mobile">Mobile Viewport Only</option>
                <option value="desktop">Desktop 1920x1080</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-on-surface">Autonomous AI Simulation</span>
                <span className="text-[11px] text-outline">Simulates clicks, form submit fuzzing & cart checkout</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAiSimulation(!aiSimulation)}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
                aiSimulation ? 'bg-primary-container flex justify-end' : 'bg-surface-container-highest flex justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow-md"></span>
            </button>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-bright text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container hover:bg-inverse-primary text-xs font-bold shadow-lg flex items-center gap-2 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              <span>Start Autonomous Audit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

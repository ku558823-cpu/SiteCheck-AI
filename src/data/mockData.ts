import { AuditReport, IssueItem } from '../types';

export const mockReports: AuditReport[] = [
  {
    id: 'rep-stripe',
    domain: 'stripe.com',
    subpath: '/checkout',
    env: 'prod',
    commit: '9f41a8c',
    branch: 'main',
    timestamp: 'Oct 24, 14:32:08',
    duration: '42.4s',
    pagesAudited: 38,
    viewport: '375×812 + 1440',
    score: 94,
    grade: 'Grade A',
    status: 'Passed',
    statusColor: 'tertiary',
    keyFindings: ['3 broken links', '1 tap warning'],
    pdfSize: '2.4 MB',
    metrics: {
      lcp: '1.1s',
      cls: '0.01',
      inp: '98ms',
      wcagScore: '92.0%',
      domShift: '0.000',
      deadLinks: 3,
      warnings: 1,
      criticalIssues: 1
    },
    trend: [18, 14, 19, 8, 4],
    workerFootprint: {
      engine: 'Chromium 122 Headless',
      emulation: 'Touch Enabled + GPS mock',
      edgeCluster: 'AWS iad-edge-04b',
      proxyMode: 'Direct Residential Pool'
    }
  },
  {
    id: 'rep-linear',
    domain: 'app.linear.b2b',
    subpath: '/overview',
    env: 'staging',
    commit: '812a02b',
    branch: 'staging-pr-812',
    timestamp: 'Oct 24, 11:15:30',
    duration: '19.1s',
    pagesAudited: 12,
    viewport: '1920×1080 Full',
    score: 98,
    grade: 'Grade A+',
    status: 'Flawless',
    statusColor: 'tertiary',
    keyFindings: ['Clean pass, 0 regressions', 'Audit hash #8812'],
    pdfSize: '1.8 MB',
    metrics: {
      lcp: '0.8s',
      cls: '0.00',
      inp: '45ms',
      wcagScore: '99.5%',
      domShift: '0.000',
      deadLinks: 0,
      warnings: 0,
      criticalIssues: 0
    },
    trend: [12, 10, 6, 4, 2],
    workerFootprint: {
      engine: 'Chromium 122 Headless',
      emulation: 'Desktop 1920x1080 High DPI',
      edgeCluster: 'GCP fra-central-02',
      proxyMode: 'Fast Edge Proxy'
    }
  },
  {
    id: 'rep-shopify',
    domain: 'shopify-demo-store.io',
    subpath: '/cart',
    env: 'v2.4-rel',
    commit: 'release/v2.4.0-rc2',
    branch: 'release/v2.4',
    timestamp: 'Oct 23, 21:04:19',
    duration: '1m 18s',
    pagesAudited: 84,
    viewport: 'iPhone 15 Pro',
    score: 78,
    grade: 'Grade C',
    status: 'Failed',
    statusColor: 'error',
    keyFindings: ['2 critical form errors', 'LCP 4.2s (Exceeded SLA)'],
    pdfSize: '3.6 MB',
    metrics: {
      lcp: '4.2s',
      cls: '0.14',
      inp: '310ms',
      wcagScore: '74.2%',
      domShift: '0.042',
      deadLinks: 12,
      warnings: 5,
      criticalIssues: 2
    },
    trend: [4, 6, 8, 18, 22],
    workerFootprint: {
      engine: 'WebKit (Safari 17.4)',
      emulation: 'iPhone 15 Pro WebKit 390x844',
      edgeCluster: 'AWS hkg-edge-01',
      proxyMode: 'Commercial Gateway'
    }
  },
  {
    id: 'rep-vercel',
    domain: 'vercel-nextjs-docs',
    subpath: '/docs',
    env: 'production',
    commit: 'b04d88e',
    branch: 'master',
    timestamp: 'Oct 23, 18:40:02',
    duration: '28.3s',
    pagesAudited: 52,
    viewport: 'Responsive (5x)',
    score: 96,
    grade: 'Grade A',
    status: 'Needs Attn',
    statusColor: 'surface-high',
    keyFindings: ['1 missing image alt tag', 'SEO & A11y pass: 99%'],
    pdfSize: '2.1 MB',
    metrics: {
      lcp: '1.1s',
      cls: '0.01',
      inp: '78ms',
      wcagScore: '98.0%',
      domShift: '0.000',
      deadLinks: 0,
      warnings: 1,
      criticalIssues: 0
    },
    trend: [14, 12, 12, 6, 4],
    workerFootprint: {
      engine: 'Chromium 122 Headless',
      emulation: 'Automated Multi-Device Swarm',
      edgeCluster: 'Cloudflare Edge sfo-09',
      proxyMode: 'Direct Residential Pool'
    }
  },
  {
    id: 'rep-supabase',
    domain: 'supabase.internal/console',
    subpath: '/project/settings',
    env: 'ci-branch',
    commit: 'cc8191a',
    branch: 'feat/auth-v3',
    timestamp: 'Oct 23, 09:12:44',
    duration: '14.8s',
    pagesAudited: 8,
    viewport: '1440×900 Native',
    score: 92,
    grade: 'Grade A',
    status: 'Passed',
    statusColor: 'tertiary',
    keyFindings: ['Zero visual shifts (CLS 0.00)', 'Autofix applied to header'],
    pdfSize: '1.5 MB',
    metrics: {
      lcp: '1.3s',
      cls: '0.00',
      inp: '112ms',
      wcagScore: '94.5%',
      domShift: '0.000',
      deadLinks: 1,
      warnings: 2,
      criticalIssues: 0
    },
    trend: [18, 16, 10, 10, 8],
    workerFootprint: {
      engine: 'Chromium 122 Headless',
      emulation: 'MacBook Pro 1440x900',
      edgeCluster: 'AWS us-east-1a CI Cluster',
      proxyMode: 'Internal VPC Runner'
    }
  }
];

export const mockIssues: IssueItem[] = [
  {
    id: 'issue-1',
    title: 'Checkout CTA unclickable on Safari iOS 17',
    path: '/pricing#enterprise-plan',
    severity: 'critical',
    category: 'Functionality',
    device: 'iOS 17',
    recommendation: 'z-index conflict with sticky navbar (z-50 overlays button). Change navbar z-index or add relative positioning.',
    domNode: '<button class="absolute bottom-4 w-full bg-blue-600 ...">'
  },
  {
    id: 'issue-2',
    title: 'Uncompressed hero image (2.4MB)',
    path: '/static/images/hero-dashboard.png',
    severity: 'warning',
    category: 'Performance',
    device: 'Assets',
    recommendation: 'Convert to WebP/AVIF format to save 1.9MB and improve LCP by 640ms.',
    domNode: '<img src="/static/images/hero-dashboard.png" width="2400" height="1200" />'
  },
  {
    id: 'issue-3',
    title: 'Missing og:image social fallback card',
    path: '/blog/winter-release',
    severity: 'optimizations',
    category: 'SEO',
    device: 'Meta',
    recommendation: 'Generate programmatic 1200×630 banner and insert meta tag in head payload.',
    domNode: '<meta property="og:title" content="Winter Release" />'
  },
  {
    id: 'issue-4',
    title: 'Icon button missing explicit aria-label',
    path: 'footer > div > button.lang-switch',
    severity: 'optimizations',
    category: 'Accessibility',
    device: 'ARIA',
    recommendation: 'Attach aria-label="Select preferred language" to resolve WCAG 4.1.2 requirement.',
    domNode: '<button class="lang-switch"><span class="icon"></span></button>'
  }
];

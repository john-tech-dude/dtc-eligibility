// @ts-check
const { test, expect } = require('@playwright/test');

const DTC_GUIDE = '/pages/guides/dtc-guide.html';
const ELIGIBILITY = '/pages/forms/dtc-eligibility-questionnaire.html';

test.describe('Learning paths (hub)', () => {
  test('JSON is reachable and has core tracks', async ({ request }) => {
    const res = await request.get('/data/learning-paths.json');
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(json.paths.length).toBeGreaterThanOrEqual(4);
    const ids = json.paths.map((p) => p.id);
    expect(ids).toContain('post-trade');
    expect(ids).toContain('collateral');
    expect(ids).toContain('verification');
    const postTrade = json.paths.find((p) => p.id === 'post-trade');
    expect(postTrade.steps.some((s) => s.module === 'corporate-actions')).toBeTruthy();
    expect(postTrade.steps.some((s) => s.module === 'transfer-agent')).toBeTruthy();
  });

  test('hub renders path cards and start links', async ({ page }) => {
    await page.goto('/index.html#learning-paths');
    const root = page.locator('#learning-paths-root');
    await expect(root).toBeVisible({ timeout: 10_000 });
    await expect(root.locator('.lp-card').first()).toBeVisible();
    await expect(root.locator('.lp-card')).toHaveCount(7);
    await expect(root.getByText(/Post-Trade & DTC Core/i)).toBeVisible();
    await expect(root.getByText(/Verification of Claims/i)).toBeVisible();
    const start = root.locator('.lp-start').first();
    await expect(start).toHaveAttribute('href', /pages\//);
  });
});

test.describe('Layout partials', () => {
  test('eligibility footer gets Learning Paths link', async ({ page }) => {
    await page.goto(ELIGIBILITY);
    const nav = page.locator('.page-footer .footer-site-nav');
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: /Learning Paths/i })).toBeVisible({
      timeout: 5000,
    });
  });

  test('dtc guide footer enhanced with Learning Paths', async ({ page }) => {
    await page.goto(DTC_GUIDE);
    await expect(
      page.locator('.page-footer .footer-site-nav a[href*="learning-paths"]')
    ).toBeVisible({ timeout: 5000 });
  });

  const guidesWithLayout = [
    '/pages/guides/sf28-teaching-guide.html',
    '/pages/guides/corporate-structures.html',
    '/pages/guides/trusts-fiduciary.html',
    '/pages/guides/non-profit-foundations.html',
    '/pages/guides/collateral-ucc-article-8.html',
    '/pages/guides/corporate-actions.html',
    '/pages/guides/transfer-agent-operations.html',
    '/pages/docs/treasury-international-bill-of-exchange.html',
  ];

  for (const path of guidesWithLayout) {
    test(`footer Learning Paths on ${path.split('/').pop()}`, async ({ page }) => {
      await page.goto(path);
      await expect(
        page.locator('.page-footer[data-layout="enhance"] .footer-site-nav a[href*="learning-paths"]')
      ).toBeVisible({ timeout: 8000 });
    });
  }
});

test.describe('Deposit lifecycle cleanup', () => {
  test('six vertical steps render without floating fragments', async ({ page }) => {
    await page.goto(DTC_GUIDE + '#process-certificated-deposit');
    const section = page.locator('#process-certificated-deposit');
    await expect(section).toBeVisible();
    await expect(section.locator('.deposit-step')).toHaveCount(6);
    await expect(section.locator('h4').nth(0)).toContainText(/Investor initiation/i);
    await expect(section.locator('h4').nth(2)).toContainText(/provisional credit/i);
    // Body text stays inside step cards (no orphan floated em/strong outside)
    const body = section.locator('.deposit-step').nth(2).locator('.deposit-step-body');
    await expect(body).toContainText(/provisional/i);
    await expect(body).toContainText(/transfer agent later rejects/i);
  });
});

test.describe('Theme + help controls', () => {
  test('help and theme are separate controls on dtc guide', async ({ page }) => {
    await page.goto(DTC_GUIDE);
    await expect(page.locator('.help-btn')).toBeVisible();
    await expect(page.locator('#themeToggle')).toBeVisible();
    // Only one visible icon inside theme toggle
    const visibleIcons = page.locator('#themeToggle svg:visible');
    await expect(visibleIcons).toHaveCount(1);
  });
});

test.describe('Critical CSS assets', () => {
  test('page stylesheets return 200', async ({ request }) => {
    for (const path of [
      '/styles/shared.css',
      '/styles/teaching.css',
      '/styles/forms-eligibility.css',
      '/styles/guides-dtc.css',
      '/styles/learning-paths.css',
      '/styles/guides-corporate-actions.css',
      '/styles/guides-transfer-agent.css',
      '/js/layout.js',
      '/js/learning-paths.js',
      '/data/learning-paths.json',
      '/pages/guides/corporate-actions.html',
      '/pages/guides/transfer-agent-operations.html',
    ]) {
      const res = await request.get(path);
      expect(res.ok(), path).toBeTruthy();
    }
  });
});

// @ts-check
const { test, expect } = require('@playwright/test');

const ELIGIBILITY = '/pages/forms/dtc-eligibility-questionnaire.html';

test.describe('Site smoke', () => {
  test('hub loads', async ({ page }) => {
    await page.goto('/index.html');
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/DTC|Teaching|Document/i);
  });

  test('eligibility questionnaire loads', async ({ page }) => {
    await page.goto(ELIGIBILITY);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Eligibility Questionnaire/i);
  });

  test('glossary loads and filters terms', async ({ page }) => {
    await page.goto('/glossary.html');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Glossary/i);
    const list = page.locator('#glossaryList');
    await expect(list.locator('.glossary-item').first()).toBeVisible({ timeout: 10_000 });
    await page.locator('#glossarySearch').fill('rehypothecation');
    await expect(list.locator('.glossary-item')).toHaveCount(1);
    await expect(list).toContainText(/re-uses collateral|rehypothecation/i);
  });

  test('child guide TOC has live document links', async ({ page }) => {
    await page.goto('/pages/guides/dtc-guide.html');
    const toc = page.locator('#tocSidebar');
    await expect(toc.getByRole('link', { name: /LLCs/i })).toBeVisible();
    await expect(toc.locator('.no-access')).toHaveCount(0);
  });

  test('corporate actions guide loads with maps and quiz', async ({ page }) => {
    await page.goto('/pages/guides/corporate-actions.html');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Corporate Actions/i);
    await expect(page.locator('#concept-map-allocation')).toBeVisible();
    await expect(page.locator('#process-voluntary')).toBeVisible();
    await expect(page.locator('#quiz')).toBeVisible();
    await expect(page.locator('.quiz-card')).toHaveCount(10);
    await page.locator('#tab-sc-b').click();
    await expect(page.locator('#sc-b')).toBeVisible();
    await expect(page.locator('#sc-b')).toContainText(/Tender/i);
  });

  test('transfer agent guide loads with FAST/DWAC content', async ({ page }) => {
    await page.goto('/pages/guides/transfer-agent-operations.html');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Transfer Agent/i);
    await expect(page.locator('#fast')).toBeVisible();
    await expect(page.locator('#process-dwac')).toBeVisible();
    await expect(page.locator('#concept-map-interface')).toBeVisible();
    await expect(page.locator('#concept-map-dwac-balance')).toBeVisible();
    await expect(page.locator('#concept-map-drs-street')).toBeVisible();
    await expect(page.locator('#process-dwac .ta-process-step')).toHaveCount(6);
    await expect(page.locator('#quiz .quiz-card')).toHaveCount(10);
    await page.locator('#tab-sc-b').click();
    await expect(page.locator('#sc-b')).toContainText(/DRS/i);
  });
});

test.describe('OA canon crosswalk', () => {
  test('renders timelines and crosswalk from JSON', async ({ page }) => {
    await page.goto(ELIGIBILITY);
    const root = page.locator('#oa-crosswalk');
    await expect(root).toBeVisible({ timeout: 10_000 });
    await expect(root.locator('.oa-canon-heading').first()).toContainText(/timeline|crosswalk|canon/i);
    await expect(root.locator('.oa-canon-row, .oa-crosswalk-card').first()).toBeVisible();
    // Filter buttons work
    await root.locator('.oa-filter-btn[data-view="rules"]').click();
    await expect(root.locator('.oa-rule-card').first()).toBeVisible();
    await root.locator('.oa-filter-btn[data-view="all"]').click();
  });

  test('canon JSON is reachable', async ({ request }) => {
    const res = await request.get('/data/oa-canon.json');
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(json.meta.asOf).toBe('2026-06-10');
    expect(json.timelines.length).toBeGreaterThan(3);
    expect(json.crosswalk.length).toBeGreaterThan(3);
  });
});

test.describe('Scenario engine', () => {
  test('switches scenarios and updates ARIA', async ({ page }) => {
    await page.goto(ELIGIBILITY + '#scenarios');
    const root = page.locator('#scenarios');
    await expect(root).toBeVisible();

    const tabB = root.locator('[data-scenario-target="sc-b"]');
    await tabB.click();
    await expect(tabB).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#sc-b')).toBeVisible();
    await expect(page.locator('#sc-b')).toHaveClass(/active/);
    await expect(page.locator('#sc-a')).toBeHidden();

    const tabD = root.locator('[data-scenario-target="sc-d"]');
    await tabD.click();
    await expect(page.locator('#sc-d')).toBeVisible();
    await expect(page.locator('#sc-d')).toContainText(/Municipal|Franklin|serial/i);
  });

  test('keyboard arrows move between tabs', async ({ page }) => {
    await page.goto(ELIGIBILITY + '#scenarios');
    const first = page.locator('#scenarios [data-scenario-target="sc-a"]');
    await first.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#scenarios [data-scenario-target="sc-b"]')).toHaveAttribute(
      'aria-selected',
      'true'
    );
    await expect(page.locator('#sc-b')).toBeVisible();
  });
});

test.describe('CUSIP information grid', () => {
  test('six columns align and examples are pre-filled', async ({ page }) => {
    await page.goto(ELIGIBILITY + '#cusip-table');
    const section = page.locator('#cusip-table');
    await expect(section).toBeVisible();

    const grid = section.locator('.cusip-table');
    await expect(grid).toBeVisible();

    // Headers
    await expect(grid.locator('.cusip-head')).toHaveCount(6);
    await expect(grid.locator('.cusip-head').nth(0)).toContainText(/CUSIP Number/i);
    await expect(grid.locator('.cusip-head').nth(5)).toContainText(/Offering Price/i);

    // First data row cells under correct headers (6 heads + 6 cells)
    const cells = grid.locator('.cusip-cell.filled');
    await expect(cells.nth(0)).toContainText(/037833AA5|037833100/);
    await expect(cells.nth(1)).toContainText('5.250%');
    await expect(cells.nth(4)).toHaveText(/^\s*T\s*$/);
    await expect(cells.nth(5)).toContainText('99.50');

    // No overflow outside facsimile (last cell within page2 box)
    const fac = page.locator('#form-facsimile-page2');
    const lastCell = cells.nth(5);
    const facBox = await fac.boundingBox();
    const cellBox = await lastCell.boundingBox();
    expect(facBox).toBeTruthy();
    expect(cellBox).toBeTruthy();
    expect(cellBox.x + cellBox.width).toBeLessThanOrEqual(facBox.x + facBox.width + 2);
  });
});

test.describe('Mobile layout', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('form and CUSIP remain usable on small screens', async ({ page }) => {
    await page.goto(ELIGIBILITY + '#cusip-table');
    const section = page.locator('#cusip-table');
    await expect(section).toBeVisible();

    // Stacked mobile cells show labels via ::before — content still present
    await expect(section.locator('.cusip-cell.filled').first()).toContainText(/037833/);

    // Horizontal page does not force large min-width body scroll from CUSIP alone
    // (allow a few px for subpixel / scrollbar gutters)
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth - clientWidth).toBeLessThanOrEqual(48);

    // Scenario tabs scroll horizontally without breaking
    await page.goto(ELIGIBILITY + '#scenarios');
    await page.locator('#scenarios [data-scenario-target="sc-c"]').click();
    await expect(page.locator('#sc-c')).toBeVisible();
  });
});

test.describe('Theme + core nav', () => {
  test('theme toggle does not crash page', async ({ page }) => {
    await page.goto(ELIGIBILITY);
    const toggle = page.locator('#themeToggle, [data-theme-toggle], button.theme-toggle').first();
    if (await toggle.count()) {
      await toggle.click();
      // Either dark or light should be set
      const theme = await page.locator('html').getAttribute('data-theme');
      expect(theme === 'dark' || theme === 'light' || theme === null).toBeTruthy();
    }
  });
});

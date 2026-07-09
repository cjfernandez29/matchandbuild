const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  
  const headerCountdown = await page.locator('[role="timer"]').first().isVisible();
  const countdownSectionVisible = await page.locator('section').filter({ hasText: 'Faltan' }).isVisible();
  await page.screenshot({ path: 'countdown-screenshot.png', fullPage: true });
  
  await browser.close();
})().catch(e => {
  console.error(e);
  process.exit(1);
});

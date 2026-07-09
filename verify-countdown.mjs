import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  
  const headerCountdown = await page.locator('[role="timer"]').first().isVisible();
  const countdownBoxes = await page.locator('[role="timer"]').first().locator('div').count();
  
  await page.screenshot({ path: 'countdown-screenshot.png', fullPage: false });
  
  await browser.close();
})().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});

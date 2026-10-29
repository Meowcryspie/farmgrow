import { test, expect } from '@playwright/test';

test.describe('EC Link End-to-End Acceptance Verification', () => {
  test('Customer App: Login, Dashboard, Tank Control, Alarm Clearance, and Admin Console', async ({ page }) => {
    // 1. Visit Login page
    await page.goto('/login');
    await expect(page.locator('h1')).toHaveText('Welcome back');
    await expect(page.locator('text=Log in to see all your farms.')).toBeVisible();

    // 2. Click "Log in" -> should navigate to /app
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/app/);

    // 3. Verify My farms dashboard metrics
    await expect(page.locator('h1')).toHaveText('My farms');
    await expect(page.locator('text=6 of 7 online')).toBeVisible();

    // Check KPI cards: Tanks 7, Alarms 1, Offline 1
    const tanksCard = page.locator('.glass-card-sm:has-text("Tanks")');
    await expect(tanksCard.locator('.mono-val')).toHaveText('7');

    const alarmsCard = page.locator('.glass-card-sm:has-text("Alarms")');
    await expect(alarmsCard.locator('.mono-val')).toHaveText('1');

    const offlineCard = page.locator('.glass-card-sm:has-text("Offline")');
    await expect(offlineCard.locator('.mono-val')).toHaveText('1');

    // Check Farm Chips
    await expect(page.locator('.glass-card:has-text("Farm One") .pill')).toHaveText('1 alarm');
    await expect(page.locator('.glass-card:has-text("Farm Two") .pill')).toHaveText('1 adjusting, 1 offline');

    // 4. Open Farm One
    await page.click('.glass-card:has-text("Farm One")');
    await expect(page).toHaveURL(/\/app\/farm\/farm-1/);
    await expect(page.locator('h1')).toHaveText('Farm One');
    await expect(page.locator('text=Lettuce bay')).toBeVisible();
    await expect(page.locator('text=Tomato bay')).toBeVisible();

    // 5. Open Tank 2 (Tomato bay - in alarm)
    await page.click('.glass-card:has-text("Tomato bay")');
    await expect(page).toHaveURL(/\/app\/tank\/f1-t2/);
    await expect(page.locator('h1')).toHaveText('Tank 2');

    // Reading tab: verify EC reading 2.31 and Alarm status pill
    await expect(page.locator('.pill-red')).toHaveText('Alarm');

    // 6. Test Control tab and 900ms round-trip confirmation
    await page.click('button:has-text("Control")');
    await expect(page.locator('text=Target EC (mS/cm)')).toBeVisible();

    // Click '+' on target stepper
    const plusBtn = page.locator('.stepper-btn-lg:has-text("+")');
    await plusBtn.click();

    // Expect pending notice
    await expect(page.locator('text=Sent, waiting for the controller...')).toBeVisible();

    // Wait for confirmation
    await expect(page.locator('text=Controller confirmed 2.1')).toBeVisible({ timeout: 2000 });

    // Click '+' on target stepper twice more to reach 2.3 (matching 2.31 EC for In Range)
    await plusBtn.click(); // 2.2
    await plusBtn.click(); // 2.3

    // 7. Clear Alarm by raising High limit above 2.31 (raise to 2.4)
    // Current high is 2.2. Click '+' on High limit twice
    const highLimitPlus = page.getByLabel('Increase high limit');
    await highLimitPlus.click(); // 2.3
    await highLimitPlus.click(); // 2.4

    // Switch back to Reading tab and confirm alarm cleared
    await page.click('button:has-text("Reading")');
    await expect(page.locator('.pill-green:has-text("In range")')).toBeVisible();

    // Back to Farm One -> back to All Farms
    await page.click('button:has-text("Farm One")');
    await expect(page.locator('.glass-card:has-text("Tomato bay") .pill-green')).toHaveText('In range');

    await page.click('button:has-text("All farms")');
    // Dashboard alarms count must now be 0!
    await expect(alarmsCard.locator('.mono-val')).toHaveText('0');
    // Farm One chip is now "All in range"
    await expect(page.locator('.glass-card:has-text("Farm One") .pill')).toHaveText('All in range');

    // 8. Test Admin Console
    await page.click('a:has-text("Admin Console")');
    await expect(page).toHaveURL(/\/admin/);
    await expect(page.locator('h1')).toHaveText('Fleet overview');
    await expect(page.locator('text=Registered devices')).toBeVisible();
    await expect(page.locator('.mono-val:has-text("248")')).toBeVisible();
    await expect(page.locator('.mono-val:has-text("228")')).toBeVisible();

    // Test Devices Table and Filters
    await page.click('nav >> a:has-text("Devices")');
    await expect(page).toHaveURL(/\/admin\/devices/);
    await expect(page.locator('h1')).toHaveText('Devices');

    // Filter chip test
    await page.click('button:has-text("Alarm")');
    await expect(page.locator('text=Showing 2 of 6 devices')).toBeVisible();

    await page.click('button:has-text("All")');
    await expect(page.locator('text=Showing 10 of 239 devices')).toBeVisible();

    // Open first device detail
    await page.click('td:has-text("ECM-4F2A-91C7")');
    await expect(page).toHaveURL(/\/admin\/devices\/ECM-4F2A-91C7/);
    await expect(page.locator('h1')).toHaveText('Tank 2, Farm One');

    // Click "Send test command" and check banner
    await page.click('button:has-text("Send test command")');
    await expect(page.locator('text=Test command sent. Waiting for the device to acknowledge.')).toBeVisible();

    // Test Provisioning
    await page.click('nav >> a:has-text("Provisioning")');
    await expect(page).toHaveURL(/\/admin\/provisioning/);
    await expect(page.locator('h1')).toHaveText('Provisioning');

    // Click "Generate IDs and claim codes"
    await page.click('button:has-text("Generate IDs and claim codes")');
    await expect(page.locator('text=24 devices registered in batch B-1028-A with firmware 1.4.0')).toBeVisible();
  });
});

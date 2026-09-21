import { test, expect } from '@playwright/test';

test.describe('Sentinel DApp UI Flow', () => {
  test('should trigger 1AM wallet connect and simulate ZK submission', async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:3000');
    
    // Inject mock 1AM wallet extension into the page
    await page.addInitScript(() => {
      (window as any).midnight = {
        '1am': {
          name: '1AM Wallet',
          connect: async () => {
            (window as any).__1am_connected = true;
            return {
              getUnshieldedAddress: async () => 'mock1preprodaddress_e2e_test',
              getConnectionStatus: async () => true,
              state: 'connected'
            };
          }
        }
      };
    });

    // We can evaluate to ensure the script is added but let's just use page load
    await page.reload();

    // The user clicks Connect 1a.m.
    const connectButton = page.getByRole('button', { name: /Connect 1a.m./i });
    
    if (await connectButton.isVisible()) {
        await connectButton.click();
        console.log('Clicked connect button');
    }

    // Wait for the address to appear which means connection succeeded
    await expect(page.getByText('mock1pre...e_test').first()).toBeVisible({ timeout: 5000 });
    console.log('Wallet connection succeeded');

    // Test the File Disclosure flow
    const fileDisclosureButton = page.getByRole('button', { name: /File Disclosure/i });
    await fileDisclosureButton.click();

    // Wait for modal to open
    const modalTitle = page.getByText('Submit Classified Report');
    await expect(modalTitle).toBeVisible();
    console.log('Disclosure modal opened successfully without blockages');
    
    // Fill out the form
    await page.fill('input[placeholder="Organization Secret Key"]', 'SECRET_ORANGE');
    await page.fill('input[placeholder="Category (e.g. Financial Fraud, Safety)"]', 'Ethics Violation');
    await page.fill('textarea[placeholder="Describe the incident securely..."]', 'This is an end-to-end automated test payload.');
    
    // Click submit
    const submitButton = page.getByRole('button', { name: /AUTHORIZE DISCLOSURE/i });
    await submitButton.click();

    // Check that it gets sent (we expect standard close behavior or a toast - assuming modal closes on success)
    await expect(page.getByText('Disclosure Verified')).toBeVisible({ timeout: 5000 });
    console.log('Report submitted and modal updated to success state');
    
    console.log('All end-to-end interactions succeeded with zero UI blockages.');
  });
});

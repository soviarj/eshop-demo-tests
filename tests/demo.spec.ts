import { test, expect } from '@playwright/test';
import { LOGIN_URL, USER_NAME, USER_PASSWORD } from './constants';
import { loginWithSavingCookies } from './functions';

test('User Authentification', async ({ page }) => {
  await loginWithSavingCookies(page, LOGIN_URL, USER_NAME, USER_PASSWORD);
});

test.describe('demo', () => {
  test.use({storageState: 'tests/session.json'})
    test('Zmena jazyka', async ({ page }) => {
        await page.goto(LOGIN_URL);
        const language = page.locator('xpath=//*[@id="_desktop_language_selector"]/div/div/button/span');
        
        try {
          await expect(language).toHaveText('Čeština');
          console.log('Nastavená CS, idem zmeniť jazyk na EN');
          await page.locator('[id="_desktop_language_selector"]').click();
          await page.getByRole('link', { name: 'English' }).click();
        } catch {
          console.log('Nastavená EN, idem zmeniť jazyk na CS');
          await page.locator('[id="_desktop_language_selector"]').click();
          await page.getByRole('link', { name: 'Čeština' }).click();
        }
    });

    test('Zmena meny', async ({ page }) => {
        await page.goto(LOGIN_URL);
        const language = page.locator('xpath=//*[@id="_desktop_language_selector"]/div/div/button/span');
        
        try {
          await expect(language).toHaveText('Čeština');
          console.log('Nastavená CS, idem zmeniť jazyk na EN');
          await page.locator('[id="_desktop_language_selector"]').click();
          await page.getByRole('link', { name: 'English' }).click();
        } catch {
          console.log('Nastavená EN, idem zmeniť jazyk na CS');
          await page.locator('[id="_desktop_language_selector"]').click();
          await page.getByRole('link', { name: 'Čeština' }).click();
        }
    });

});



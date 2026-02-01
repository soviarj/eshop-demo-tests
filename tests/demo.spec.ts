import { test, expect } from '@playwright/test';
import { LOGIN_URL, USER_NAME, USER_PASSWORD } from './constants';
import { loginWithSavingCookies } from './functions';

test('User Authentification', async ({ page }) => {
  await loginWithSavingCookies(page, LOGIN_URL, USER_NAME, USER_PASSWORD);
});

test.describe('demo', () => {
  test.use({storageState: 'tests/.auth/session.json'})
    test('Overenie prihláseného uživateľa', async ({ page }) => {
        await page.goto(LOGIN_URL);
        const odhlasitButton = page.locator('.logout.hidden-sm-down');
        await expect.soft(odhlasitButton).toBeVisible({timeout : 2000});
    });

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
        const overMenu = page.locator('.expand-more._gray-darker');
        const text = await overMenu.innerText();
        const ceskaKoruna = page.locator('[title="Česká koruna"]');
        const euro = page.locator('[title="Euro"]');
       
        let aktualnaMena = ''
        if (text.includes('CZK Kč')) {
          aktualnaMena = 'CZK'
          console.log('Aktuálne nastavená mena je CZK');
        } else if (text.includes('EUR €')) {
          aktualnaMena = 'EUR'
          console.log('Aktuálne nastavená mena je EUR');
        } else {
          aktualnaMena = 'USD'
          console.log('Aktuálne nastavená mena je USD');
        }

        if (aktualnaMena === 'CZK') {
          console.log('Mením menu na EUR');
          await overMenu.click();
          await euro.click();
          await page.waitForTimeout(500)
          await expect(overMenu).toContainText('EUR €');
        } else {
          console.log('Mením menu na CZK');
          await overMenu.click();
          await ceskaKoruna.click();
          await page.waitForTimeout(500)
          await expect(overMenu).toContainText('CZK Kč');
        }

    });

});



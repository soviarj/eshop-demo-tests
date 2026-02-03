import { test, expect } from '@playwright/test';
import { LOGIN_URL, USER_NAME, USER_PASSWORD } from './constants';
import { loginWithSavingCookies } from './functions';

test('Autentifikácia užívateľa s uložením cookies', async ({ page }) => {
  await loginWithSavingCookies(page, LOGIN_URL, USER_NAME, USER_PASSWORD);
});

test.describe('Demo Test Suite: ', () => {
  test.use({storageState: 'tests/.auth/session.json'})

    test('Overenie úspešne prihláseného uživateľa', async ({ page }) => {
        await page.goto(LOGIN_URL);
        const odhlasitButton = page.locator('.logout.hidden-sm-down');
        await expect.soft(odhlasitButton).toBeVisible({timeout : 2000});
    });

    test('Zmena jazyka e-shopu', async ({ page }) => {
        await page.goto(LOGIN_URL);
        const language = page.locator('xpath=//*[@id="_desktop_language_selector"]/div/div/button/span');
        const zistiJazyk = await language.innerText();

        if (zistiJazyk.includes('Čeština')) {
          console.log('Nastavená CS, idem zmeniť jazyk na EN');
          await page.locator('[id="_desktop_language_selector"]').click();
          await page.getByRole('link', { name: 'English' }).click();
          await expect(language).toContainText('English', { timeout: 500 });
          console.log('Zmena jazyka na angličtinu bola úspešná.');
        } else {
          console.log('Nastavená EN, idem zmeniť jazyk na CS');
          await page.locator('[id="_desktop_language_selector"]').click();
          await page.getByRole('link', { name: 'Čeština' }).click();
          await expect(language).toContainText('Čeština', { timeout: 500 });
          console.log('Zmena jazyka na češtinu bola úspešná.');
        }
    });

    test('Zmena meny používanej v e-shope', async ({ page }) => {
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
          await expect(overMenu).toContainText('EUR €', { timeout: 500 });
        } else {
          console.log('Mením menu na CZK');
          await overMenu.click();
          await ceskaKoruna.click();
          await expect(overMenu).toContainText('CZK Kč', { timeout: 500 });
        }
    });

    test('Overenie úspešného vloženia položky do košíka', async ({ page }) => {
        await page.goto(LOGIN_URL);
        const kosik = page.locator('.cart-products-count').first();
        
        const getCartCount = async () => {
          const text = await kosik.innerText();
          return Number(text.replace(/[()]/g, ''));
        };

        const stavPred = await getCartCount();
        console.log('Aktuálny stav položiek v nákupnom košíku je:', stavPred);

        const prvaPolozkaNaEshope = page.locator('[data-id-product="1"]').first();
        const pridajDoKosika = page.getByRole('button', { name: ' Přidat do košíku' });
        const produktUspesnePridany = page.getByRole('heading', { name: ' Produkt byl úspěšně přidán' })
        
        await prvaPolozkaNaEshope.click();

        await expect(async () => {
          await pridajDoKosika.click();
          await expect(produktUspesnePridany).toBeVisible();
        }).toPass({ timeout: 5000 });
        
        await expect(produktUspesnePridany).toBeVisible({timeout : 3000});
        await page.getByRole('button', { name: 'Pokračovat v nákupu' }).click();

        await expect(kosik).not.toHaveText(`(${stavPred})`);

        const stavPo = await getCartCount();
        console.log('Košík po:', stavPo);

        expect(stavPo).toBe(stavPred + 1);
    });

});



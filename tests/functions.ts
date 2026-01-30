import { expect, Page } from '@playwright/test';

export async function loginWithSavingCookies (page: Page, LOGIN_URL:string, USER_NAME:string, USER_PASSWORD:string) {
      const logout = page.locator('.logout.hidden-sm-down');
      await page.goto(LOGIN_URL);
      await page.getByRole('link', { name: ' Přihlásit se' }).click();
      await page.getByRole('textbox', { name: 'E-mail' }).fill(USER_NAME);
      await page.getByRole('textbox', { name: 'Pole pro heslo' }).fill(USER_PASSWORD);
      await page.getByRole('button', { name: 'Přihlásit se' }).click();
      await expect(logout).toBeVisible({timeout : 2000});
      await page.context().storageState({path: './tests/session.json'});
      await page.waitForTimeout(500);
}
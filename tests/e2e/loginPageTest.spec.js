import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('Verify all login page elements are visible', async ({page}) => {

    const fullPage = page.locator('body > .container');

    await expect.soft(page.getByRole('link').first()).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Registrirajte se sada' })).toBeVisible();
    await expect.soft(page.getByRole('link').nth(2)).toBeVisible();
    await expect.soft(page.getByLabel('Email')).toBeVisible();
    await expect.soft(page.getByLabel('Lozinka')).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Zaboravili ste svoju lozinku?' })).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Prijava' })).toBeVisible();
    await expect.soft(page.getByText('Zapamti me')).toBeVisible();
    await expect(fullPage).toHaveScreenshot('loginPage.png');

});

test('Verify all validation messages are displayed', async ({page}) => {

    const fullPage = page.locator('body > .container');

    await page.getByRole('button', { name: 'Prijava' }).click();
    await expect.soft(page.getByText('Molimo unesite email')).toBeVisible();
    await expect.soft(page.getByText('Molimo unesite lozinku')).toBeVisible();
    await expect.soft(fullPage).toHaveScreenshot('emptyInputValidation.png');
    await page.getByLabel('Email').fill('invalidEmail');
    await page.getByRole('button', { name: 'Prijava' }).click();
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await expect.soft(page.getByText('Molimo unesite lozinku')).toBeVisible();
    await page.getByLabel('Email').fill('invalidEmail@');
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await expect.soft(page.getByText('Molimo unesite lozinku')).toBeVisible();
    await page.getByLabel('Email').fill('invalidEmail@playwright');
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await expect.soft(page.getByText('Molimo unesite lozinku')).toBeVisible();
    await page.getByLabel('Email').fill('invalidEmail@playwright.');
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await expect.soft(page.getByText('Molimo unesite lozinku')).toBeVisible();
    await expect(fullPage).toHaveScreenshot('invalidEmailFormatValidation.png');

});

test('Page language converter functionality tets', async ({page}) => {

    const fullPage = page.locator('body > .container');

    await page.getByRole('link').nth(2).click();
    await expect.soft(page.getByText('Not a member? Sign up now')).toBeVisible();
    await expect.soft(page.getByRole('heading', { name: 'Sign in for Rentlio' })).toBeVisible();
    await expect.soft(page.getByText('Password Forgot your password?')).toBeVisible();
    await expect.soft(page.getByText('Sign in Remember me')).toBeVisible();
    await expect.soft(page.getByText('Technology and happy guests')).toBeVisible();
    await expect.soft(fullPage).toHaveScreenshot('loginPageEnglish.png');
    await page.getByRole('link').nth(2).click();
    await expect.soft(page.getByText('Ne koristite Rentlio? Registrirajte se sada')).toBeVisible();
    await expect.soft(page.getByRole('heading', { name: 'Prijavite se u Rentlio' })).toBeVisible();
    await expect.soft(page.getByText('Lozinka Zaboravili ste svoju')).toBeVisible();
    await expect.soft(page.getByText('Prijava Zapamti me')).toBeVisible();
    await expect.soft(page.getByText('Tehnologija i sretni gosti')).toBeVisible();
    await expect(fullPage).toHaveScreenshot('loginPage.png');

});

test('Verify that click on the page logo redirects to the home page', async ({page}) => {

    const fullPage = page.locator('body > .container');

    await page.getByRole('link', { name: 'Registrirajte se sada' }).click();
    await expect.soft(fullPage).toHaveScreenshot('registerPage.png');
    await page.getByRole('link').first().click();
    await expect.soft(fullPage).toHaveScreenshot('loginPage.png');
    await page.getByRole('link', { name: 'Zaboravili ste svoju lozinku?' }).click();
    await expect.soft(fullPage).toHaveScreenshot('passwordRecoveryPage.png');
    await page.getByRole('link').first().click();
    await expect(fullPage).toHaveScreenshot('loginPage.png');

});

test('Verify that user can login with valid credentials', async ({page}) => {

    await page.getByLabel('Email').fill('mario.shimon87@gmail.com');
    await page.getByLabel('Lozinka').fill('Zeus.123');
    await page.getByRole('button', { name: 'Prijava' }).click();
    await page.getByText('MŠ Postavke računaPostavke i').click();
    await page.getByRole('link', { name: 'Postavke računa Postavke i' }).click();
    await expect.soft(page.locator('#firstName')).toHaveValue('Mario');
    await expect.soft(page.getByLabel('Prezime')).toHaveValue('Šimon');
    await expect.soft(page.locator('div').filter({ hasText: /^Hrvatska$/ }).nth(1)).toContainText('Hrvatska');
    await expect(page.getByLabel('Telefon')).toHaveValue('0123456789');

});

import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('Verify all registration page elements are visible', async ({page}) => {
    
    const fullPage = page.locator('body > .container');

    await page.getByRole('link', { name: 'Registrirajte se sada' }).click();
    await expect.soft(page.getByRole('link').first()).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Prijava' })).toBeVisible();
    await expect.soft(page.getByLabel('Ime i prezime')).toBeVisible();
    await expect.soft(page.getByLabel('Email')).toBeVisible();
    await expect.soft(page.getByLabel('Lozinka')).toBeVisible();
    await expect.soft(page.locator('#step-one div').filter({ hasText: 'Nastavi' })).toBeVisible();
    await expect(fullPage).toHaveScreenshot('registerPage.png');

});

test('Verify all validation messages are displayed', async ({page}) => {

    const fullPage = page.locator('body > .container');

    await page.getByRole('link', { name: 'Registrirajte se sada' }).click();
    await page.getByLabel('Ime i prezime').fill('John Doe');
    await page.getByLabel('Email').fill('invalidAddress');
    await page.getByLabel('Lozinka').fill('short');
    await page.getByRole('button', { name: 'Nastavi' }).click();
    await page.locator('.trigger').first().click();
    await page.getByText('Hotelom').click();
    await page.locator('div:nth-child(2) > .custom-select-wrapper > .custom-select > .trigger').click();
    await page.getByText('1-5').click();
    await page.locator('div:nth-child(3) > div > .custom-select-wrapper > .custom-select > .trigger').click();
    await page.getByPlaceholder('Pretraga...').fill('croatia');
    await page.getByText('Croatia').click();
    await page.getByLabel('Kontakt broj').fill('123456789');
    await page.getByLabel('Registracijom prihvaćam').click();
    await expect.soft(fullPage).toHaveScreenshot('registration2ndStepPage.png');
    await page.getByRole('button', { name: 'Napravite račun' }).click();
    await expect(page.getByText('Unešena email adresa nije ispravna')).toBeVisible();
    await expect(page.getByText('Lozinka je prekratka.')).toBeVisible();
    await expect.soft(fullPage).toHaveScreenshot('invalidInputValidation.png');
    await page.getByLabel('Email').fill('mario.shimon87@gmail.com');
    await page.getByLabel('Lozinka').fill('long.123');
    await page.getByRole('button', { name: 'Nastavi' }).click();
    await page.getByLabel('Registracijom prihvaćam').click();
    await page.getByRole('button', { name: 'Napravite račun' }).click();
    await expect.soft(fullPage).toHaveScreenshot('existingUserValidation.png');

});

test('Verify user data is displayed correctly after registration and login', async ({page}) => {

    const generateRandomString = function() {
        return Math.random().toString(16).substring(2, 16);
    };
    const randomEmail = `email${generateRandomString()}@gmail.com`;

    await page.getByRole('link', { name: 'Registrirajte se sada' }).click();
    await page.getByLabel('Ime i prezime').fill('John Doe');
    await page.getByLabel('Email').fill(randomEmail);
    await page.getByLabel('Lozinka').fill('long.123');
    await page.getByRole('button', { name: 'Nastavi' }).click();
    await page.locator('.trigger').first().click();
    await page.getByText('Hotelom').click();
    await page.locator('div:nth-child(2) > .custom-select-wrapper > .custom-select > .trigger').click();
    await page.getByText('1-5').click();
    await page.locator('div:nth-child(3) > div > .custom-select-wrapper > .custom-select > .trigger').click();
    await page.getByPlaceholder('Pretraga...').fill('croatia');
    await page.getByText('Croatia').click();
    await page.getByLabel('Kontakt broj').fill('123456789');
    await page.getByLabel('Registracijom prihvaćam').click();
    await page.getByRole('button', { name: 'Napravite račun' }).click();
    await page.getByText('JD Postavke računaPostavke i').click();
    await page.getByRole('link', { name: 'Postavke računa Postavke i' }).click();
    await expect.soft(page.locator('#firstName')).toHaveValue('John');
    await expect.soft(page.getByLabel('Prezime')).toHaveValue('Doe');
    await expect.soft(page.locator('div').filter({ hasText: /^Hrvatska$/ }).nth(1)).toContainText('Hrvatska');
    await expect(page.getByLabel('Telefon')).toHaveValue('+385123456789');

});

test('Page language converter functionality tets', async ({page}) => {

    const fullPage = page.locator('body > .container');

    await page.getByRole('link', { name: 'Registrirajte se sada' }).click();
    await page.getByRole('link').nth(2).click();
    await expect(page.getByText('Already a member? Sign in')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Start your free trial' })).toBeVisible();
    await expect(page.getByText('Thanks to Rentlio mobile app, we have full control over reservations, rates, and guests at any given moment.')).toBeVisible();
    await expect.soft(fullPage).toHaveScreenshot('registerPageEnglish.png');
    await page.getByLabel('Full name').fill('John Doe');
    await page.getByLabel('Email Address').fill('random@gmail.com');
    await page.getByLabel('Password').fill('random.123');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'Tell us more about yourself' })).toBeVisible();
    await page.locator('.trigger').first().click();
    await expect(page.getByText('Hotel Vacation Rental Hostel Multi Properties Other Property Type')).toBeVisible();
    await page.locator('.trigger').first().click();
    await expect.soft(fullPage).toHaveScreenshot('registerPage2ndStepEnglish.png');


});
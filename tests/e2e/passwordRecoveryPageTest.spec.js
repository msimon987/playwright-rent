import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('Verify all password recovery page elements are displayed', async ({page}) => {

    const fullPage = page.locator('body > .container');

    await page.getByRole('link', { name: 'Zaboravili ste svoju lozinku?' }).click();
    await expect.soft(page.getByRole('link').first()).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Registrirajte se sada' })).toBeVisible();
    await expect.soft(page.getByLabel('Email')).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Pošaljite upute za' })).toBeVisible();
    await page.getByLabel('Email').fill('mario.shimon87@gmail.com');
    await expect.soft(fullPage).toHaveScreenshot('passwordRecoveryPage.png');
    await page.getByRole('button', { name: 'Pošaljite upute za' }).click();
    await expect.soft(page.getByRole('link').first()).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Vrati me na naslovnicu' })).toBeVisible();
    await expect(fullPage).toHaveScreenshot('passwordRecoveryPage2ndStep.png');

});

test('verify password recovery validation messages are displayed', async ({page}) => {

    const fullPage = page.locator('body > .container');

    await page.getByRole('link', { name: 'Zaboravili ste svoju lozinku?' }).click();
    await page.getByRole('button', { name: 'Pošaljite upute za' }).click();
    await expect.soft(page.getByText('Molimo unesite email')).toBeVisible();
    await expect.soft(fullPage).toHaveScreenshot('emptyInputValidation.png');
    await page.getByLabel('Email').fill('invalidInput');
    await page.getByRole('button', { name: 'Pošaljite upute za' }).click();
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await page.getByLabel('Email').fill('invalidInput@');
    await page.getByRole('button', { name: 'Pošaljite upute za' }).click();
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await page.getByLabel('Email').fill('invalidInput@test');
    await page.getByRole('button', { name: 'Pošaljite upute za' }).click();
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await page.getByLabel('Email').fill('invalidInput@test.');
    await page.getByRole('button', { name: 'Pošaljite upute za' }).click();
    await expect(page.getByText('Unešena email adresa nije')).toBeVisible();
    await expect.soft(fullPage).toHaveScreenshot('invalidInputValidation.png');
    await page.getByLabel('Email').fill('nonexist@gmail.com');
    await page.getByRole('button', { name: 'Pošaljite upute za' }).click();
    await expect.soft(page.getByText('Ne postoji korisnički račun')).toBeVisible();
    await expect(fullPage).toHaveScreenshot('nonexistingUserValidation.png');

});

test('Verify that a success message is displayed after valid input', async ({page}) => {

    const fullPage = page.locator('body > .container');

    await page.getByRole('link', { name: 'Zaboravili ste svoju lozinku?' }).click();
    await page.getByLabel('Email').fill('mario.shimon87@gmail.com');
    await page.getByRole('button', { name: 'Pošaljite upute za' }).click();
    await expect.soft(page.getByText('Upute za promjenu lozinke poslane su na vašu mail adresu')).toBeVisible();
    await expect.soft(fullPage).toHaveScreenshot('recoveryInstructionsSent.png');
    await page.getByRole('link', { name: 'Vrati me na naslovnicu' }).click();
    await expect(fullPage).toHaveScreenshot('loginPage.png');

});



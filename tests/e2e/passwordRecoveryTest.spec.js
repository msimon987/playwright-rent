import {test, expect} from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('Verify all password recovery page elements are displayed', async ({page}) => {

    const homePage = new HomePage(page);

    await homePage.passwordRecoveryLink.click();
    await expect.soft(homePage.pageLogo).toBeVisible();
    await expect.soft(homePage.signUpNowLink).toBeVisible();
    await expect.soft(homePage.emailInputField).toBeVisible();
    await expect.soft(homePage.sendPasswordRecoveryRequestBtn).toBeVisible();
    await homePage.emailInputField.fill('mariosimon@gmail.com');
    await expect.soft(homePage.fullPage).toHaveScreenshot('passwordRecoveryPage.png');
    await homePage.sendPasswordRecoveryRequestBtn.click();
    await expect.soft(homePage.pageLogo).toBeVisible();
    await expect.soft(homePage.logInPageRedirectBtn).toBeVisible();
    await expect(homePage.fullPage).toHaveScreenshot('passwordRecoveryPage2ndStep.png');

});

test('verify password recovery validation messages are displayed', async ({page}) => {

    const homePage = new HomePage(page);

    await homePage.passwordRecoveryLink.click();
    await homePage.sendPasswordRecoveryRequestBtn.click();
    await expect.soft(page.getByText('Molimo unesite email')).toBeVisible();
    await expect.soft(homePage.fullPage).toHaveScreenshot('emptyInputValidation.png');
    await homePage.passwordRecoveryRequestSend('invalidInput');
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await homePage.passwordRecoveryRequestSend('invalidInput@');
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await homePage.passwordRecoveryRequestSend('invalidInput@test');
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await homePage.passwordRecoveryRequestSend('invalidInput@test.');
    await expect(page.getByText('Unešena email adresa nije')).toBeVisible();
    await expect.soft(homePage.fullPage).toHaveScreenshot('invalidInputValidation.png');
    await homePage.passwordRecoveryRequestSend('nonexist@gmail.com');
    await expect.soft(page.getByText('Ne postoji korisnički račun')).toBeVisible();
    await expect(homePage.fullPage).toHaveScreenshot('nonexistingUserValidation.png');

});

test('Verify that a success message is displayed after valid input', async ({page}) => {

    const homePage = new HomePage(page);

    await homePage.passwordRecoveryLink.click();
    await homePage.passwordRecoveryRequestSend('mariosimon@gmail.com');
    await expect.soft(page.getByText('Upute za promjenu lozinke poslane su na vašu mail adresu')).toBeVisible();
    await expect.soft(homePage.fullPage).toHaveScreenshot('recoveryInstructionsSent.png');
    await homePage.logInPageRedirectBtn.click();
    await expect(homePage.fullPage).toHaveScreenshot('loginPage.png');

});



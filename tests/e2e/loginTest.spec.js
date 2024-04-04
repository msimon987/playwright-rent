import {test, expect} from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { AccountSettings } from './pages/AccountSettingsPage';

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('Verify all login page elements are visible', async ({page}) => {

    const homePage = new HomePage(page);

    await expect.soft(homePage.pageLogo).toBeVisible();
    await expect.soft(homePage.signUpNowLink).toBeVisible();
    await expect.soft(homePage.languageConverter).toBeVisible();
    await expect.soft(homePage.emailInputField).toBeVisible();
    await expect.soft(homePage.passwordInputField).toBeVisible();
    await expect.soft(homePage.passwordRecoveryLink).toBeVisible();
    await expect.soft(homePage.signInBtn).toBeVisible();
    await expect.soft(homePage.remeberMeBtn).toBeVisible();
    await expect(homePage.fullPage).toHaveScreenshot('loginPage.png',{ maxDiffPixelRatio: 0.01 });

});

test('Verify all validation messages are displayed', async ({page}) => {
    
    const homePage = new HomePage(page);

    await homePage.signInBtn.click();
    await expect.soft(page.getByText('Molimo unesite email')).toBeVisible();
    await expect.soft(page.getByText('Molimo unesite lozinku')).toBeVisible();
    await expect.soft(homePage.fullPage).toHaveScreenshot('emptyInputValidation.png');
    await homePage.emailInputField.fill('invalidEmail');
    await homePage.signInBtn.click();
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await expect.soft(page.getByText('Molimo unesite lozinku')).toBeVisible();
    await homePage.emailInputField.fill('invalidEmail@');
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await expect.soft(page.getByText('Molimo unesite lozinku')).toBeVisible();
    await homePage.emailInputField.fill('invalidEmail@playwright');
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await expect.soft(page.getByText('Molimo unesite lozinku')).toBeVisible();
    await homePage.emailInputField.fill('invalidEmail@playwright.');
    await expect.soft(page.getByText('Unešena email adresa nije')).toBeVisible();
    await expect.soft(page.getByText('Molimo unesite lozinku')).toBeVisible();
    await expect(homePage.fullPage).toHaveScreenshot('invalidEmailFormatValidation.png');

});

test('Page language converter functionality tets', async ({page}) => {

    const homePage = new HomePage(page);

    await homePage.languageConverter.click();
    await homePage.signInBtn.click();
    await expect.soft(page.getByText('Not a member? Sign up now')).toBeVisible();
    await expect.soft(page.getByRole('heading', { name: 'Sign in for Rentlio' })).toBeVisible();
    await expect.soft(page.getByText('Password Forgot your password?')).toBeVisible();
    await expect.soft(page.getByText('Sign in Remember me')).toBeVisible();
    await expect.soft(page.getByText('Technology and happy guests')).toBeVisible();
    await expect.soft(page.getByText('Email is required')).toBeVisible();
    await expect.soft(page.getByText('The password is required')).toBeVisible();
    await expect.soft(homePage.fullPage).toHaveScreenshot('loginPageEnglish.png');
    await homePage.languageConverter.click();
    await expect.soft(page.getByText('Ne koristite Rentlio? Registrirajte se sada')).toBeVisible();
    await expect.soft(page.getByRole('heading', { name: 'Prijavite se u Rentlio' })).toBeVisible();
    await expect.soft(page.getByText('Lozinka Zaboravili ste svoju')).toBeVisible();
    await expect.soft(page.getByText('Prijava Zapamti me')).toBeVisible();
    await expect.soft(page.getByText('Tehnologija i sretni gosti')).toBeVisible();
    await expect(homePage.fullPage).toHaveScreenshot('loginPage.png');

});

test('Verify that click on the page logo redirects to the home page', async ({page}) => {

    const homePage = new HomePage(page);

    await homePage.signUpNowLink.click();
    await expect.soft(homePage.fullPage).toHaveScreenshot('registerPage.png');
    await homePage.pageLogo.click();
    await expect.soft(homePage.fullPage).toHaveScreenshot('loginPage.png');
    await homePage.passwordRecoveryLink.click();
    await expect.soft(homePage.fullPage).toHaveScreenshot('passwordRecoveryPage.png');
    await homePage.pageLogo.click();
    await expect(homePage.fullPage).toHaveScreenshot('loginPage.png');

});

test('Verify that user can login and logout with valid credentials', async ({page}) => {

    const homePage = new HomePage(page);
    const accountSettingsPage = new AccountSettings(page);

    await homePage.logIn('mariosimon2@gmail.com', 'Zeus.123');
    await accountSettingsPage.userMenu.click();
    await accountSettingsPage.accountSettingsLink.click();
    await expect.soft(accountSettingsPage.firstNameInputField).toHaveValue('Mario');
    await expect.soft(accountSettingsPage.lastNameInputField).toHaveValue('Šimon');
    await expect.soft(accountSettingsPage.stateSelectDropdown).toContainText('Hrvatska');
    await expect.soft(accountSettingsPage.phoneInputField).toHaveValue('0123456789');
    await accountSettingsPage.userMenu.click();
    await accountSettingsPage.signOutBtn.click();
    await expect(homePage.fullPage).toHaveScreenshot('loginPage.png');

});

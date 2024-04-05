import {test, expect} from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { AccountSettings } from './pages/AccountSettingsPage';

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('Verify all registration page elements are visible', async ({page}) => {
    
    const homePage = new HomePage(page);

    await homePage.signUpNowLink.click();
    await expect.soft(homePage.pageLogo).toBeVisible();
    await expect.soft(homePage.signInBtn).toBeVisible();
    await expect.soft(homePage.fullNameInputField).toBeVisible();
    await expect.soft(homePage.emailInputField).toBeVisible();
    await expect.soft(homePage.passwordInputField).toBeVisible();
    await expect.soft(homePage.continueRegistrationBtn).toBeVisible();
    await expect.soft(homePage.fullPage).toHaveScreenshot('registerPage.png');
    await homePage.fullNameInputField.fill('John Doe');
    await homePage.emailInputField.fill('johnDoe@gmail.com');
    await homePage.passwordInputField.fill('password.123');
    await homePage.continueRegistrationBtn.click();
    await expect.soft(homePage.iManageDropdown).toBeVisible();
    await expect.soft(homePage.accommodationNumberDropdown).toBeVisible();
    await expect.soft(homePage.countrySelectDropdown).toBeVisible();
    await expect.soft(homePage.phoneInputField).toBeVisible();
    await expect.soft(homePage.acceptTermsCheckBox).toBeVisible();
    await expect.soft(homePage.createAccountBtn).toBeVisible();
    await expect.soft(homePage.fullPage).toHaveScreenshot('registration2ndStepPage.png');

});

test('Verify all validation messages are displayed', async ({page}) => {

    const homePage = new HomePage(page);

    await homePage.signUpNowLink.click();
    await homePage.fullNameInputField.fill('John Doe');
    await homePage.emailInputField.fill('invalidAddress');
    await homePage.passwordInputField.fill('short');
    await homePage.continueRegistrationBtn.click();
    await homePage.iManageSelect('Hotelom');
    await homePage.accommodationUnitNumberSelect('1-5');
    await homePage.countrySelect('Croatia');
    await homePage.phoneInputField.fill('123456789');
    await homePage.acceptTermsCheckBox.click();
    await expect.soft(homePage.fullPage).toHaveScreenshot('registration2ndStepPage2.png',{ maxDiffPixelRatio: 0.01 });
    await homePage.createAccountBtn.click();
    await expect.soft(page.getByText('Unešena email adresa nije ispravna')).toBeVisible();
    await expect.soft(page.getByText('Lozinka je prekratka.')).toBeVisible();
    await expect.soft(homePage.fullPage).toHaveScreenshot('invalidInputValidation.png');
    await homePage.emailInputField.fill('mariosimon@gmail.com');
    await homePage.passwordInputField.fill('long.123');
    await homePage.continueRegistrationBtn.click();
    await homePage.acceptTermsCheckBox.click();
    await homePage.createAccountBtn.click();
    await expect(homePage.fullPage).toHaveScreenshot('existingUserValidation.png');

});

test('Verify user data is displayed correctly after registration and login', async ({page}) => {

    const homePage = new HomePage(page);
    const accountSettingsPage = new AccountSettings(page);
    const generateRandomString = function() {
        return Math.random().toString(16).substring(2, 16);
    };
    const randomEmail = `email${generateRandomString()}@gmail.com`;

    await homePage.signUpNowLink.click();
    await homePage.fullNameInputField.fill('John Doe');
    await homePage.emailInputField.fill(randomEmail);
    await homePage.passwordInputField.fill('long.123');
    await homePage.continueRegistrationBtn.click();
    await homePage.iManageSelect('Hotelom');
    await homePage.accommodationUnitNumberSelect('1-5');
    await homePage.countrySelect('Croatia');
    await homePage.phoneInputField.fill('123456789');
    await homePage.acceptTermsCheckBox.click();
    await homePage.createAccountBtn.click();
    await accountSettingsPage.userMenu.click({timeout: 20000});
    await accountSettingsPage.accountSettingsLink.click();
    await expect.soft(accountSettingsPage.firstNameInputField).toHaveValue('John');
    await expect.soft(accountSettingsPage.lastNameInputField).toHaveValue('Doe');
    await expect.soft(accountSettingsPage.stateSelectDropdown).toContainText('Hrvatska');
    await expect.soft(accountSettingsPage.phoneInputField).toHaveValue('+385123456789');
    await expect(accountSettingsPage.accountSettingsPage).toHaveScreenshot('newRegistrationAccountSettingsPage.png');

});

test('Page language converter functionality tets', async ({page}) => {

    const homePage = new HomePage(page);

    await homePage.signUpNowLink.click();
    await homePage.languageConverter.click();
    await expect.soft(page.getByText('Already a member? Sign in')).toBeVisible();
    await expect.soft(page.getByRole('heading', { name: 'Start your free trial' })).toBeVisible();
    await expect.soft(page.getByText('Thanks to Rentlio mobile app, we have full control over reservations, rates, and guests at any given moment.')).toBeVisible();
    await expect.soft(homePage.fullPage).toHaveScreenshot('registerPageEnglish.png');
    await homePage.fullNameInputField.fill('John Doe');
    await homePage.emailInputField.fill('random@gmail.com');
    await homePage.passwordInputField.fill('random.123');
    await homePage.continueRegistrationBtn.click();
    await expect(page.getByRole('heading', { name: 'Tell us more about yourself' })).toBeVisible();
    await homePage.iManageDropdown.click();
    await expect(page.getByText('Hotel Vacation Rental Hostel Multi Properties Other Property Type')).toBeVisible();
    await homePage.iManageDropdown.click();
    await expect.soft(homePage.fullPage).toHaveScreenshot('registerPage2ndStepEnglish.png');

});
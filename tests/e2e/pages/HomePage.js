const {expect} = require('@playwright/test');

exports.HomePage = class HomePage {

    constructor(page) {

        this.page = page;
        this.fullPage = page.locator('body > .container');
        this.pageLogo = page.getByRole('link').first();
        this.signUpNowLink = page.locator('.sign-up > a:nth-of-type(1)');
        this.languageConverter = page.getByRole('link').nth(2);
        this.emailInputField = page.locator('input#email');
        this.passwordInputField = page.locator('input#password');
        this.passwordRecoveryLink = page.locator('.forgot-password');
        this.signInBtn = page.locator('.btn.btn-small');
        this.remeberMeBtn = page.locator('input#remember');
        this.sendPasswordRecoveryRequestBtn = page.locator('.btn.btn-large');
        this.logInPageRedirectBtn = page.locator('.btn.btn-large');
        this.signInLink = page.locator('.sign-up > a:nth-of-type(1)');
        this.fullNameInputField = page.locator('input#fullName');
        this.continueRegistrationBtn = page.locator('button#continue-btn');
        this.iManageDropdown = page.locator('div#step-two > div:nth-of-type(1)  .custom-select-wrapper.mr-60.w-340px > .custom-select');
        this.accommodationNumberDropdown = page.locator("[class='custom-select-wrapper w-340px'] .custom-select");
        this.countrySelectDropdown = page.locator('div#step-two > div:nth-of-type(2) .custom-select');
        this.countrySearchField = page.locator('input#search-input');
        this.phoneInputField = page.locator('input#phone');
        this.acceptTermsCheckBox = page.locator('input#termsCheckbox');
        this.createAccountBtn = page.locator('button#createAccountButton');

    };

    async logIn(email, password) {
        await this.emailInputField.fill(email);
        await this.passwordInputField.fill(password);
        await this.signInBtn.click();
    };

    async passwordRecoveryRequestSend (email) {
        await this.emailInputField.fill(email);
        await this.sendPasswordRecoveryRequestBtn.click();
    };

    async iManageSelect(accommodationType) {
        await this.iManageDropdown.click();
        await this.page.getByText(accommodationType).click();
    };

    async accommodationUnitNumberSelect(numberRange) {
        await this.accommodationNumberDropdown.click();
        await this.page.getByText(numberRange).click();
    };

    async countrySelect(countryName) {
        await this.countrySelectDropdown.click();
        await this.countrySearchField.fill(countryName);
        await this.page.getByText(countryName).click();
    };

};
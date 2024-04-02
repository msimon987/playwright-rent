const {expect} = require('@playwright/test');

exports.AccountSettings = class AccountSettings {

    constructor(page) {

        this.page = page;
        this.accountSettingsPage = page.locator('div#owner');
        this.profilePictureUploadSection = page.locator('div#avatarContainer');
        this.passwordChangeSection = page.locator('form#ownerChangePassword');
        this.userMenu = page.locator('.username > .user_menu');
        this.accountSettingsLink = page.locator('li:nth-of-type(1) > .navigateToUrl');
        this.firstNameInputField = page.locator('input#firstName');
        this.lastNameInputField = page.locator('input#lastName');
        this.ownerAddressInputField = page.locator("#ownerEdit [name='address']");
        this.ownerPostalCodeInputField = page.locator("#ownerEdit [name='postalCode']");
        this.ownerCityInputField = page.locator('input#city');
        this.stateSelectDropdown = page.locator('form#ownerEdit > div:nth-of-type(3) .full.has-items.has-options.items.selectize-input');
        this.phoneInputField = page.locator('input#phone');
        this.vatNumberInputField = page.locator('input#legalId');
        this.companyNameInputField = page.locator('input#paymentName');
        this.companyAddressInputField = page.locator('input#paymentAddress');
        this.companyPostalPostalCodeInputField = page.locator('input#paymentPostalCode');
        this.companyCityInputField = page.locator('input#paymentCity');
        this.companyStateSelectDropdown = page.locator('div:nth-of-type(5) > div:nth-of-type(3) .plugin-label_for.selectize-control.single');
        this.companyVatInputField = page.locator('input#paymentLegalId');
        this.uiLanguageDropdown = page.locator('div:nth-of-type(6) > div:nth-of-type(1) > .select > .plugin-label_for.selectize-control.single');
        this.timezoneDropdown = page.locator('div:nth-of-type(2) > .select > .plugin-label_for.selectize-control.single');
        this.hrkNumberFormat = page.locator('div:nth-of-type(1) > span');
        this.usdNumberFormat = page.locator('div#numberFormat > div:nth-of-type(2) > span');
        this.saveChangesBtn = page.locator('button#ownerUpdateBtn > .ladda-label');
        this.successfulUpdateMessage = page.locator('div#notify > .noCloseAction.success');
        this.profilePictureUploadBtn = page.locator('button#uploadAvatar');
        this.saveImageBtn = page.locator('button#upload-result');
        this.profilePictureUploadPopup = page.locator('.lvl_1.popupVisible.popupWrap');
        this.signOutBtn = page.locator('a#ownerSignOutButton');
        this.passwordChangeBtn = page.locator('form#ownerChangePassword .blue.btn.show');
        this.oldPasswordInputField = page.locator('input#oldPassword');
        this.newPassswordInputField = page.locator('input#newPassword');
        this.repeatNewPasswordInputField = page.locator('input#newPasswordAgain');
        this.confirmPasswordChangeBtn = page.locator('button#changePasswordBtn');

    };

    async logIn(email, password) {
        await this.page.locator('input#email').fill(email);
        await this.page.locator('input#password').fill(password);
        await this.page.locator('.btn.btn-small').click();
    };

    async ownerDataUpdate(name, lastName, address, postalCode, city, state, phone, vat) {

        await this.firstNameInputField.fill(name);
        await this.lastNameInputField.fill(lastName);
        await this.ownerAddressInputField.fill(address);
        await this.ownerPostalCodeInputField.fill(postalCode);
        await this.ownerCityInputField.fill(city);
        await this.stateSelectDropdown.click();
        await this.page.getByText(state).nth(0).click();
        await this.phoneInputField.fill(phone);
        await this.vatNumberInputField.fill(vat);

    };

    async companyDataUpdate(name, address, postalCode, city, state, vat) {

        await this.companyNameInputField.fill(name);
        await this.companyAddressInputField.fill(address);
        await this.companyPostalPostalCodeInputField.fill(postalCode);
        await this.companyCityInputField.fill(city);
        await this.companyStateSelectDropdown.click();
        await this.page.getByText(state).nth(1).click();
        await this.companyVatInputField.fill(vat);

    };

    async applicationSettingsUpdate(language, timeZone, numberFormat) {

        await this.uiLanguageDropdown.click();
        await this.page.getByText(language).click();
        await this.timezoneDropdown.click();
        await this.page.getByText(timeZone).click();
        await this.page.getByText(numberFormat).click();

    };

    async profilePictureUpload(image) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.locator('input#upload').click(),
        ])
        await fileChooser.setFiles([
            image
        ])
    };

    async passwordChange(oldPassword, newPassword, confirmNewPassword) {
        
        await this.passwordChangeBtn.click();
        await this.oldPasswordInputField.fill(oldPassword);
        await this.newPassswordInputField.fill(newPassword);
        await this.repeatNewPasswordInputField.fill(confirmNewPassword);
        await this.confirmPasswordChangeBtn.click();

    };

};
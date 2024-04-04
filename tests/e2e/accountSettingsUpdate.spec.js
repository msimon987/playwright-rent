import {test, expect} from '@playwright/test';
import { AccountSettings } from './pages/AccountSettingsPage';
import { HomePage } from './pages/HomePage';

test.beforeEach(async ({page}) => {
    const accountSettingsPage = new AccountSettings(page);
    await page.goto('/');
    await accountSettingsPage.logIn('mariosimon@gmail.com', 'Zeus.123');
});

test.only('User profile image uplaod test1', async({page}) => {

    const accountSettingsPage = new AccountSettings(page);

    await accountSettingsPage.userMenu.click({timeout: 40000});
    await accountSettingsPage.accountSettingsLink.click();
    await accountSettingsPage.profilePictureUploadBtn.click();
    await accountSettingsPage.profilePictureUpload('tests/e2e/testImages/javaScriptLogo.png');
    await accountSettingsPage.saveImageBtn.click();
    await accountSettingsPage.profilePictureUploadPopup.waitFor({state:'hidden'});
    await expect.soft(accountSettingsPage.accountSettingsPage).toHaveScreenshot('profilePictureUploadSection.png');
    await accountSettingsPage.profilePictureUploadBtn.click();
    await accountSettingsPage.profilePictureUpload('tests/e2e/testImages/playwrightLogo.png');
    await accountSettingsPage.saveImageBtn.click();
    await accountSettingsPage.profilePictureUploadPopup.waitFor({state:'hidden'});
    await expect(accountSettingsPage.accountSettingsPage).toHaveScreenshot('profilePictureUploadSection2.png');

});

test('Password changes test', async({page}) => {

    const accountSettingsPage = new AccountSettings(page);
    const homePage = new HomePage(page);
    
    await accountSettingsPage.userMenu.click({timeout: 40000});
    await accountSettingsPage.accountSettingsLink.click();
    await accountSettingsPage.passwordChange('Zeus.123', 'Posejdon.123', 'Posejdon.123');
    await expect.soft(accountSettingsPage.accountSettingsPage).toHaveScreenshot('passwordChangeSection.png');
    await accountSettingsPage.userMenu.click();
    await accountSettingsPage.signOutBtn.click();
    await homePage.logIn('mario.shimon87@gmail.com', 'Posejdon.123');
    await accountSettingsPage.userMenu.click({timeout: 40000});
    await accountSettingsPage.accountSettingsLink.click();
    await accountSettingsPage.passwordChange('Posejdon.123', 'Zeus.123', 'Zeus.123');
    await expect.soft(accountSettingsPage.accountSettingsPage).toHaveScreenshot('passwordChangeSection2.png');
    await accountSettingsPage.userMenu.click();
    await accountSettingsPage.signOutBtn.click();
    await homePage.logIn('mario.shimon87@gmail.com', 'Zeus.123');
    await accountSettingsPage.userMenu.click({timeout: 40000});
    await accountSettingsPage.accountSettingsLink.click();
    await expect(accountSettingsPage.accountSettingsPage).toHaveScreenshot('passwordChangeSection3.png');

});



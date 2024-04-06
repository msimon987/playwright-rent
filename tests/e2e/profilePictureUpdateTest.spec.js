import {test, expect} from '@playwright/test';
import { AccountSettings } from './pages/AccountSettingsPage';

test.beforeEach(async ({page}) => {
    const accountSettingsPage = new AccountSettings(page);
    await page.goto('/');
    await accountSettingsPage.logIn('mariosimon2@gmail.com', 'Zeus.123');
});

test('User profile image uplaod test', async({page}) => {

    const accountSettingsPage = new AccountSettings(page);

    await accountSettingsPage.userMenu.click({timeout: 20000});
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




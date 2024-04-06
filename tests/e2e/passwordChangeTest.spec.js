import {test, expect} from '@playwright/test';
import { AccountSettings } from './pages/AccountSettingsPage';
import { HomePage } from './pages/HomePage';

test.beforeEach(async ({page}) => {
    const accountSettingsPage = new AccountSettings(page);
    await page.goto('/');
    await accountSettingsPage.logIn('mariosimon2@gmail.com', 'Zeus.123');
});

test('Password changes test', async({page}) => {

    const accountSettingsPage = new AccountSettings(page);
    const homePage = new HomePage(page);
    
    await accountSettingsPage.userMenu.click({timeout: 20000});
    await accountSettingsPage.accountSettingsLink.click();
    await accountSettingsPage.passwordChange('Zeus.123', 'Posejdon.123', 'Posejdon.123');
    await expect.soft(accountSettingsPage.accountSettingsPage).toHaveScreenshot('passwordChangeSection.png');
    await page.waitForTimeout(3000);
    await accountSettingsPage.userMenu.click();
    await accountSettingsPage.signOutBtn.click();
    await homePage.logIn('mariosimon2@gmail.com', 'Posejdon.123');
    await accountSettingsPage.userMenu.click({timeout: 20000});
    await accountSettingsPage.accountSettingsLink.click();
    await accountSettingsPage.passwordChange('Posejdon.123', 'Zeus.123', 'Zeus.123');
    await page.getByText('Lozinka je promijenjena').waitFor({state:'visible'});
    await expect.soft(accountSettingsPage.accountSettingsPage).toHaveScreenshot('passwordChangeSection2.png');
    await accountSettingsPage.userMenu.click();
    await accountSettingsPage.signOutBtn.click();
    await homePage.logIn('mariosimon2@gmail.com', 'Zeus.123');
    await accountSettingsPage.userMenu.click({timeout: 20000});
    await accountSettingsPage.accountSettingsLink.click();
    await expect(accountSettingsPage.accountSettingsPage).toHaveScreenshot('passwordChangeSection3.png');

});
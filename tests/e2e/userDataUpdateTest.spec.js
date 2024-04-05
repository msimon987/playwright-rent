import {test, expect} from '@playwright/test';
import { AccountSettings } from './pages/AccountSettingsPage';

test.beforeEach(async ({page}) => {
    const accountSettingsPage = new AccountSettings(page);
    await page.goto('/');
    await accountSettingsPage.logIn('mariosimon2@gmail.com', 'Zeus.123');
});

test('Korisnicki podaci update test', async ({page}) => {

    const accountSettingsPage = new AccountSettings(page);

    test.setTimeout(60000);
    await accountSettingsPage.userMenu.click({timeout: 20000});
    await accountSettingsPage.accountSettingsLink.click();
    await accountSettingsPage.ownerDataUpdate('John', 'Doe', 'another address', '10000', 'Zagreb', 'Hong Kong', '9876543210', '654321');
    await accountSettingsPage.companyDataUpdate('update poduzece', 'update adressa', '10000', 'Zagreb', 'Haiti','654321');
    await accountSettingsPage.applicationSettingsUpdate('English', 'Europe/Vatican', '1,234.56');
    await accountSettingsPage.saveChangesBtn.click();
    await accountSettingsPage.successfulUpdateMessage.waitFor({state:'visible',timeout:2000});
    await accountSettingsPage.successfulUpdateMessage.waitFor({state:'hidden',timeout:20000});
    await expect.soft(accountSettingsPage.accountSettingsPage).toHaveScreenshot('korisnickiPodaciUpdate.png');
    await accountSettingsPage.ownerDataUpdate('Mario', 'Šimon', 'editAddress', '31000', 'Osijek', 'Croatia (Hrvatska)', '0123456789', '123456');
    await accountSettingsPage.companyDataUpdate('test poduzece', 'test address', '31000', 'Osijek', 'Greenland','123456');
    await accountSettingsPage.applicationSettingsUpdate('Croatian', 'Europe/Zagreb', '1.234,56');
    await accountSettingsPage.saveChangesBtn.click();
    await accountSettingsPage.successfulUpdateMessage.waitFor({state:'visible',timeout:2000});
    await accountSettingsPage.successfulUpdateMessage.waitFor({state:'hidden',timeout:20000});
    await expect(accountSettingsPage.accountSettingsPage).toHaveScreenshot('korisnickiPodaci.png');

});
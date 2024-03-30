import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.getByLabel('Email').fill('mario.shimon87@gmail.com');
    await page.getByLabel('Lozinka').fill('Zeus.123');
    await page.getByRole('button', { name: 'Prijava' }).click();
});

test('Korisnicki podaci update test', async ({page}) => {

    const accountSettingsPage = page.locator('.panels')

    test.setTimeout(60000);
    await page.getByText('MŠ Postavke računaPostavke i').click({timeout: 40000});
    await page.getByRole('link', { name: 'Postavke računa Postavke i' }).click();
    await page.locator('#firstName').fill('John');
    await page.getByLabel('Prezime').fill('Doe');
    await page.locator('#ownerEdit #address').fill('another address');
    await page.locator('#ownerEdit #postalCode').fill('10000');
    await page.locator('#city').fill('Zagreb');
    await page.locator('.selectize-input').first().click();
    await page.locator('#ownerEdit').getByText('Hong Kong').click();
    await page.getByLabel('Telefon').fill('9876543210');
    await page.getByLabel('PDV ID broj').fill('654321');
    await page.locator('#paymentName').fill('update poduzece');
    await page.locator('#paymentAddress').fill('update adressa');
    await page.locator('#paymentPostalCode').fill('10000');
    await page.locator('#paymentCity').fill('Zagreb');
    await page.locator('div:nth-child(3) > div > .select > .selectize-control > .selectize-input').click();
    await page.locator('#ownerEdit').getByText('Haiti').nth(1).click();
    await page.getByLabel('PDV ID / OIB').fill('654321');
    await page.locator('div').filter({ hasText: /^Croatian$/ }).nth(1).click();
    await page.getByText('English').click();
    await page.locator('div').filter({ hasText: /^Europe\/Zagreb$/ }).nth(1).click();
    await page.getByText('Europe/Vatican').click();
    await page.getByText('1,234.56').click();
    await page.getByRole('button', { name: 'Spremi promjene' }).click();
    await page.getByText('Korisnički podaci su spremljeni').waitFor({state:'visible',timeout:2000});
    await page.getByText('Korisnički podaci su spremljeni').waitFor({state:'hidden',timeout:20000});
    await expect(accountSettingsPage).toHaveScreenshot('korisnickiPodaciUpdate.png');
    await page.getByLabel('First Name').fill('Mario');
    await page.getByLabel('Last Name').fill('Šimon');
    await page.locator('#ownerEdit #address').fill('editAddress');
    await page.locator('#ownerEdit #postalCode').fill('31000');
    await page.locator('#city').fill('Osijek');
    await page.locator('div').filter({ hasText: /^Hong Kong$/ }).nth(1).click();
    await page.locator('#ownerEdit').getByText('Croatia (Hrvatska)').click();
    await page.getByLabel('Phone').fill('0123456789');
    await page.getByLabel('Name', { exact: true }).fill('test poduzece');
    await page.locator('#paymentAddress').fill('test address');
    await page.locator('#paymentPostalCode').fill('31000');
    await page.locator('#paymentCity').fill('Osijek');
    await page.locator('div').filter({ hasText: /^Haiti$/ }).nth(2).click();
    await page.getByText('Croatia (Hrvatska)').nth(1).click();
    await page.locator('#paymentLegalId').fill('123456');
    await page.getByText('Korisnički podaci su spremljeni').waitFor({state:'visible',timeout:2000});
    await page.getByText('Korisnički podaci su spremljeni').waitFor({state:'hidden',timeout:20000});
    await expect(accountSettingsPage).toHaveScreenshot('korisnickiPodaci.png');
    

});

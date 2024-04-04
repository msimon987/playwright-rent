import {test, expect} from '@playwright/test';
import { AccountSettings } from './pages/AccountSettingsPage';
import { ReservationsPage } from './pages/ReservationPage';

test.beforeEach(async ({page}) => {
    const accountSettingsPage = new AccountSettings(page);
    await page.goto('/');
    await accountSettingsPage.logIn('mariosimon@gmail.com', 'Zeus.123');
});

test('Verify that a new reservation can be added', async ({page}) => {

    const reservationPage = new ReservationsPage(page);

    await reservationPage.reservationsPageBtn.click(); 
    await expect(reservationPage.addReservationBtn).toBeVisible();
    await expect(reservationPage.addGroupReservationBtn).toBeVisible();
    await expect(reservationPage.howToFilerReservationsBtn).toBeVisible();
    await expect(reservationPage.reservationsYearFilter).toBeVisible();
    await expect(reservationPage.reservationsMonthFilter).toBeVisible();
    await page.waitForTimeout(2000);
    await reservationPage.deleteFirstReservationIfVisible();
    await reservationPage.selectReservationDate('13', '14');
    await reservationPage.accomodationUnitDropDown.selectOption('Double Room 1');
    await reservationPage.salesChanelDropdown.selectOption('AirBnB');
    await reservationPage.addAdultBtn.click();
    await reservationPage.addChild012Btn.click();
    await reservationPage.addChild1218Btn.click();
    await reservationPage.addGuestDetails('Test Guest', '12', 'guestEmail@gmail.com', '0123456789');
    await reservationPage.addInternalNote('Adding a test note in Playwright 123');
    await reservationPage.saveReservationBtn.click();

});
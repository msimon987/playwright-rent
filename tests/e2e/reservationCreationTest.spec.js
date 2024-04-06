import {test, expect} from '@playwright/test';
import { AccountSettings } from './pages/AccountSettingsPage';
import { ReservationsPage } from './pages/ReservationPage';

test.beforeEach(async ({page}) => {
    const accountSettingsPage = new AccountSettings(page);
    await page.goto('/');
    await accountSettingsPage.logIn('mariosimon2@gmail.com', 'Zeus.123');
});

test('Verify that a new reservation can be added', async ({page}) => {

    const reservationPage = new ReservationsPage(page);

    function getDate() {
        const today = new Date();
        const monthWithLeadingZero = String(today.getMonth() + 1).padStart(2, '0');
        const dayWithLeadingZero = String(today.getDate()).padStart(2, '0');
        const minuteLeadingWithZero = String(today.getMinutes()).padStart(2, '0');
        const date = dayWithLeadingZero + "." + monthWithLeadingZero + "." + today.getFullYear() /*+ ' ' + today.getHours() + ":" + minuteLeadingWithZero*/;
        return date
      };
    
    const reservationDate = getDate();

    test.setTimeout(60000);
    await reservationPage.reservationsPageBtn.click(); 
    await expect(reservationPage.addReservationBtn).toBeVisible();
    await expect(reservationPage.addGroupReservationBtn).toBeVisible();
    await expect(reservationPage.howToFilerReservationsBtn).toBeVisible();
    await expect(reservationPage.reservationsYearFilter).toBeVisible();
    await expect(reservationPage.reservationsMonthFilter).toBeVisible();
    await reservationPage.selectStudeniInTheResevationsFilter();
    await reservationPage.firstReservation.waitFor({state:'visible'});
    await reservationPage.deleteFirstReservationSequentially();
    await reservationPage.addReservationBtn.click();
    await reservationPage.selectReservationDate('13', '14');
    await reservationPage.selectReservationDate('13', '14');
    await reservationPage.accomodationUnitDropDown.selectOption('Double Room 2');
    await reservationPage.salesChanelDropdown.selectOption('AirBnB');
    await reservationPage.addAdultBtn.click();
    await reservationPage.addChild012Btn.click();
    await reservationPage.addChild1218Btn.click();
    await reservationPage.addGuestDetails('Test Guest', '12', 'guestEmail@gmail.com', '0123456789');
    await reservationPage.addInternalNote('Adding a test note in Playwright 123');
    await reservationPage.saveReservationBtn.click();
    await reservationPage.firstReservation.waitFor({state:'visible'});
    await expect(page.locator('.listItem > div:nth-of-type(3)').getByText(reservationDate)).toBeVisible();
    await expect(reservationPage.reservationsPage).toHaveScreenshot('reservation.png', {mask: [reservationPage.reservationCreationTime ]});

});
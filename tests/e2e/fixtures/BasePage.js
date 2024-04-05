const base = require('@playwright/test');
const {HomePage} = require('../pages/HomePage');
const {AccountSettingsPage} = require('../pages/AccountSettingsPage');
const {ReservationPage} = require('../pages/ReservationPage');

exports.test = base.test.extend({
    HomePage: async ({page}, use) => {
        const homePage = new HomePage(page);
    },
    AccountSettingsPage: async ({page}, use) => {
        const accountSettingsPage = new AccountSettingsPage;
    },
    ReservationPage: async ({page}, use) => {
        const reservationPage = new reservationPage;
    },

});
exports.expect = base.expect;
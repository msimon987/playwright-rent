const {expect} = require('@playwright/test');

exports.ReservationsPage = class ReservationsPage {

    constructor(page) {

        this.page = page;
        this.reservationsPageBtn = page.locator('.menulist .icon-reservations');
        this.addReservationBtn = page.locator('button#add_new');
        this.reservationCreationPopup = page.locator('.lvl_1.popupVisible.popupWrap.reservationFormWrap.wide');
        this.reservationStartDatePicker = page.locator('input#periodFrom');
        this.reservationEndDatePicker = page.locator('input#periodTo');
        this.accomodationUnitDropDown = page.locator('select#unitId');
        this.salesChanelDropdown = page.locator('select#salesChannelsId');
        this.provisionAmountInputField = page.locator('input#provisionAmount');
        this.addAdultBtn = page.locator('div:nth-of-type(1) > div > .blue.btn.increment.small');
        this.addChild012Btn = page.locator('div:nth-of-type(2) > div > .blue.btn.increment.small');
        this.addChild1218Btn = page.locator('div:nth-of-type(3) > div > .blue.btn.increment.small');
        this.guestDetailsInputBtn = page.locator('#reservation-edit').getByText('+').nth(3);
        this.guestNameInputField = page.locator("input[name='guestName']");
        this.guestCountryDropdown = page.locator('select[name="guestCountriesId"]');
        this.guestEmailInputField = page.locator("input[name='guestEmail']");
        this.guestPhoneInputField = page.locator("input[name='guestPhone']");
        this.internNoteAddBtn = page.locator('.panel:nth-of-type(5) .small');
        this.internNoteTextArea = page.locator("textarea[name='internalNote']");
        this.saveReservationBtn = page.locator('button#saveReservation > .ladda-label');

    };

    async selectReservationDate(from, to) {

        await this.reservationStartDatePicker.click();
        await this.page.locator('#periodFrom_table').getByText(from).click();
        await this.page.locator('#periodTo_table').getByText(to).click();

    };

    async addGuestDetails(name, country, email, phone) {

        await this.guestDetailsInputBtn.click();
        await this.guestNameInputField.fill(name);
        await this.guestCountryDropdown.selectOption(country);
        await this.guestEmailInputField.fill(email);
        await this.guestPhoneInputField.fill(phone);

    };

    async addInternalNote(note) {

        await this.internNoteAddBtn.click();
        await this.internNoteTextArea.fill(note);

    };

};
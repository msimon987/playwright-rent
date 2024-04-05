const {expect} = require('@playwright/test');

exports.ReservationsPage = class ReservationsPage {

    constructor(page) {

        this.page = page;
        this.reservationsPage = page.locator('div#content > .reservationsView');
        this.reservationsPageBtn = page.locator('.menulist .icon-reservations');
        this.addReservationBtn = page.locator('button#add_new');
        this.addGroupReservationBtn = page.locator('button#newGroup');
        this.howToFilerReservationsBtn = page.locator('.inAppLink'); 
        this.reservationsYearFilter = page.locator('.time_filters > div:nth-of-type(2)');
        this.reservationsMonthFilter = page.locator('.time_filters > div:nth-of-type(3)');
        this.reservationCreationPopup = page.locator('.lvl_1.popupVisible.popupWrap.reservationFormWrap.wide');
        this.reservationStartDatePickerField = page.locator('input#periodFrom');
        this.reservationEndDatePickerField = page.locator('input#periodTo');
        this.reservationStartDatePicker = page.locator('div#periodFrom_root  .picker__frame');
        this.nextMonthButton = page.getByRole('button', { name: '' });
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
        this.firstReservation = page.locator('.body.preloadObject');
        this.firstReservationDeleteBtn = page.locator('.body.preloadObject > div:nth-of-type(1)').getByRole('link', { name: '', exact: true });
        this.firstReservationConfirmDeleteBtn = page.locator('.accept.ladda-button');
        this.saveReservationBtn = page.locator('button#saveReservation > .ladda-label');
        this.successfulUpdateMessage = page.locator('div#notify > .noCloseAction.success');
        this.reservationCreationTime = page.locator('.listItem > div:nth-of-type(3)');
        this.reservationFilterByYear = page.locator('div#switcherDropMonth > .value');
    };

    async selectReservationDate(from, to) {

        await this.reservationStartDatePickerField.click();
        while ((await this.reservationStartDatePicker.getByText('Studeni').isHidden())) {
            await this.nextMonthButton.click();
        };
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

    async deleteFirstReservationIfVisible2() {  
        if ((await this.firstReservation.isVisible())) {
            await this.firstReservationDeleteBtn.click();
            await this.firstReservationConfirmDeleteBtn.click();
            await this.addReservationBtn.click();
        } else {
            await this.addReservationBtn.click();
        }
    };

    async deleteFirstReservationSequentially() {
        while ((await this.firstReservation.isVisible())) {
            await this.firstReservationDeleteBtn.click();
            await this.firstReservationConfirmDeleteBtn.click();
            await this.successfulUpdateMessage.waitFor({state:"visible", timeout:2000});
            await this.successfulUpdateMessage.waitFor({state:"hidden", timeout:10000});
        }
    };

    async selectStudeniInTheResevationsFilter() {
        while ((await this.page.locator('div#switcherDropMonth > .value').getByText('Studeni').isHidden())) {
            await this.page.locator('#switcherDropMonth div').nth(2).click();
        }
    };

};
import { expect, Locator, Page, test, TestInfo } from "@playwright/test";
import { BasePage } from "./basePage";
import { getMonthAndYearByDateAndLocale } from "../helpers/dateHelper";

export class MainPage extends BasePage {

    readonly travelSearchForm: Locator = this.page.locator('form[id="main-search"]');
    readonly destinationPicker: Locator = this.page.locator('input[name="destination_picker"]');
    readonly transportationPicker: Locator = this.page.locator('input[name="transportation_picker"]');
    readonly datePicker: Locator = this.page.locator('input[name="date_picker"]');
    readonly passengersPicker: Locator = this.page.locator('div[id="__GUID_1020"]').locator('..');
    readonly searchFormButton: Locator = this.page.locator('button[name="btn_submit"]');

    readonly destinationPopup: Locator = this.page.locator('div[data-cy="sf-destination-picker-popup-content"]');
    readonly destinationPopupInput: Locator = this.page.locator('input[data-cy="sf-destination-picker-popup-search-textbox"]');
    readonly destinationPopupSaveButton: Locator = this.page.locator('button[data-cy="sf-destination-picker-popup-save-button"]');

    readonly datePickerPopup: Locator = this.page.locator('div[data-cy="sf-datepicker-popup-content"] div[role="dialog"]');
    readonly datePickerPopupStartDateTextbox: Locator = this.datePickerPopup.locator('input[data-cy="sf-datepicker-start-date-textbox"]');
    readonly datePickerPopupEndDateTextbox: Locator = this.datePickerPopup.locator('input[data-cy="sf-datepicker-end-date-textbox"]');
    readonly datePickerPopupLeftCalendar: Locator = this.datePickerPopup.locator('div[class*="i-calendar__month--left"]');
    readonly datePickerPopupRightCalendar: Locator = this.datePickerPopup.locator('div[class*="i-calendar__month--right"]');
    readonly datePickerPopupSaveButton: Locator = this.datePickerPopup.locator('button[data-cy="sf-datepicker-popup-save-button"]');
    readonly datePickerPopupLeftCalendarMonthSpan: Locator = this.datePickerPopupLeftCalendar.locator('span[class="i-calendar__month-label-inner"]');
    readonly datePickerPopupNextMonthButton: Locator = this.datePickerPopup.locator('button[class="i-calendar__nav-btn i-calendar__nav-btn--forwards"]');

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo)
    }

    async fillDestination(destination: string) {
        await test.step(`Fill destination input with: ${destination}`, async () => {
            await this.destinationPicker.click();
            await this.destinationPopupInput.pressSequentially(destination);
        })
    }

    async selectDestinationFromList(destination: string) {
        await test.step(`Select destination from list: ${destination}`, async () => {
            await this.destinationPopup.locator(`div[aria-label="${destination}"]`).click();
        })
    }

    async clickDestinationSaveButton() {
        await test.step('Click destination save button', async () => {
            await this.destinationPopupSaveButton.click();
        })
    }

    async clickDatePickerInput() {
        await test.step('Click date picker input', async () => {
            await this.datePicker.click();
        })
    }

    async selectStartDate(date: Date, localization: string) {
        await test.step(`Select start date as: ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`, async () => {
            await this.selectMonthAndYearByDate(date, localization);
            let day: string = date.getDate().toString();
            await this.datePickerPopupLeftCalendar.locator('button[aria-disabled="false"] span[aria-hidden="true"]').getByText(day).click();
        })
    }

    async selectEndDate(date: Date, localization: string) {
        await test.step(`Select end date as: ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}}`, async () => {
            await this.selectMonthAndYearByDate(date, localization);
            let day: string = date.getDate().toString();
            await this.datePickerPopupLeftCalendar.locator('button[aria-disabled="false"] span[aria-hidden="true"]').getByText(day).click();
        })
    }

    async selectMonthAndYearByDate(date:Date, localization: string) {
        await test.step(`Select month and year: ${getMonthAndYearByDateAndLocale(date, localization)}`, async () => {
            let monthAndYearFromForm: string = (await this.datePickerPopupLeftCalendarMonthSpan.innerText()).toLowerCase();
            let selectedMonthAndYear: string = getMonthAndYearByDateAndLocale(date, localization).toLowerCase();
            while (!selectedMonthAndYear.includes(monthAndYearFromForm)) {
                await this.clickNextMonthButton();
                monthAndYearFromForm = (await this.datePickerPopupLeftCalendarMonthSpan.innerText()).toLowerCase();
            }
        })
    }

    async clickNextMonthButton() {
        await test.step('Click next month button', async () => {
            await this.datePickerPopupNextMonthButton.click();
            // To wait for one element of type
            await expect(this.datePickerPopupLeftCalendarMonthSpan).toHaveCount(1);
        })
    }

    async clickDataPickerSaveButton() {
        await test.step('Click save button in date picker form', async () => {
            await this.datePickerPopupSaveButton.click();
        })
    }

    async clickSearchFormButton() {
        await test.step('Click search form button', async() => {
            await this.searchFormButton.click();
        })
    }

    async selectTravelDate() {
        await test.step('Select date from: to:', async () => {

        })
    }

    private async select() {

    }


}
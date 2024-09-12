import { Locator, Page, test, TestInfo } from "@playwright/test";
import { BasePage } from "./basePage";

export class MainPage extends BasePage {

    readonly descinationPicker: Locator = this.page.locator('input[name="destination_picker"]');
    readonly transportationPicker: Locator = this.page.locator('input[name="transportation_picker"]');
    readonly datePicker: Locator = this.page.locator('input[name="date_picker"]');
    readonly passengersPicker: Locator = this.page.locator('div[id="__GUID_1020"]').locator('..');

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo)
    }

}
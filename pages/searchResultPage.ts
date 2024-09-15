import { Locator, Page, test, TestInfo } from "@playwright/test";
import { BasePage } from "./basePage";

export class MainPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo)
    }

}
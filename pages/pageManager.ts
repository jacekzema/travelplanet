import { Page, TestInfo } from "@playwright/test";
import { MainPage } from "./mainPage";

export class PageManager {
    readonly page: Page;
    readonly testInfo: TestInfo;
    readonly mainPage: MainPage;

    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.mainPage = new MainPage(this.page, this.testInfo);
    }

    onMainPage() {
        return this.mainPage
    }
}
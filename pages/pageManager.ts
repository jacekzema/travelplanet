import { Page, TestInfo } from "@playwright/test";
import { MainPage } from "./mainPage";
import { SearchResultPage } from "./searchResultPage";
import { ResultPage } from "./resultPage";

export class PageManager {
    readonly page: Page;
    readonly testInfo: TestInfo;
    readonly mainPage: MainPage;
    readonly searchResultPage: SearchResultPage;
    readonly resultPage: ResultPage;

    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.mainPage = new MainPage(this.page, this.testInfo);
        this.searchResultPage = new SearchResultPage(this.page, this.testInfo);
        this.resultPage = new ResultPage(this.page, this.testInfo);
    }

    onMainPage() {
        return this.mainPage
    }

    onSearchResultPage() {
        return this.searchResultPage
    }

    onResultPage() {
        return this.resultPage
    }
}
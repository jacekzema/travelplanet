import { Locator, Page, test, TestInfo } from "@playwright/test";
import { BasePage } from "./basePage";

export class SearchResultPage extends BasePage {

    readonly productListSection: Locator = this.page.locator('section[data-controller="gtm serp-tracking"]');
    readonly searchResultPagination: Locator = this.page.locator('div[id="search-results-pagination"]');
    readonly searchResultPaginationTravelList: Locator = this.productListSection.locator('div[class="c-product-list__item u-mb-xs"]');
    readonly searchResultPaginationNextPageButton: Locator = this.searchResultPagination.locator('button[class="pagination__link pagination__link--next"]');

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo)
    }

    async clickNextPageButton() {
        await test.step('Click next page button', async () => {
            await this.searchResultPaginationNextPageButton.click();
        })
    }

    async selectTravelOffer(travelOfferFromTop :number) {
        await test.step(`Select: ${travelOfferFromTop} travel offer from top`, async () => {
            // travelOfferFromTop - 1 because it starting count from 0
            await this.searchResultPaginationTravelList.nth(travelOfferFromTop - 1).locator('a[data-controller="gtm ga"][class*="btn"]').click();
        })
    }
}
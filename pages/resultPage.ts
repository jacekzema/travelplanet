import { Locator, Page, test, TestInfo } from "@playwright/test";
import { BasePage } from "./basePage";

export class ResultPage extends BasePage {

    readonly productDetailHeader: Locator = this.page.locator('div[class="b-product-detail__header"]');
    readonly productDetailHeaderDestination: Locator = this.productDetailHeader.locator('h2[class*="b-product-detail__destination"]');
    readonly rightOrderForm: Locator = this.page.locator('form[id="order-form"]');
    readonly rightOrderFormDataSummary: Locator = this.rightOrderForm.locator('span[class="b-summary-info__title"] strong').first();

    readonly gallerySection: Locator = this.page.locator('section[data-controller="gallery thumb-slider"]');
    readonly descriptionSection: Locator = this.page.locator('section[data-controller="gtm"]');
    readonly reviewSection: Locator = this.page.locator('div[data-controller="hotel-review gtm"]').locator('..');
    readonly weatherSection: Locator = this.page.locator('div[data-controller="gtm ga"]').locator('..');

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo)
    }

    async getNameOfDestination(): Promise<string> {
        return await test.step('Get name of destination', async () => {
            return await this.productDetailHeaderDestination.innerText();
        });
    }

    async getDateSummaryInformation(): Promise<string> {
        return await test.step('Get date summary', async () => {
            return await this.rightOrderFormDataSummary.innerText();
        });
    }
}
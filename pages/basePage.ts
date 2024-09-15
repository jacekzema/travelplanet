import { Locator, FrameLocator, Page, test, TestInfo } from "playwright/test";
export abstract class BasePage {

    readonly cookieBanner: Locator = this.page.locator('div[id="CybotCookiebotDialog"]');
    readonly cookieBannerAllowAllButton: Locator = this.cookieBanner.locator('button[id="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]');

    readonly iframeLocator: Locator = this.page.locator('iframe[src="https://yottlyscript.com/push/popup_iframe.html"]');
    readonly notificationIframe: FrameLocator = this.page.frameLocator('iframe[src="https://yottlyscript.com/push/popup_iframe.html"]');
    readonly notificationIframeCancelButton: Locator = this.notificationIframe.locator('button[id="cancel-btn"]');

    readonly topHeaderMenu: Locator = this.page.locator('header[id="header"]');
    readonly loginButton: Locator = this.topHeaderMenu.locator('button[data-action="login-modal#open"]');
    readonly loginForm: Locator = this.page.locator('form[name="login"]');
    readonly loginFormEmailInput: Locator = this.loginForm.locator('input[id="login_email"]');
    readonly loginFormPasswordInput: Locator = this.loginForm.locator('input[id="login_password"]');
    readonly loginFormLogInButton: Locator = this.loginForm.locator('button[id="login_submit"]');
    readonly loginFormErrorMessage: Locator = this.loginForm.locator('div[data-sms-validation-target="message"]');

    protected constructor(public page: Page, public testInfo: TestInfo) {
    }

    async acceptCookieBannerIfVisible() {
        test.step(`Accept cookie banner if is visible`, async () => {
            if (await this.cookieBanner.isVisible()) {
                await this.cookieBannerAllowAllButton.click();
            }
        })
    }

    async cancelNotificationPopup() {
        test.step(`Cancel notification iframe popup if visible`, async () => {
            if (await this.iframeLocator.isVisible()) {
                await this.notificationIframeCancelButton.click();
            }
        })
    }

    async openLoginForm() {
        await test.step(`Open Login Form`, async () => {
            await this.loginButton.click();
        })
    }

    async fillLoginFormWithEmail(email: string) {
        await test.step(`Fill login form with e=mail: ${email}`, async () => {
            await this.loginFormEmailInput.click();
            await this.loginFormEmailInput.pressSequentially(email);
        })
    }

    async fillLoginFormWithPassword(password: string) {
        await test.step(`Fill login form with password`, async () => {
            await this.loginFormPasswordInput.fill(password);
        })
    }

    async submitLoginForm() {
        await test.step(`Submit login form`, async () => {
            await this.loginFormLogInButton.click();
        })
    }

}
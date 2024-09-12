import { Locator, Page, test, TestInfo } from "playwright/test";
export abstract class BasePage {

    readonly topHeaderMenu: Locator = this.page.locator('header[id="header"]');
    readonly loginButton: Locator = this.topHeaderMenu.locator('button[data-action="login-modal#open"]');
    readonly loginForm: Locator = this.page.locator('form[name="login"]');
    readonly loginFormEmailInput: Locator = this.loginForm.locator('input[id="login_email"]');
    readonly loginFormPasswordInput: Locator = this.loginForm.locator('input[id="login_password"]');
    readonly loginFormLogInButton: Locator = this.loginForm.locator('button[id="login_submit"]');
    readonly loginFormErrorMessage: Locator = this.loginForm.locator('div[data-sms-validation-target="message"]');


    protected constructor(public page: Page, public testInfo: TestInfo) {
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
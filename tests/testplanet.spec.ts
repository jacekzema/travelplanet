import { test, expect, Locator } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { getFutureDateFromTomorrow } from '../helpers/dateHelper';

test.beforeEach(async ({ page }, testInfo) => {
    const pageManager = new PageManager(page, testInfo);
    // Whenever cookie popup / banner is appear it will run accept cookie banner function
    await page.addLocatorHandler(
        pageManager.onMainPage().cookieBanner,
        async () => {
            await pageManager.onMainPage().acceptCookieBannerIfVisible();
        }
    );

    // Whenever notification popup / banner is appear it will run cancel notification popup function
    await page.addLocatorHandler(
        pageManager.onMainPage().iframeLocator,
        async () => {
            await pageManager.onMainPage().cancelNotificationPopup();
        }
    );
});

[
    { url: 'https://www.travelplanet.pl/' },
    { url: 'https://www.invia.cz/' },
    { url: 'https://www.invia.sk/' },
    { url: 'https://www.invia.hu/' }
].forEach(({ url }) => {
    test(`Navigate to the homepage: ${url} and verify the presence of elements`, async ({ page }, testInfo) => {
        const pageManager = new PageManager(page, testInfo);

        // Navigate to the homepage
        await page.goto(url);
        // Verify if travel search form is visible / loaded
        await expect(pageManager.onMainPage().travelSearchForm).toBeVisible();
        // Verify the presence of elements
        await expect(pageManager.onMainPage().destinationPicker).toBeVisible();
        await expect(pageManager.onMainPage().datePicker).toBeVisible();
        await expect(pageManager.onMainPage().transportationPicker).toBeVisible();
        await expect(pageManager.onMainPage().passengersPicker).toBeVisible();
        await expect(pageManager.onMainPage().loginButton).toBeVisible();
    });
});

[
    { url: 'https://www.travelplanet.pl/', errorMessage: 'Wypełniłeś formularz niepoprawnie. Spróbuj raz jeszcze.' },
    { url: 'https://www.invia.cz/', errorMessage: 'Zadali jste nesprávné přihlašovací údaje. Prosím zkuste to znovu.' },
    { url: 'https://www.invia.sk/', errorMessage: 'Zadali ste nesprávne prihlasovací údaje. Skúste to prosím ešte raz.' },
    { url: 'https://www.invia.hu/', errorMessage: 'Hibás felhasznásználói adatokat adott meg. Kérjük próbálja meg újra.' }
].forEach(({ url, errorMessage }) => {
    test(`Login functionality for: ${url}`, async ({ page }, testInfo) => {
        const pageManager = new PageManager(page, testInfo);
        const username: string = 'emmil@dd.pl';
        const password: string = 'passhaslo1';

        // Navigate to the homepage
        await page.goto(url);
        // Open login form
        await pageManager.onMainPage().openLoginForm();
        await expect(pageManager.onMainPage().loginForm).toBeVisible();
        // Enter the username and password
        await pageManager.onMainPage().fillLoginFormWithEmail(username);
        await pageManager.onMainPage().fillLoginFormWithPassword(password);
        // Submit the login form
        await pageManager.onMainPage().submitLoginForm();
        // Verify unsuccessful login by checking for a notification or error message
        await expect(pageManager.onMainPage().loginFormErrorMessage).toBeVisible();
        await expect(pageManager.onMainPage().loginFormErrorMessage).toHaveText(errorMessage);
    });
});

[
    { url: 'https://www.travelplanet.pl/', localization: 'pl-PL', destination: 'Egipt' },
    { url: 'https://www.invia.cz/', localization: 'cs-CZ' , destination: 'Egypt' },
    { url: 'https://www.invia.sk/', localization: 'sk-SK' , destination: 'Egypt' },
    { url: 'https://www.invia.hu/', localization: 'hu-HU' , destination: 'Egyiptom' }
].forEach(({ url, localization, destination }) => {
    test(`Destination: and Date selection: ${url}`, async ({ page }, testInfo) => {
        const pageManager = new PageManager(page, testInfo);
        const startDate: Date = getFutureDateFromTomorrow(7);
        const endDate: Date = getFutureDateFromTomorrow(14);

        // Navigate to the homepage
        await page.goto(url);
        await expect(pageManager.onMainPage().travelSearchForm).toBeVisible();
        // Input a destination in the search bar
        await pageManager.onMainPage().fillDestination(destination);
        await pageManager.onMainPage().selectDestinationFromList(destination);
        await pageManager.onMainPage().clickDestinationSaveButton();
        await expect(pageManager.onMainPage().destinationPicker).toHaveAttribute('value', destination);
        // Select a travel date range using the date picker
        await pageManager.onMainPage().clickDatePickerInput();
        // 8 days from today
        await pageManager.onMainPage().selectStartDate(startDate, localization);
        // 15 days from today
        await pageManager.onMainPage().selectEndDate(endDate, localization);
        await pageManager.onMainPage().clickDataPickerSaveButton();
        await pageManager.onMainPage().clickSearchFormButton();
    });
});
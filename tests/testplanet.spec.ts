import { test, expect } from '@playwright/test';
import { PageManager } from './pages/pageManager';


/*
Navigate to the homepage for each site (invia.cz, invia.sk, invia.hu, and
    travelplanet.pl).
    • Verify the presence of the following elements:
    o Destination, date, transportation, and passenger selectors. +
    o Login button.
    o Any other essential elements typically interacted with by a user.
*/

[
    { link: 'https://www.travelplanet.pl/' },
    { link: 'https://www.invia.cz/' },
    { link: 'https://www.invia.sk/' },
    { link: 'https://www.invia.hu/' }
].forEach(({ link }) => {
    test(`Navigate to the homepage: ${link} and verify the presence of elements`, async ({ page }, testInfo) => {
        const pageManager = new PageManager(page, testInfo);
        await page.goto(link);
        await expect(pageManager.onMainPage().datePicker).toBeVisible();
        await expect(pageManager.onMainPage().descinationPicker).toBeVisible();
        await expect(pageManager.onMainPage().passengersPicker).toBeVisible();
        await expect(pageManager.onMainPage().transportationPicker).toBeVisible();
    });
});


test(`Login `, async ({ page }, testInfo) => {
    const pageManager = new PageManager(page, testInfo);
    await page.goto('https://www.travelplanet.pl/');

    await pageManager.onMainPage().openLoginForm();
    await expect(pageManager.onMainPage().loginForm).toBeVisible();
    await pageManager.onMainPage().fillLoginFormWithEmail("emmil@dd.pl");
    await pageManager.onMainPage().fillLoginFormWithPassword("passek");
    await pageManager.onMainPage().submitLoginForm();
    await expect(pageManager.onMainPage().loginFormErrorMessage).toBeVisible();

    page.pause();

});

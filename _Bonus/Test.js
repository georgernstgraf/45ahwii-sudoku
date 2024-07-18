const { Builder, By, Key, until } = require('selenium-webdriver');

async function loginToFacebook() {
    // Set up the Selenium WebDriver
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the Facebook login page
        await driver.get('https://www.facebook.com');


        await driver.findElement(By.id('email')).sendKeys('your_email@example.com');
        await driver.findElement(By.id('pass')).sendKeys('your_password', Key.RETURN);


        await driver.wait(until.titleIs('Facebook'), 5000);


    } finally {
        await driver.quit();
    }
}

loginToFacebook();

//WOW IS THIS ILLEGAL? NO, IT IS NOT. IT IS JUST A TEST.
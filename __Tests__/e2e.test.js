const puppeteer = require("puppeteer");
//const URL = "https://compassionate-bardeen-fe4d03.netlify.app/";
const URL = "https://deploy-preview-86--compassionate-bardeen-fe4d03.netlify.app";

describe("basic user flow of the website", () => {
    // Checking for 6 category cards on the website
    it("Initial rendering of the page -- check the category cards", async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(URL);
      
        // Get the all the category cards on the website
        const numCategoryCards = await page.$$eval("category-card", (categoryCards) => {
          return categoryCards.length;
        });

        expect(numCategoryCards).toEqual(6);
        await browser.close();
    });

    it("Initial rendering of the page -- check the setting page", async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(URL);
    
      // Click the hamburger icon
      const hamburgerIcon = await page.$("#menu-icon");
      await hamburgerIcon.click();

      await page.waitForTimeout(1000);
      const settings = await page.$("#settings-page");
      await settings.click();

      const title = await page.$(".heading");
      const text = await title.getProperty('innerText');
      const textValue = text['_remoteObject'].value;

      expect(textValue).toEqual("Settings");
      await browser.close();
  });

  it("Initial rendering of the page -- check the cookbooks page", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
  
    // Click the hamburger icon
    const hamburgerIcon = await page.$("#menu-icon");
    await hamburgerIcon.click();

    await page.waitForTimeout(1000);
    const cookbooks = await page.$("#cookbook-page");
    await cookbooks.click();

    const title = await page.$("#cookbook-container h1");
    const text = await title.getProperty('innerText');
    const textValue = text['_remoteObject'].value;

    expect(textValue).toEqual("Saved Cookbooks");
    await browser.close();
  });
});

describe("basic user flow -- clicking a category card", () => {
  // Checking for 6 category cards on the website
  it("Test results when a category card is clicked", async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(URL);

      // click the first category card
      const categoryCards = await page.$$("category-card");
      await categoryCards[0].click();
      await page.waitForTimeout(1000);

      // check for more than 1 recipe card
      const recipeCards = await page.$$eval("recipe-card", (recipeCard) => {
        return recipeCard.length > 0;
      });

      expect(recipeCards).toEqual(true);
      await browser.close();
  });
});

describe("basic user flow -- searching with a query", () => {
  // Checking for 6 category cards on the website
  it("Check results when inputing a value into search bar", async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(URL);

      // click the first category card
      await page.$eval("#search-query", el => el.value = "pasta");
      const searchButton = await page.$("#search-button");
      await searchButton.click();

      await page.waitForTimeout(1000);

      // check for more than 1 recipe card
      const recipeCards = await page.$$eval("recipe-card", (recipeCard) => {
        return recipeCard.length > 0;
      });

      expect(recipeCards).toEqual(true);
      await browser.close();
  });
});

describe("basic user flow -- searching with a query and clicking a search result", () => {
  // Checking for 6 category cards on the website
  it("Check results when inputing a value into search bar", async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(URL);

      // click the first category card
      await page.$eval("#search-query", el => el.value = "pasta");
      
      const searchButton = await page.$("#search-button");
      await searchButton.click();

      await page.waitForTimeout(1000);

      // check for more than 1 recipe card
      const recipeCards = await page.$$("recipe-card");
      await recipeCards[0].click();
      
      await page.waitForTimeout(1000);

      const recipePage = await page.$$("recipe-page") !== null;
      expect(recipePage).toEqual(true);
      await browser.close();
  });
});
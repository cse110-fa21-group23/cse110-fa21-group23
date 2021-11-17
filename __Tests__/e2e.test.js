const puppeteer = require("puppeteer");
const URL = "http://127.0.0.1:5501/source/index.html";

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
    })
})
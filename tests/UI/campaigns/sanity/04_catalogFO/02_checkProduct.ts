// Import utils
import testContext from '@utils/testContext';

// Import FO pages
import {homePage} from '@pages/FO/classic/home';
import {productPage} from '@pages/FO/classic/product';

import {expect} from 'chai';
import type {BrowserContext, Page} from 'playwright';
import {
  dataProducts,
  utilsPlaywright,
} from '@prestashop-core/ui-testing';

const baseContext: string = 'sanity_catalogFO_checkProduct';

/*
  Open the FO home page
  Check the first product page
 */
describe('FO - Catalog : Check the Product page', async () => {
  let browserContext: BrowserContext;
  let page: Page;

  // before and after functions
  before(async function () {
    browserContext = await utilsPlaywright.createBrowserContext(this.browser);
    page = await utilsPlaywright.newTab(browserContext);
  });

  after(async () => {
    await utilsPlaywright.closeBrowserContext(browserContext);
  });

  describe('Catalog FO: Check products from catalog', async () => {
    // Steps
    it('should open the shop page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToShopFO', baseContext);

      await homePage.goTo(page, global.FO.URL);

      const result = await homePage.isHomePage(page);
      expect(result).to.eq(true);
    });

    it('should go to the first product page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToProductPage', baseContext);

      await homePage.goToProductPage(page, 1);

      const pageTitle = await productPage.getPageTitle(page);
      expect(pageTitle).to.contains(dataProducts.demo_1.name);
    });

    it('should check the product page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkProductPage', baseContext);

      const result = await productPage.getProductInformation(page);
      await Promise.all([
        expect(result.name).to.equal(dataProducts.demo_1.name),
        expect(result.price).to.equal(dataProducts.demo_1.finalPrice),
        expect(result.description).to.contains(dataProducts.demo_1.description),
      ]);
    });
  });
});

// Import utils
import testContext from '@utils/testContext';

// Import commonTests
import loginCommon from '@commonTests/BO/loginBO';
import {createOrderByCustomerTest} from '@commonTests/FO/classic/order';

// Import BO pages
import ordersPage from '@pages/BO/orders';
import orderPageTabListBlock from '@pages/BO/orders/view/tabListBlock';

import {
  boDashboardPage,
  dataCarriers,
  dataCustomers,
  dataPaymentMethods,
  dataProducts,
  FakerOrder,
  FakerOrderShipping,
  utilsDate,
  utilsPlaywright,
} from '@prestashop-core/ui-testing';

import {expect} from 'chai';
import type {BrowserContext, Page} from 'playwright';

const baseContext: string = 'functional_BO_orders_orders_viewAndEditOrder_carriersTab';

/*
Pre-condition :
- Create order by default customer
Scenario :
- Check carriers number from Carriers tab
- Check shipping details
- Update carrier and tracking number and check details
 */

describe('BO - Orders - View and edit order : Check order carriers tab', async () => {
  let browserContext: BrowserContext;
  let page: Page;

  const today: string = utilsDate.getDateFormat('mm/dd/yyyy');
  const shippingDetailsData: FakerOrderShipping = new FakerOrderShipping({
    trackingNumber: '0523698',
    carrier: dataCarriers.myCarrier.name,
    carrierID: dataCarriers.myCarrier.id,
  });
  const shippingDetailsCost: string = '€8.40';
  // New order by customer data
  const orderByCustomerData: FakerOrder = new FakerOrder({
    customer: dataCustomers.johnDoe,
    products: [
      {
        product: dataProducts.demo_1,
        quantity: 1,
      },
    ],
    paymentMethod: dataPaymentMethods.wirePayment,
  });

  // Pre-condition - Create order by default customer
  createOrderByCustomerTest(orderByCustomerData, baseContext);

  // before and after functions
  before(async function () {
    browserContext = await utilsPlaywright.createBrowserContext(this.browser);
    page = await utilsPlaywright.newTab(browserContext);
  });

  after(async () => {
    await utilsPlaywright.closeBrowserContext(browserContext);
  });

  // 1 - Go to view order page
  describe('Go to view order page', async () => {
    it('should login in BO', async function () {
      await loginCommon.loginBO(this, page);
    });

    it('should go to \'Orders > Orders\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToOrdersPage1', baseContext);

      await boDashboardPage.goToSubMenu(
        page,
        boDashboardPage.ordersParentLink,
        boDashboardPage.ordersLink,
      );
      await ordersPage.closeSfToolBar(page);

      const pageTitle = await ordersPage.getPageTitle(page);
      expect(pageTitle).to.contains(ordersPage.pageTitle);
    });

    it('should reset all filters', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'resetOrderTableFilters1', baseContext);

      const numberOfOrders = await ordersPage.resetAndGetNumberOfLines(page);
      expect(numberOfOrders).to.be.above(0);
    });

    it(`should filter the Orders table by 'Customer: ${dataCustomers.johnDoe.lastName}'`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'filterByCustomer1', baseContext);

      await ordersPage.filterOrders(page, 'input', 'customer', dataCustomers.johnDoe.lastName);

      const textColumn = await ordersPage.getTextColumn(page, 'customer', 1);
      expect(textColumn).to.contains(dataCustomers.johnDoe.lastName);
    });

    it('should view the order', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'orderPageTabListBlock1', baseContext);

      await ordersPage.goToOrder(page, 1);

      const pageTitle = await orderPageTabListBlock.getPageTitle(page);
      expect(pageTitle).to.contains(orderPageTabListBlock.pageTitle);
    });
  });

  // 2 - Check carriers tab
  describe('Check carriers tab', async () => {
    it('should click on \'Carriers\' tab', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'displayCarriersTab', baseContext);

      const isTabOpened = await orderPageTabListBlock.goToCarriersTab(page);
      expect(isTabOpened).to.eq(true);
    });

    it('should check that the carriers number is equal to 1', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkCarriersNumber', baseContext);

      const carriersNumber = await orderPageTabListBlock.getCarriersNumber(page);
      expect(carriersNumber).to.be.equal(1);
    });

    it('should check the carrier details', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkCarrierDetails', baseContext);

      const result = await orderPageTabListBlock.getCarrierDetails(page);
      await Promise.all([
        expect(result.date).to.equal(today),
        expect(result.carrier).to.equal(dataCarriers.clickAndCollect.name),
        expect(result.weight).to.equal(`${dataProducts.demo_1.packageDimensionWeight}00 kg`),
        expect(result.shippingCost).to.equal('€0.00'),
        expect(result.trackingNumber).to.equal(''),
      ]);
    });

    it('should click on \'Edit\' link and check the modal', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'clickOnEditLink', baseContext);

      const isModalVisible = await orderPageTabListBlock.clickOnEditLink(page);
      expect(isModalVisible, 'Edit shipping modal is not visible!').to.eq(true);
    });

    it('should update the carrier and add a tracking number', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'updateTrackingNumber', baseContext);

      const textResult = await orderPageTabListBlock.setShippingDetails(page, shippingDetailsData);
      expect(textResult).to.equal(orderPageTabListBlock.successfulUpdateMessage);
    });

    it('should check the updated carrier details', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkUpdatedCarrierDetails', baseContext);

      await orderPageTabListBlock.goToCarriersTab(page);

      const result = await orderPageTabListBlock.getCarrierDetails(page);
      await Promise.all([
        expect(result.date).to.equal(today),
        expect(result.carrier).to.equal(shippingDetailsData.carrier),
        expect(result.weight).to.equal(`${dataProducts.demo_1.packageDimensionWeight}00 kg`),
        expect(result.shippingCost).to.equal(shippingDetailsCost),
        expect(result.trackingNumber).to.equal(shippingDetailsData.trackingNumber),
      ]);
    });
  });
});

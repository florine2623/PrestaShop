import {expect} from 'chai';
import testContext from '@utils/testContext';

// Import pages
import statusesPage from '@pages/BO/shopParameters/orderSettings/statuses';
import addOrderStatusPage from '@pages/BO/shopParameters/orderSettings/statuses/add';
import addOrderReturnStatusPage from '@pages/BO/shopParameters/orderSettings/statuses/returnStatus/add';
import titlesPage from '@pages/BO/shopParameters/customerSettings/titles';
import addTitlePage from '@pages/BO/shopParameters/customerSettings/titles/add';
import contactsPage from '@pages/BO/shopParameters/contact';
import addContactPage from '@pages/BO/shopParameters/contact/add';
import storesPage from '@pages/BO/shopParameters/stores';
import addStorePage from '@pages/BO/shopParameters/stores/add';
import seoAndUrlsPage from '@pages/BO/shopParameters/trafficAndSeo/seoAndUrls';
import addSeoAndUrlPage from '@pages/BO/shopParameters/trafficAndSeo/seoAndUrls/add';
import searchEnginesPage from '@pages/BO/shopParameters/trafficAndSeo/searchEngines';
import addSearchEnginePage from '@pages/BO/shopParameters/trafficAndSeo/searchEngines/add';
import tagsPage from '@pages/BO/shopParameters/search/tags';
import addTagPage from '@pages/BO/shopParameters/search/tags/add';

import {
  boDashboardPage,
  boLoginPage,
  boShopParametersPage,
  boMaintenancePage,
  boOrderSettingsPage,
  boProductSettingsPage,
  boCustomerSettingsPage,
  boCustomerGroupsPage,
  boCustomerGroupsCreatePage,
  boSearchPage,
  boSearchAliasCreatePage,
  type BrowserContext,
  type Page,
  dataLanguages,
  FakerOrderStatus,
  FakerOrderReturnStatus,
  FakerSearchTag,
  utilsPlaywright,
} from '@prestashop-core/ui-testing';

const baseContext: string = 'audit_BO_dashboard';

describe('BO - Shop Parameters', async () => {
  let browserContext: BrowserContext;
  let page: Page;
  let numberOfTags: number = 0;

  const createOrderStatusData: FakerOrderStatus = new FakerOrderStatus();
  const createOrderReturnStatusData: FakerOrderReturnStatus = new FakerOrderReturnStatus();
  const createTagData: FakerSearchTag = new FakerSearchTag({language: dataLanguages.english.name});

  before(async function () {
    utilsPlaywright.setErrorsCaptured(true);

    browserContext = await utilsPlaywright.createBrowserContext(this.browser);
    page = await utilsPlaywright.newTab(browserContext);
  });

  after(async () => {
    await utilsPlaywright.closeBrowserContext(browserContext);
  });

  it('should login in BO', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'loginBO', baseContext);

    await boLoginPage.goTo(page, global.BO.URL);
    await boLoginPage.successLogin(page, global.BO.EMAIL, global.BO.PASSWD);

    const pageTitle = await boDashboardPage.getPageTitle(page);
    expect(pageTitle).to.contains(boDashboardPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Shop parameters > General\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToGeneralPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.shopParametersParentLink,
      boDashboardPage.shopParametersGeneralLink,
    );
    await boShopParametersPage.closeSfToolBar(page);

    const pageTitle = await boShopParametersPage.getPageTitle(page);
    expect(pageTitle).to.contains(boShopParametersPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Maintenance\' tab', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToMaintenancePage', baseContext);

    await boShopParametersPage.goToSubTabMaintenance(page);

    const pageTitle = await boMaintenancePage.getPageTitle(page);
    expect(pageTitle).to.contains(boMaintenancePage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Shop Parameters > Order Settings\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToOrderSettingsPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.shopParametersParentLink,
      boDashboardPage.orderSettingsLink,
    );
    await boOrderSettingsPage.closeSfToolBar(page);

    const pageTitle = await boOrderSettingsPage.getPageTitle(page);
    expect(pageTitle).to.contains(boOrderSettingsPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Statuses\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToStatusesPage', baseContext);

    await boOrderSettingsPage.goToStatusesPage(page);

    const pageTitle = await statusesPage.getPageTitle(page);
    expect(pageTitle).to.contains(statusesPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to add new order status page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddOrderStatusPage', baseContext);

    await boOrderSettingsPage.goToStatusesPage(page);
    await statusesPage.goToNewOrderStatusPage(page);

    const pageTitle = await addOrderStatusPage.getPageTitle(page);
    expect(pageTitle).to.contains(addOrderStatusPage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to edit order status page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditOrderStatusPage', baseContext);

    const tableName: string = 'order';
    await boOrderSettingsPage.goToStatusesPage(page);
    await statusesPage.goToEditPage(page, tableName, 1);

    // const pageTitle = await addOrderStatusPage.getPageTitle(page);
    // expect(pageTitle).to.contains(addOrderStatusPage.pageTitleEdit(createOrderStatusData.name));

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });
  // FIN DES MODIFICATIONS

  it('should go to add new order return status page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddOrderReturnStatusPage', baseContext);

    await boOrderSettingsPage.goToStatusesPage(page);
    await statusesPage.goToNewOrderReturnStatusPage(page);

    const pageTitle = await addOrderReturnStatusPage.getPageTitle(page);
    expect(pageTitle).to.eq(addOrderReturnStatusPage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });


  //ERROR JS HERE
  it('should go to edit order return status page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditOrderReturnStatusPage', baseContext);

    const tableName: string = 'order_return';

    await boOrderSettingsPage.goToStatusesPage(page);
    await statusesPage.goToEditPage(page, tableName, 1);
    
    const pageTitle = await addOrderReturnStatusPage.getPageTitle(page);
    console.log(pageTitle);
    expect(pageTitle).to.contains(addOrderReturnStatusPage.pageTitleEdit('Waiting for confirmation'));
    console.log(createOrderReturnStatusData.name);
    
    // const jsErrors = utilsPlaywright.getJsErrors();
    // expect(jsErrors.length).to.equals(0);
  });
  //ERROR JS HERE

  it('should go to \'Shop parameters > Product Settings\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToProductSettingPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.shopParametersParentLink,
      boDashboardPage.productSettingsLink,
    );
    await boProductSettingsPage.closeSfToolBar(page);

    const pageTitle = await boProductSettingsPage.getPageTitle(page);
    expect(pageTitle).to.contains(boProductSettingsPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Shop parameters > Customer Settings\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToCustomerSettingsPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.shopParametersParentLink,
      boDashboardPage.customerSettingsLink,
    );
    await boCustomerSettingsPage.closeSfToolBar(page);

    const pageTitle = await boCustomerSettingsPage.getPageTitle(page);
    expect(pageTitle).to.contains(boCustomerSettingsPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Groups\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToGroupsPage', baseContext);

    await boCustomerSettingsPage.goToGroupsPage(page);

    const pageTitle = await boCustomerGroupsPage.getPageTitle(page);
    expect(pageTitle).to.contains(boCustomerGroupsPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to add new group page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddNewGroup', baseContext);

    await boCustomerGroupsPage.goToNewGroupPage(page);

    const pageTitle = await boCustomerGroupsCreatePage.getPageTitle(page);
    expect(pageTitle).to.contains(boCustomerGroupsCreatePage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to edit group page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditGroupPage', baseContext);

    await boCustomerSettingsPage.goToGroupsPage(page);
    await boCustomerGroupsPage.gotoEditGroupPage(page, 1);

    const pageTitle = await boCustomerGroupsCreatePage.getPageTitle(page);
    expect(pageTitle).to.contains(boCustomerGroupsCreatePage.pageTitleEdit);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Titles\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToTitlesPage', baseContext);

    await boCustomerSettingsPage.goToTitlesPage(page);

    const pageTitle = await titlesPage.getPageTitle(page);
    expect(pageTitle).to.contains(titlesPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to add new title page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddNewTitle', baseContext);

    await titlesPage.goToAddNewTitle(page);

    const pageTitle = await addTitlePage.getPageTitle(page);
    expect(pageTitle).to.eq(addTitlePage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to edit title page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditTitlePage', baseContext);

    await boCustomerSettingsPage.goToTitlesPage(page);
    await titlesPage.gotoEditTitlePage(page, 1);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Shop parameters > Contact\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToContactsPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.shopParametersParentLink,
      boDashboardPage.contactLink,
    );
    await contactsPage.closeSfToolBar(page);

    const pageTitle = await contactsPage.getPageTitle(page);
    expect(pageTitle).to.contains(contactsPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to add new contact page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddNewContact', baseContext);

    await contactsPage.goToAddNewContactPage(page);

    const pageTitle = await addContactPage.getPageTitle(page);
    expect(pageTitle).to.contains(addContactPage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to edit contact page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditContactPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.shopParametersParentLink,
      boDashboardPage.contactLink,
    );

    await contactsPage.goToEditContactPage(page, 1);

    const pageTitle = await addContactPage.getPageTitle(page);
    expect(pageTitle).to.contains(addContactPage.pageTitleEdit);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Stores\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToStoresPage', baseContext);

    await contactsPage.goToStoresPage(page);

    const pageTitle = await storesPage.getPageTitle(page);
    expect(pageTitle).to.contains(storesPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to add new store page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddNewStore', baseContext);

    await storesPage.goToNewStorePage(page);

    const pageTitle = await addStorePage.getPageTitle(page);
    expect(pageTitle).to.contains(addStorePage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to edit store page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditStorePage', baseContext);

    await contactsPage.goToStoresPage(page);
    await storesPage.gotoEditStorePage(page, 1);

    const pageTitle = await addStorePage.getPageTitle(page);
    expect(pageTitle).to.contains(addStorePage.pageTitleEdit);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Shop Parameters > Traffic & SEO\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToSeoAndUrlsPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.shopParametersParentLink,
      boDashboardPage.trafficAndSeoLink,
    );
    await seoAndUrlsPage.closeSfToolBar(page);

    const pageTitle = await seoAndUrlsPage.getPageTitle(page);
    expect(pageTitle).to.contains(seoAndUrlsPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to new seo page page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToNewSeoPage', baseContext);

    await seoAndUrlsPage.goToNewSeoUrlPage(page);

    const pageTitle = await addSeoAndUrlPage.getPageTitle(page);
    expect(pageTitle).to.contains(addSeoAndUrlPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to edit first seo page page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditSeoPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.shopParametersParentLink,
      boDashboardPage.trafficAndSeoLink,
    );
    await seoAndUrlsPage.closeSfToolBar(page);

    await seoAndUrlsPage.goToEditSeoUrlPage(page, 1);

    const pageTitle = await addSeoAndUrlPage.getPageTitle(page);
    expect(pageTitle).to.contains(addSeoAndUrlPage.editPageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Search Engines\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToSearchEnginesPage', baseContext);

    await seoAndUrlsPage.goToSearchEnginesPage(page);

    const pageTitle = await searchEnginesPage.getPageTitle(page);
    expect(pageTitle).to.contain(searchEnginesPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to new search engine', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToNewSearchEnginePage', baseContext);

    await searchEnginesPage.goToNewSearchEnginePage(page);

    const pageTitle = await addSearchEnginePage.getPageTitle(page);
    expect(pageTitle).to.contain(addSearchEnginePage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to edit first search engine page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditSearchEngine', baseContext);

    await seoAndUrlsPage.goToSearchEnginesPage(page);
    await searchEnginesPage.goToEditSearchEnginePage(page, 1);

    const pageTitle = await addSearchEnginePage.getPageTitle(page);
    expect(pageTitle).to.contain(addSearchEnginePage.pageTitleEdit);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Shop Parameters > Search\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToSearchPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.shopParametersParentLink,
      boDashboardPage.searchLink,
    );

    const pageTitle = await boSearchPage.getPageTitle(page);
    expect(pageTitle).to.contains(boSearchPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to add new search page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddAliasPage', baseContext);

    await boSearchPage.goToAddNewAliasPage(page);

    const pageTitle = await boSearchAliasCreatePage.getPageTitle(page);
    expect(pageTitle).to.contains(boSearchAliasCreatePage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to edit alias page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditAliasPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.shopParametersParentLink,
      boDashboardPage.searchLink,
    );
    await boSearchPage.gotoEditAliasPage(page, 1);

    const pageTitle = await boSearchAliasCreatePage.getPageTitle(page);
    expect(pageTitle).to.contains(boSearchAliasCreatePage.pageTitleEdit);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Tags\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToTagsPage', baseContext);

    await boSearchPage.goToTagsPage(page);

    const pageTitle = await tagsPage.getPageTitle(page);
    expect(pageTitle).to.contains(tagsPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to add new tag page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddTagPage', baseContext);

    await tagsPage.goToAddNewTagPage(page);

    const pageTitle = await addTagPage.getPageTitle(page);
    expect(pageTitle).to.contains(addTagPage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should create tag and check result', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'createTag', baseContext);

    const textResult = await addTagPage.setTag(page, createTagData);
    expect(textResult).to.contains(tagsPage.successfulCreationMessage);
  });

  it('should go to edit tag page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditTagPage', baseContext);

    await boSearchPage.goToTagsPage(page);
    await tagsPage.gotoEditTagPage(page, 1);

    const pageTitle = await addTagPage.getPageTitle(page);
    expect(pageTitle).to.contains(addTagPage.pageTitleEdit);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });
});

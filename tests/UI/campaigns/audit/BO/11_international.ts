import {expect} from 'chai';
import testContext from '@utils/testContext';

// Import pages
import geolocationPage from '@pages/BO/international/localization/geolocation';
import zonesPage from '@pages/BO/international/locations';
import addZonePage from '@pages/BO/international/locations/add';
import statesPage from '@pages/BO/international/locations/states';
import addStatePage from '@pages/BO/international/locations/states/add';
import taxesPage from '@pages/BO/international/taxes';
import addTaxPage from '@pages/BO/international/taxes/add';
import taxRulesPage from '@pages/BO/international/taxes/taxRules';
import addTaxRulesPage from '@pages/BO/international/taxes/taxRules/add';

import {
  boDashboardPage,
  boLoginPage,
  boLocalizationPage,
  boLanguagesPage,
  boLanguagesCreatePage,
  boCurrenciesPage,
  boCurrenciesCreatePage,
  boCountriesPage,
  boCountriesCreatePage,
  boTranslationsPage,
  type BrowserContext,
  type Page,
  utilsPlaywright,
} from '@prestashop-core/ui-testing';

const baseContext: string = 'audit_BO_international';

describe('BO - International', async () => {
  let browserContext: BrowserContext;
  let page: Page;

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

  it('should go to \'Localization > Localization\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToLocalizationPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.internationalParentLink,
      boDashboardPage.localizationLink,
    );
    await boLocalizationPage.closeSfToolBar(page);

    const pageTitle = await boLocalizationPage.getPageTitle(page);
    expect(pageTitle).to.contains(boLocalizationPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Localization > Languages\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToLanguagesPage', baseContext);

    await boLocalizationPage.goToSubTabLanguages(page);

    const pageTitle = await boLanguagesPage.getPageTitle(page);
    expect(pageTitle).to.contains(boLanguagesPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Localization > Languages > New Language\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddNewLanguages', baseContext);

    await boLanguagesPage.goToAddNewLanguage(page);

    const pageTitle = await boLanguagesCreatePage.getPageTitle(page);
    expect(pageTitle).to.contains(boLanguagesCreatePage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Localization > Languages > Edit Language\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditLanguagesPage', baseContext);

    await boLocalizationPage.goToSubTabLanguages(page);
    await boLanguagesPage.goToEditLanguage(page, 1);

    const pageTitle = await boLanguagesCreatePage.getPageTitle(page);
    expect(pageTitle).to.contains(boLanguagesCreatePage.pageEditTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Localization > Currencies\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToCurrenciesPage', baseContext);

    await boLocalizationPage.goToSubTabCurrencies(page);

    const pageTitle = await boCurrenciesPage.getPageTitle(page);
    expect(pageTitle).to.contains(boCurrenciesPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Localization > Currencies > New Currency\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddNewCurrencyPage', baseContext);

    await boCurrenciesPage.goToAddNewCurrencyPage(page);

    const pageTitle = await boCurrenciesCreatePage.getPageTitle(page);
    expect(pageTitle).to.contains(boCurrenciesCreatePage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Localization > Currencies > Edit Currency\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditCurrenciesPage', baseContext);

    await boLocalizationPage.goToSubTabCurrencies(page);
    await boCurrenciesPage.goToEditCurrencyPage(page, 1);

    const pageTitle = await boCurrenciesCreatePage.getPageTitle(page);
    expect(pageTitle).to.contains(boCurrenciesCreatePage.editCurrencyPage);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Localization > Geolocation\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToGeolocationPage', baseContext);

    await boLocalizationPage.goToSubTabGeolocation(page);

    const pageTitle = await geolocationPage.getPageTitle(page);
    expect(pageTitle).to.equal(geolocationPage.pageTitle);
  });

  it('should go to \'Locations > Zones\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToZonesPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.internationalParentLink,
      boDashboardPage.locationsLink,
    );
    await boLocalizationPage.closeSfToolBar(page);

    const pageTitle = await zonesPage.getPageTitle(page);
    expect(pageTitle).to.contains(zonesPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Locations > Zones > New Zone\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddNewZonePage', baseContext);

    await zonesPage.goToAddNewZonePage(page);

    const pageTitle = await addZonePage.getPageTitle(page);
    expect(pageTitle).to.contains(addZonePage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Locations > Zones > Edit Zone\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goEditToZonesPage', baseContext);

    await addZonePage.goToSubMenu(
      page,
      boDashboardPage.internationalParentLink,
      boDashboardPage.locationsLink,
    );

    await zonesPage.goToEditZonePage(page, 1);

    const pageTitle = await addZonePage.getPageTitle(page);
    expect(pageTitle).to.contains(addZonePage.pageTitleEdit);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Locations > Countries\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToCountriesPage', baseContext);

    await zonesPage.goToSubTabCountries(page);

    const pageTitle = await boCountriesPage.getPageTitle(page);
    expect(pageTitle).to.contains(boCountriesPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Locations > Countries > New Country\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddNewCountryPage', baseContext);

    await boCountriesPage.goToAddNewCountryPage(page);

    const pageTitle = await boCountriesCreatePage.getPageTitle(page);
    expect(pageTitle).to.contains(boCountriesCreatePage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Locations > Countries > Edit Country\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditCountriesPage', baseContext);

    await zonesPage.goToSubTabCountries(page);
    await boCountriesPage.goToEditCountryPage(page, 1);

    const pageTitle = await boCountriesCreatePage.getPageTitle(page);
    expect(pageTitle).to.contains(boCountriesCreatePage.pageTitleEdit);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Locations > States\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToStatesPage', baseContext);

    await zonesPage.goToSubTabStates(page);

    const pageTitle = await statesPage.getPageTitle(page);
    expect(pageTitle).to.contains(statesPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Locations > States > New State\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddNewStatePage', baseContext);

    await statesPage.goToAddNewStatePage(page);

    const pageTitle = await addStatePage.getPageTitle(page);
    expect(pageTitle).to.contains(addStatePage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'Locations > States > Edit State\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditStatesPage', baseContext);

    await zonesPage.goToSubTabStates(page);
    await statesPage.goToEditStatePage(page, 1);

    const pageTitle = await addStatePage.getPageTitle(page);
    expect(pageTitle).to.contains(addStatePage.pageTitleEdit);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'International > Taxes\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToTaxesPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.internationalParentLink,
      boDashboardPage.taxesLink,
    );

    const pageTitle = await taxesPage.getPageTitle(page);
    expect(pageTitle).to.contains(taxesPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'International > Taxes > Add Tax\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToNewTax', baseContext);

    await taxesPage.goToAddNewTaxPage(page);

    const pageTitle = await addTaxPage.getPageTitle(page);
    expect(pageTitle).to.contains(addTaxPage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'International > Taxes > Edit Tax\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditTaxesPage', baseContext);

    await addTaxPage.goToSubMenu(
      page,
      boDashboardPage.internationalParentLink,
      boDashboardPage.taxesLink,
    );
    await taxesPage.goToEditTaxPage(page, 1);

    const pageTitle = await addTaxPage.getPageTitle(page);
    expect(pageTitle).to.contains(addTaxPage.pageTitleEdit);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'International > TaxRules\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToTaxRulesPage', baseContext);

    await taxesPage.goToTaxRulesPage(page);

    const pageTitle = await taxRulesPage.getPageTitle(page);
    expect(pageTitle).to.contains(taxRulesPage.pageTitle);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'International > TaxRules > Add Tax Rule Group\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddTaxRulePageToCreate', baseContext);

    await taxRulesPage.goToAddNewTaxRulesGroupPage(page);

    const pageTitle = await addTaxRulesPage.getPageTitle(page);
    expect(pageTitle).to.contains(addTaxRulesPage.pageTitleCreate);

    const jsErrors = utilsPlaywright.getJsErrors();
    expect(jsErrors.length).to.equals(0);
  });

  it('should go to \'International > TaxRules > Edit Tax Rule Group\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToEditTaxRulesPage', baseContext);

    await taxesPage.goToTaxRulesPage(page);
    await taxRulesPage.goToEditTaxRulePage(page, 1);

    const pageTitle = await addTaxRulesPage.getPageTitle(page);
    expect(pageTitle).to.contains(addTaxRulesPage.pageTitleEdit);
  });

  it('should go to \'International > Translations\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToTranslationsPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.internationalParentLink,
      boDashboardPage.translationsLink,
    );

    const pageTitle = await boTranslationsPage.getPageTitle(page);
    expect(pageTitle).to.contains(boTranslationsPage.pageTitle);
  });
});

import {
  $,
  ElementFinder,
  ElementArrayFinder,
  by,
  element,
  browser,
  promise,
  ExpectedConditions
} from "protractor";
import { isError } from "util";
import { BasePage } from "./basePage";
import { StringUtils } from "../commonLib/stringUtils";
import { ElementUtils } from "../commonLib/elementUtils";

const prot = require("protractor");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

export class FeatureOverviewPage extends BasePage {
  public btnFeatureChannelOverview: ElementFinder;
  public iframeContent: ElementFinder;
  public lstFeatures: ElementArrayFinder;
  public elmFeatureValuesList: ElementFinder;
  public lstFeatureValuesItems: ElementArrayFinder;
  public lstCountryChannelList: ElementArrayFinder;

  constructor() {
    super();
    this.btnFeatureChannelOverview = element(
      by.xpath(
        "//span[@class='rmText'][contains(text(),'Feature / Channel Overview')]"
      )
    );

    this.iframeContent = element(
      by.id("ctl00_ctl00_BaseContent_Content_contentIFrame")
    );

    // this.elmFeatureList = element(
    //   by.xpath("//section[@class='features-list']")
    // );

    this.lstFeatures = element.all(
      by.xpath("//ul[@class='js-feature-list']/li")
    );

    // this.btnFeatureItemShow = element(
    //   by.xpath(
    //     "//ul[@class='js-feature-list']//span[.='{0}']/..//button[.='show']"
    //   )
    // );

    this.elmFeatureValuesList = element(
      by.xpath("//ul[@class='js-feature-value-list']")
    );

    this.lstFeatureValuesItems = element.all(
      by.xpath("//ul[@class='js-feature-value-list']/li")
    );

    this.lstCountryChannelList = element.all(
      by.xpath("//ul[@class='js-country-channel-list']/li")
    );
  }

  async navigateToFeatureOverview() {
    await ElementUtils.waitForClickableElement(this.btnMDM, 10000);
    await this.btnMDM.click();
    console.log("Master Data Management clicked");

    await ElementUtils.waitForClickableElement(this.btnShop, 5000);
    await this.btnShop.click();
    console.log("Shop button clicked");

    await ElementUtils.waitForClickableElement(
      this.btnFeatureChannelOverview,
      10000
    );
    await this.btnFeatureChannelOverview.click();
    console.log("Feature Channel Overview button clicked");

    expect(await this.iframeContent.isDisplayed()).to.be.true;
  }

  async selectFeatureAndVerifyValuesAndCC(
    featureName: string,
    featureValueCount: number,
    countryChannelListCount: number
  ) {
    await ElementUtils.waitForPresenceOfElement(this.iframeContent, 5000);
    await browser.switchTo().frame(await this.iframeContent.getWebElement());
    console.log("Switched to iFrame");

    await ElementUtils.waitForSubElementCountGreaterThanEqual(
      this.lstFeatures,
      1,
      20000
    );

    console.log("Feature Listed Loaded");

    const featureItem = element(
      by.xpath("//ul[@class='js-feature-list']//span[.='" + featureName + "']")
    );

    await ElementUtils.waitForPresenceOfElement(featureItem, 5000);
    expect(await featureItem.isDisplayed()).to.be.true;

    const btnFeatureItemShow = element(
      by.xpath(
        "//ul[@class='js-feature-list']//span[.='" +
          featureName +
          "']/..//button[.='show']"
      )
    );

    await ElementUtils.waitForClickableElement(btnFeatureItemShow, 5000);
    await btnFeatureItemShow.click();

    await ElementUtils.waitForPresenceOfElement(
      this.elmFeatureValuesList,
      5000
    );

    await ElementUtils.waitForSubElementCountGreaterThanEqual(
      this.lstFeatureValuesItems,
      1,
      5000
    );

    expect(await this.lstFeatureValuesItems.count()).to.equal(
      featureValueCount
    );

    await ElementUtils.waitForSubElementCountGreaterThanEqual(
      this.lstCountryChannelList,
      1,
      5000
    );

    expect(await this.lstCountryChannelList.count()).to.equal(
      countryChannelListCount
    );
  }

  async selectFeatureValue(btnName: string) {
    const btnFeatureValue = element(
      by.xpath(
        "//ul[@class='js-feature-value-list']//span[.='" +
          btnName +
          "']/..//button"
      )
    );

    await ElementUtils.clickElement(btnFeatureValue);
  }
}

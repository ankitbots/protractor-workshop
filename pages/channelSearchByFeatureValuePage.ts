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

export class ChannelSearchByFeatureValuePage extends BasePage {
  public pageName: ElementFinder;
  public lblFeatureValue: ElementFinder;
  public lblFeature: ElementFinder;
  public txtWincosCode: ElementFinder;
  public lstConditionNotFulfilledInCC: ElementArrayFinder;
  public btnSearch: ElementFinder;

  constructor() {
    super();
    this.pageName = element(
      by.xpath("//h2[text()='Channel search by Feature value']")
    );
    this.lblFeatureValue = element(
      by.xpath("//label[text()='Feature value: ']/following-sibling::span")
    );
    this.lblFeature = element(
      by.xpath("//label[text()='Feature: ']/following-sibling::span")
    );
    this.txtWincosCode = element(
      by.xpath("//span[.='Wincos Code : ']/following-sibling::input")
    );
    this.lstConditionNotFulfilledInCC = element.all(
      by.xpath("//ul[@class='js-channel-result-condition-not-fulfilled']/li")
    );
    this.btnSearch = element(by.xpath("//button[.='Search']"));
  }

  async verifyValues(featureValue: string, feature: string) {
    await ElementUtils.waitForPresenceOfElement(this.pageName, 5000);
    await browser.sleep(500);
    //expect(await this.lblFeatureValue.getText()).to.be.a(featureValue);
    await ElementUtils.waitForPresenceOfElement(this.lblFeature, 5000);
    expect(await this.lblFeature.getText()).to.equal(feature);

    await ElementUtils.waitForPresenceOfElement(this.lblFeatureValue, 5000);
    expect(await this.lblFeatureValue.getText()).to.equal(featureValue);
  }

  async searchWincosCodeAndVerifyCCNonFulFilled(
    wincosValue: string,
    ccNotFulFilledCount: number
  ) {
    await this.txtWincosCode.sendKeys(wincosValue);

    await ElementUtils.clickElement(this.btnSearch);
    await ElementUtils.waitForSubElementCountGreaterThanEqual(
      this.lstConditionNotFulfilledInCC,
      1,
      10000
    );

    expect(await this.lstConditionNotFulfilledInCC.count()).to.equal(
      ccNotFulFilledCount
    );
  }
}

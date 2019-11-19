import { ElementFinder, element, by, browser } from "protractor";
import { AllObjects } from "./allObjects";
import { ElementUtils } from "./elementUtils";
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

export class AllOperations {
  public allObject: AllObjects;

  constructor() {
    this.allObject = new AllObjects();
  }

  async clickOperation(objName: string) {
    console.log("In clickOperation");

    let flag: boolean = false;
    try {
      let _element = this.allObject.getObjectByName(objName);
      await ElementUtils.waitForClickableElement(_element, 10000);
      await _element.click();
      flag = true;
    } catch (e) {
    } finally {
      console.log("Exit clickOperation");
      return flag;
    }
  }

  async isDisplaying(objName: string) {
    console.log("In isDisplaying");
    let _element = this.allObject.getObjectByName(objName);
    await ElementUtils.waitForPresenceOfElement(_element, 5000);
    expect(await _element.isPresent()).to.be.true;
    console.log("Exit isDisplaying");
  }

  async switchTo(objName: string) {
    console.log("In switchTo");
    let flag: boolean = false;
    try {
      let _element = this.allObject.getObjectByName(objName);
      await ElementUtils.waitForPresenceOfElement(_element, 10000);
      await browser.switchTo().frame(_element.getWebElement());
      flag = true;
    } catch (e) {
    } finally {
      console.log("Exit switchTo");
      return flag;
    }
  }
  async clickListItemByValue(objName: string, _value: string) {
    console.log("In clickListItemByValue");
    let flag: boolean = false;
    try {
      let _element = this.allObject.getObjectByName(objName, _value);
      await ElementUtils.waitForPresenceOfElement(_element, 10000);
      await _element.click();
      flag = true;
    } catch (e) {
    } finally {
      console.log("Exit clickListItemByValue");
      return flag;
    }
  }

  async wait(timeToWait: string) {
    let flag: boolean = false;
    try {
      await browser.sleep(Number(timeToWait));
      flag = true;
    } catch (e) {
    } finally {
      return flag;
    }
  }

  async verifyCountOfItemsInList(objName: string, _value: number) {
    let _elements = this.allObject.getObjectsByName(objName);
    await ElementUtils.waitForSubElementCountGreaterThanEqual(
      _elements,
      1,
      10000
    );

    expect(await _elements.count()).to.equal(_value);
  }
}

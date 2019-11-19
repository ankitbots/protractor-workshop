import {
  $,
  ElementFinder,
  by,
  element,
  browser,
  promise,
  ExpectedConditions,
  ElementArrayFinder
} from "protractor";
import { runInThisContext } from "vm";
import { async } from "q";
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

export class ElementUtils {
  static async waitForClickableElement(
    _element: ElementFinder,
    duration: number
  ) {
    await browser.wait(
      ExpectedConditions.elementToBeClickable(_element),
      duration
    );
  }

  static async waitForPresenceOfElement(
    _element: ElementFinder,
    duration: number
  ) {
    console.log("In waitForPresenceOfElement");
    await browser
      .wait(ExpectedConditions.presenceOf(_element), duration)
      .catch(err => {
        console.log("Error in waitForPresenceOfElement function");
      });
    console.log("Exit waitForPresenceOfElement");
  }

  static async waitForVisibilityOfElement(
    _element: ElementFinder,
    duration: number
  ) {
    await browser.wait(ExpectedConditions.visibilityOf(_element), duration);
  }

  static async waitForSubElementCountGreaterThanEqual(
    _elements: ElementArrayFinder,
    _expectedCount: number,
    duration: number
  ) {
    console.log("In waitForSubElementCountGreaterThanEqual");
    await browser.sleep(1000);
    let flag = false;
    await browser
      .wait(async () => {
        flag = _expectedCount <= (await _elements.count());
        console.log(flag);
        return flag;
      }, duration)
      .catch(err => {
        console.log("Error in waitForSubElementCountGreaterThanEqual");
      });
    console.log("Exit waitForSubElementCountGreaterThanEqual");
    return flag;
  }

  // static async waitForCountGreaterThan(
  //   _elements: ElementArrayFinder,
  //   expectedCount: number
  // ) {
  //   try {
  //     await browser.sleep(1000);
  //     const actualCount = await _elements.count();
  //     console.log(actualCount, "actual count");

  //     return expectedCount <= actualCount;
  //   } catch (err) {
  //     return false;
  //   }
  // }

  static isElementNotExist(_element: ElementFinder, duration: number): any {
    return browser
      .wait(ExpectedConditions.invisibilityOf(_element), duration)
      .then(() => true, () => false);
  }

  static getChildWithXpath(objParent: ElementFinder, childObjXpath: string) {
    return objParent.element(by.xpath(childObjXpath));
  }

  static async clickElement(_element: ElementFinder) {
    try {
      console.log("In clickElement");
      await ElementUtils.waitForClickableElement(_element, 5000);
      await _element.click();
      console.log("Exit clickElement");
    } catch (err) {
      console.log("Error in clicking element");
    }
  }

  // static async verifyTextInElement(_element: ElementFinder, _value: string) {
  //   try {
  //     await ElementUtils.waitForVisibilityOfElement(_element, 5000);
  //     (await _element.getText()) === _value;
  //   } catch (err) {
  //     console.log("Error in feaching text");
  //   }
  // }
}

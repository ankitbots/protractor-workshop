import { $, browser, by, protractor, element, ElementFinder } from "protractor";
import { downloadPath } from "../config/conf";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const prot = require("protractor");
const expect = chai.expect;
let fs = require("fs");
let path = require("path");

export abstract class BasePage {
  public btnMDM: ElementFinder;
  public btnShop: ElementFinder;

  constructor() {
    this.btnMDM = element(
      by.xpath("//span[contains(text(),'Master Data Management')]")
    );
    this.btnShop = element(
      by.xpath(
        "//span[contains(text(),'Master Data Management')]/../../..//span[@class='rpText' and .='Shop']"
      )
    );
  }

  async selectTab(tabNr: number) {
    console.log("The index of the target tab is: " + tabNr);
    await browser.getAllWindowHandles().then(async function(handles) {
      const popUpHandle = handles[tabNr];
      await browser.driver.switchTo().window(popUpHandle);
    });
  }

  async checkTitle(expectedTitle: String) {
    return browser.getTitle().then(function(currentTitle) {
      console.log("Current title is: " + currentTitle);
      expect(currentTitle).to.equal(expectedTitle);
    });
  }

  async goBackToPreviousPage() {
    prot.browser.navigate().back();
  }

  async waitForTheLoadingindicator() {
    let EC = protractor.ExpectedConditions;
    await browser.wait(
      EC.visibilityOf(element(by.className("[ c-page-header__title ]"))),
      100000
    );
    await browser.wait(
      EC.invisibilityOf(element(by.tagName("x-loading-indicator"))),
      100000
    );
  }

  async waitForPopUpTODisapear() {
    let EC = protractor.ExpectedConditions;
    // await browser.wait(EC.invisibilityOf(element(by.className(''))))
  }

  async slowBrowser(seconds: number) {
    await prot.browser.sleep(seconds * 1000);
  }

  // async goto2ndTab() {
  //     await browser.getAllWindowHandles().then(async function (handles) {
  //         const parentHandle = handles[0];
  //         const popUpHandle = handles[1];
  //         await browser.driver.switchTo().window(popUpHandle);
  //     })
  // }

  async emptyDownloadsDir() {
    fs.readdir(downloadPath, (err: Error, files: string[]) => {
      if (!err) {
        for (let file of files) {
          fs.unlink(path.join(downloadPath, file), (error: Error) => {
            if (error) {
              throw error;
            }
          });
        }
      }
    });
  }

  async fileExist(fileName: string) {
    let a = fs.existsSync(path.join(downloadPath, fileName));
    expect(a).to.be.true;
  }

  getElementByClassIncludingText(className: string, textInclude: string) {
    return element
      .all(by.className(className))
      .filter(elem => elem.getText().then(text => text.includes(textInclude)))
      .first();
  }

  async expectElementIsPresent(element: ElementFinder) {
    expect(await element.isPresent()).to.be.true;
  }

  async expectElementIsNotPresent(element: ElementFinder) {
    expect(await element.isPresent()).to.be.false;
  }
  async expectElementIsDisplayed(element: ElementFinder) {
    expect(await element.isDisplayed()).to.be.true;
  }
  async expectElementIsNotDisplayed(element: ElementFinder) {
    expect(await element.isDisplayed()).to.be.false;
  }
  async expectElementIsEnabled(element: ElementFinder) {
    expect(await element.isEnabled()).to.be.true;
  }
  async expectElementIsNotEnabled(element: ElementFinder) {
    const result = await element.getCssValue("pointer-events");
    expect(result === "none").to.be.true;
  }

  async expectElementIsSelected(element: ElementFinder) {
    expect(await element.isSelected()).to.be.true;
  }
  async expectElementIsNotSelected(element: ElementFinder) {
    expect(await element.isSelected()).to.be.false;
  }

  stringComaSplit(text: string) {
    let splitted = text.split(",");
    return splitted;
  }
  //function will return day format in yyyymmdd
  getDayFormat() {
    let d = new Date();
    let month = d.getMonth();
    let date = d.getDate();
    let monthString;
    let dateString;
    if (month < 9) {
      monthString = "0" + String(month + 1);
    } else {
      monthString = String(month + 1);
    }

    if (date < 9) {
      dateString = "0" + String(date);
    } else {
      dateString = String(date);
    }

    let day = String(d.getFullYear()) + monthString + dateString;
    return day;
  }
}

import {
  $,
  ElementFinder,
  by,
  element,
  browser,
  promise,
  ExpectedConditions
} from "protractor";
import { isError } from "util";
import { StringUtils } from "../commonLib/stringUtils";
import { ElementUtils } from "../commonLib/elementUtils";
import * as dotenv from "dotenv";
import { _URL, _USERNAME, _PASSWORD } from "./conf";

const prot = require("protractor");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

export class LoginPage {
  public btnLogin: ElementFinder;
  public btnLogout: ElementFinder;
  public txtUserName: ElementFinder;
  public txtPassword: ElementFinder;
  public loginWindow: ElementFinder;

  constructor() {
    this.txtUserName = element(by.id("ctl00_BaseContent_Login_UserName"));
    this.txtPassword = element(by.id("ctl00_BaseContent_Login_Password"));
    this.btnLogin = element(by.id("ctl00_BaseContent_Login_LoginButton"));
    this.loginWindow = element(
      by.xpath("//span[contains(text(),'Intranet-Login')]")
    );
    this.btnLogout = element(by.id("ctl00_infoPanel_Logout_Button"));
  }

  async openBrowser() {
    browser.ignoreSynchronization = true;

    if (StringUtils.isEmpty(String(_URL))) {
      throw new Error(`URL cannot be blank`);
    }
    console.log("Opening URL ", _URL);
    await browser.get(String(_URL));

    await browser.driver
      .manage()
      .window()
      .maximize();
  }

  async loginToApplication() {
    if (!_USERNAME || !_PASSWORD) {
      throw new Error(`Username or Password cannot be empty`);
    }

    ElementUtils.waitForPresenceOfElement(this.txtUserName, 5000);

    await this.txtUserName.sendKeys(_USERNAME);
    await this.txtPassword.sendKeys(_PASSWORD);

    ElementUtils.waitForClickableElement(this.btnLogin, 5000);
    await this.btnLogin.click();
    console.log("Login button clicked");
  }
}

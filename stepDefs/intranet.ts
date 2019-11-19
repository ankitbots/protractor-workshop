"use strict";
import { Before, Given, Then, When, After } from "cucumber";
import { LoginPage } from "../pages/loginPage";
import { FeatureOverviewPage } from "../pages/featureOverviewPage";
import { ChannelSearchByFeatureValuePage } from "../pages/channelSearchByFeatureValuePage";
import { AllOperations } from "../commonLib/AllOperations";
import { browser, element, By } from "protractor";
import { async } from "q";
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(120 * 1000);

let login: LoginPage;
let featureOverview: FeatureOverviewPage;
let channelSearchByFeatureValuePage: ChannelSearchByFeatureValuePage;
let allOperations: AllOperations;

Before(() => {
  login = new LoginPage();
  featureOverview = new FeatureOverviewPage();
  channelSearchByFeatureValuePage = new ChannelSearchByFeatureValuePage();
  allOperations = new AllOperations();
});

// It will execute after all scenarios and if any scenario failed then it will add scrrenshot a at failed step in cucumber reports
After(function(scenarioResult: { result: { status: string } }) {
  if (scenarioResult.result.status === "failed") {
    let self = this;
    return browser.takeScreenshot().then(function(base64png: any) {
      self.attach(Buffer.from(base64png, "base64"), "image/png");
    });
  }
});

Given("Login to intranet", async () => {
  await login.openBrowser();
  await login.loginToApplication();
  //await login.goToOtherAccount();
  // await login.loginToInsight();
  // await landing.emptyDownloadsDir();
  // await landing.slowBrowser(10);
});

When("User navigates to {string}", async (btnName: string) => {
  if (btnName === "Feature_Channel_Overview") {
    await featureOverview.navigateToFeatureOverview();
  } else {
  }
});

When(
  "User select a feature {string} has value {string} and used in {string} country channels",
  async (
    featureName: string,
    featureValueCount: string,
    countryChannelsCount: string
  ) => {
    await featureOverview.selectFeatureAndVerifyValuesAndCC(
      featureName,
      Number(featureValueCount),
      Number(countryChannelsCount)
    );
  }
);

When("User click feature value {string}", async (btnName: string) => {
  await featureOverview.selectFeatureValue(btnName);
});

When(
  "User verify feature value {string} and feature {string}",
  async (featureValue: string, feature: string) => {
    await channelSearchByFeatureValuePage.verifyValues(featureValue, feature);
  }
);

When(
  "User search with Wincos Code {string} and verify conditions not fulfilled in country channels count as {string}",
  async (wincosValue: string, ccNotFulFilledCount: string) => {
    await channelSearchByFeatureValuePage
      .searchWincosCodeAndVerifyCCNonFulFilled(
        wincosValue,
        Number(ccNotFulFilledCount)
      )
      .catch(err => {
        console.log("Promise Error");
      });
  }
);

When("User click {string}", async (btnName: string) => {
  let flag: boolean = await allOperations.clickOperation(btnName).catch(err => {
    console.log("Promise Error");
    return false;
  });
  expect(flag).to.be.true;
});

Then("Verify {string} is displaying", async (objName: string) => {
  await allOperations.isDisplaying(objName).catch(err => {
    console.log("Promise Error");
  });
});

Then("Switch To iFrame {string}", async (objName: string) => {
  let flag: boolean = await allOperations.switchTo(objName).catch(err => {
    console.log("Promise Error");
    return false;
  });
  expect(flag).to.be.true;
});

When(
  "User click {string} value {string} item",
  async (objName: string, _value: string) => {
    await allOperations.clickListItemByValue(objName, _value).catch(err => {
      console.log("Promise Error");
    });
  }
);

Then("Wait {string}", async (timeToWait: string) => {
  let flag: boolean = await allOperations.wait(timeToWait).catch(err => {
    console.log("Promise Error");
    return false;
  });
  expect(flag).to.be.true;
});

Then(
  "Verify {string} has {string} items",
  async (objName: string, _value: string) => {
    await allOperations
      .verifyCountOfItemsInList(objName, Number(_value))
      .catch(err => {
        console.log("Promise Error");
      });
  }
);

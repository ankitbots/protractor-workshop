"use strict";
import { browser, Config } from "protractor";
declare const require: any;
let path = require("path");
export const downloadPath = path.resolve(__dirname, "Downloads");

export const config: Config = {
  allScriptsTimeout: 100000,
  SELENIUM_PROMISE_MANAGER: false,

  multiCapabilities: [
    // {
    //    'browserName': 'internet explorer',
    //    'platform': 'ANY',
    //    'version': '11',
    // }
    {
      browserName: "chrome",
      chromeOptions: {
        args: ["incognito"],
        prefs: {
          download: {
            prompt_for_download: false,
            directory_upgrade: true,
            default_directory: downloadPath
          }
        }
      }
    }
    // {
    //   browserName: "firefox",
    //   "moz:firefoxOptions": {
    //     args: ["incognito"],
    //     prefs: {
    //       "browser.download.folderList": 2,
    //       "browser.download.dir": downloadPath,
    //       "services.sync.prefs.sync.browser.download.useDownloadDir": true,
    //       "browser.download.useDownloadDir": true,
    //       "browser.helperApps.neverAsk.saveToDisk":
    //         "application/vnd.openxmlformats-officedocument.presentationml.presentation;charset=UTF-8,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    //     }
    //   }
    // }
  ],

  plugins: [
    {
      // cucumber reporting plugin
      package: "protractor-multiple-cucumber-html-reporter-plugin",
      options: {
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        displayDuration: true
      }
    }
  ],

  maxSessions: 1,
  framework: "custom",
  restartBrowserBetweenTests: true,
  frameworkPath: require.resolve("protractor-cucumber-framework"),

  //specs: ["../../features/*.feature", "../../features/APIs/*.feature"],
  specs: ["../../features/*.feature"],

  onPrepare: () => {
    browser.ignoreSynchronization = true;
    browser.manage().deleteAllCookies();
    browser
      .manage()
      .window()
      .maximize();
    require("ts-node").register({ project: "./tsconfig.json" });
  },

  cucumberOpts: {
    compiler: "ts:ts-node/register",
    format: "json:./report/cucumberReport.json",
    strict: true,
    require: ["../../transpiled/stepDefs/*.js"],
    tags: ["@DeclarativeStyle or @ImperativeStyle"]
  }
};

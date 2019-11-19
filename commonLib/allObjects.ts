import { ElementFinder, element, by, ElementArrayFinder } from "protractor";

export class AllObjects {
  constructor() {}

  getObjectByName(objectName: string, _value?: string) {
    let _element: any;
    try {
      switch (objectName) {
        case "btnMDM":
          _element = element(
            by.xpath("//span[contains(text(),'Master Data Management')]")
          );
          break;

        case "btnShop":
          _element = element(
            by.xpath(
              "//span[contains(text(),'Master Data Management')]/../../..//span[@class='rpText' and .='Shop']"
            )
          );
          break;

        case "shopPage":
          _element = element(
            by.xpath(
              "//head[@id='ctl00_ctl00_Head1']/title[contains(text(),'Shop')]"
            )
          );
          break;

        case "btnFeatureChannelOverview":
          _element = element(
            by.xpath(
              "//span[@class='rmText'][contains(text(),'Feature / Channel Overview')]"
            )
          );
          break;

        case "featureChannelOverviewPage":
          _element = element(
            by.xpath(
              "//head[@id='ctl00_ctl00_Head1']/title[contains(text(),'Feature / Channel Overview')]"
            )
          );
          break;

        case "sectionFeatureOverview":
          _element = element(
            by.id("ctl00_ctl00_BaseContent_Content_contentIFrame")
          );
          break;

        case "liFeatureItem":
          _element = element(
            by.xpath("//ul[@class='js-feature-list']//span[.='" + _value + "']")
          );
          break;

        case "btnFeatureValueList":
          _element = element(
            by.xpath(
              "//ul[@class='js-feature-value-list']//span[.='" +
                _value +
                "']/..//button"
            )
          );
          break;
        default:
          break;
      }
    } catch (err) {
      console.log("Error in retriving object");
    } finally {
      return _element as ElementFinder;
    }
  }

  getObjectsByName(objectName: string, _value?: string) {
    let _element: any;
    try {
      switch (objectName) {
        case "lstFeatureValue":
          _element = element.all(
            by.xpath("//ul[@class='js-feature-value-list']/li")
          );
          break;

        case "lstCountryChannel":
          _element = element.all(
            by.xpath("//ul[@class='js-country-channel-list']/li")
          );
          break;

        default:
          break;
      }
    } catch (err) {
      console.log("Error in retriving objects");
    } finally {
      return _element as ElementArrayFinder;
    }
  }
}

import * as dotenv from "dotenv";

dotenv.config();
let path;
console.info(`env is '${process.env.NODE_ENV}'`);
switch (process.env.NODE_ENV) {
  case "dev":
    path = `.env.dev`;
    break;
  case "prod":
    path = `.env.prod`;
    break;
  case "maint":
    path = `.env.maint`;
    break;
  default:
    path = `.env.test`;
}
console.info(`Using env config file '${path}'`);
dotenv.config({ path: path });

export let _URL = process.env._INTRANET_URL;
export let _USERNAME = process.env._USERNAME;
export let _PASSWORD = process.env._PASSWORD;

export let userProfileService_URL = process.env.UserProfileServices_URL;
export let jiraService_URL = process.env.JiraServices_URL;
export let fileExportService_URL = process.env.FileExportServices_URL;

export let notificationService_URL = process.env.NotificationServices_URL;
export let userProfileServices_Machine =
  process.env.UserProfileServices_Machine;
export let jiraService_Machine = process.env.JiraServices_Machine;

export let notificationService_Machine =
  process.env.NotificationServices_Machine;
export let fileExportService_Machine = process.env.FileExportServices_Machine;
export let application_URL = process.env.INSIGHTUI_TEST_URL;

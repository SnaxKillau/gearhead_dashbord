import { createStore } from "vuex";
import reportModule from "../vuex/modules/report";
import brandModule from "./modules/brand";
import transformationModule from "./modules/transformation";
import colorModule from "./modules/color"
import conditionModule from "./modules/condition"
import tranmissionModule from "./modules/tranmission";
import orderModule from "./modules/order";
import invoiceModule from "./modules/invoice";
import notificationModule from "./modules/notification";

const store = createStore({
 modules: {
  report : reportModule,
  brand : brandModule,
  transformation : transformationModule,
  color : colorModule,
  condition : conditionModule,
  tranmission : tranmissionModule,
  order : orderModule,
  invoice : invoiceModule,
  notification : notificationModule
 }
});

export default store;
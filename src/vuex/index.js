import { createStore } from "vuex";
import reportModule from "../vuex/modules/report";
import brandModule from "./modules/brand";
import transformationModule from "./modules/transformation";
import colorModule from "./modules/color"
import conditionModule from "./modules/condition"
import tranmissionModule from "./modules/tranmission";

const store = createStore({
 modules: {
  report : reportModule,
  brand : brandModule,
  transformation : transformationModule,
  color : colorModule,
  condition : conditionModule,
  tranmission : tranmissionModule
 }
});

export default store;
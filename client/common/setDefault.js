import "../asset/font/fontawesome-free-6.4.2-web/css/all.min.css";
import "../asset/css/base.css";
import "../asset/css/main.css";
import {drawColumns} from "./utils/array.js";

const sliderDefaultValue = 50;
const sliderMaxColsNumber = 150;
const sliderMinColsNumber = 0;

const colsNumberDisplay = document.getElementById("body__sidebar__col-num");
const slider = document.getElementById("body__sidebar__slider");

colsNumberDisplay.innerHTML = sliderDefaultValue;
slider.setAttribute("min", sliderMinColsNumber);
slider.setAttribute("max", sliderMaxColsNumber);
slider.setAttribute("value", sliderDefaultValue);

drawColumns(sliderDefaultValue);

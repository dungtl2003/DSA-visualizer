"use strict";

import "../asset/font/fontawesome-free-6.4.2-web/css/all.min.css";
import "../asset/css/base.css";
import "../asset/css/main.css";
import "../asset/css/support.css";
import {drawColumns} from "./array.js";

const sliderDefaultValue = 5;
const sliderMaxColsNumber = 150;
const sliderMinColsNumber = 5;

const colsNumberDisplay = document.getElementById("body__sidebar__col-num");
const slider = document.getElementById("body__sidebar__slider");

colsNumberDisplay.innerHTML = sliderDefaultValue;
slider.setAttribute("value", sliderDefaultValue);
slider.setAttribute("min", sliderMinColsNumber);
slider.setAttribute("max", sliderMaxColsNumber);

colsNumberDisplay.setAttribute("min", sliderMinColsNumber);
colsNumberDisplay.setAttribute("max", sliderMaxColsNumber);
colsNumberDisplay.setAttribute("value", sliderDefaultValue);

drawColumns(sliderDefaultValue);

export {sliderDefaultValue, sliderMinColsNumber, sliderMaxColsNumber};

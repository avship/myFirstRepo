"use strict";

const [title] = document.getElementsByTagName("h1");
const [startBtn, resetBtn] = document.getElementsByClassName("handler_btn");
const buttonPlus = document.querySelector(".screen-btn");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector('.rollback input[type="range"]');
const inputRangeValue = document.querySelector(
  '.rollback span[class="range-value"]'
);
const [total, totalCount, totalCountOther, fullTotalCount, totalCountRollback] =
  document.getElementsByClassName("total-input");

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: false,
  count: 0,

  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  servicesPercent: {},
  servicesNumber: {},
  servicePrice: 0,
  calcPressed: false,
  init: function () {
    this.addTitle();
    this.rangeUpdater();
    startBtn.addEventListener("click", this.start);
    buttonPlus.addEventListener("click", this.addScreensBlock);
    inputRange.addEventListener("input", this.rangeUpdater);
  },
  rangeUpdater: function () {
    inputRangeValue.textContent = `${inputRange.value}%`;
    appData.rollback = +inputRange.value;
    if (appData.calcPressed) {
      appData.addPrices();
      appData.showResult();
    }
  },
  addScreensBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.querySelector("input").value = "";
    cloneScreen.querySelector("select").selectedIndex = 0;
    screens[screens.length - 1].after(cloneScreen);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  screensDataChecker: function () {
    screens = document.querySelectorAll(".screen");
    let flag = false;
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      if (input.value === "" || select.selectedIndex === 0) {
        flag = true;
      }
    });

    if (flag) {
      alert(
        "Не заполнены информация об экранах или в поле количество экранов введены не цифры"
      );
      return false;
    }
    return true;
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
      this.count += +input.value;
    });
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addPrices: function () {
    this.screenPrice = appData.screens.reduce(
      (previousValue, currentValue) => previousValue + +currentValue.price,
      0
    );
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;
    for (const key in this.servicesNumber) {
      this.servicePricesNumber += +this.servicesNumber[key];
    }
    for (const key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }
    this.fullPrice =
      this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePercentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);
    totalCountRollback.value = this.servicePercentPrice;
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;

    fullTotalCount.value = this.fullPrice;
    totalCount.value = this.count;
  },
  disableFields: function () {
    startBtn.setAttribute("disabled", "");
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen) => {
      const input = screen.querySelector("input");
      const select = screen.querySelector("select");
      input.setAttribute("disabled", "true");
      select.setAttribute("disabled", "true");
    });
    otherItemsPercent.forEach((item) => {
      const input = item.querySelector("input");
      input.setAttribute("disabled", "true");
    });
    otherItemsNumber.forEach((item) => {
      const input = item.querySelector("input");
      input.setAttribute("disabled", "true");
    });
  },
  start: function () {
    if (!appData.screensDataChecker()) {
      return;
    }

    appData.count = 0;
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    appData.calcPressed = true;
    appData.disableFields();
    resetBtn.style.display = "block";
    resetBtn.parentElement.style.justifyContent = "space-between";
    startBtn.style.backgroundColor = "#dcdcdc";
    resetBtn.addEventListener("click", (event) => {
      resetBtn.style.display = "none";
      resetBtn.parentElement.style.justifyContent = "center";
      startBtn.style.backgroundColor = "#A52A2A";
    });
  },
};

appData.init();

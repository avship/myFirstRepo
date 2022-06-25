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
    appData.addTitle();
    appData.rangeUpdater();
    startBtn.addEventListener("click", appData.start);
    buttonPlus.addEventListener("click", appData.addScreensBlock);
    inputRange.addEventListener("input", appData.rangeUpdater);
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
    screens.forEach(function (screen, index) {
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
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
      appData.count += +input.value;
    });
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(
      (previousValue, currentValue) => previousValue + +currentValue.price,
      0
    );
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;
    for (const key in appData.servicesNumber) {
      appData.servicePricesNumber += +appData.servicesNumber[key];
    }
    for (const key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice =
      appData.screenPrice +
      appData.servicePricesPercent +
      appData.servicePricesNumber;

    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
    totalCountRollback.value = appData.servicePercentPrice;
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;

    fullTotalCount.value = appData.fullPrice;
    totalCount.value = appData.count;
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
  },
};

appData.init();

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
    resetBtn.addEventListener("click", this.reset);
  },
  rangeUpdater: function () {
    //console.log("rangeUpdater", this);
    inputRangeValue.textContent = `${inputRange.value}%`;
    appData.rollback = +inputRange.value;
    if (appData.calcPressed) {
      appData.addPrices();
      appData.showResult();
    }
  },
  addScreensBlock: function () {
    screens = document.querySelectorAll(".screen");
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
    this.screenPrice = this.screens.reduce(
      (previousValue, currentValue) => previousValue + +currentValue.price,
      0
    );
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;
    for (const key in appData.servicesNumber) {
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
    totalCountRollback.value = Math.floor(this.servicePercentPrice + 0.5);
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;

    fullTotalCount.value = this.fullPrice;
    totalCount.value = this.count;
  },
  block: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((item) => {
      const tempSelect = item.querySelector("select");
      const tempInput = item.querySelector("input");
      tempSelect.setAttribute("disabled", "true");
      tempInput.setAttribute("disabled", "true");
    });
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
  },
  reset: function () {
    startBtn.style.display = "block";
    resetBtn.style.display = "none";

    screens = document.querySelectorAll(".screen");
    for (let i = screens.length - 1; i > 0; i--) {
      screens[i].remove();
    }
    screens[0].querySelector("input").removeAttribute("disabled");
    screens[0].querySelector("input").value = "";
    screens[0].querySelector("select").removeAttribute("disabled");
    screens[0].querySelector("select").value = "";
    total.value = "0";
    totalCount.value = "0";
    totalCountOther.value = "0";
    fullTotalCount.value = "0";
    totalCountRollback.value = "0";

    otherItemsPercent.forEach((item) => {
      item.querySelector("input").checked = false;
    });
    otherItemsNumber.forEach((item) => {
      item.querySelector("input").checked = false;
    });
    appData.servicesPercent = {};
    appData.servicesNumber = {};
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
    appData.block();
  },
};

appData.init();

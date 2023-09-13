/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calcCalories)
/* harmony export */ });
function calcCalories() {
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) { 
    sex = localStorage.getItem('sex')
  } else {
    sex = 'female';
    localStorage.setItem('sex', sex)
  }
 
  if (localStorage.getItem('data-ratio')) {
    sex = localStorage.getItem('data-ratio')
  } else {
    ratio = 1.375
    localStorage.setItem('ratio', ratio)
  }

  calcTotal();

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '______';
      return;
    }
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  function getSexAndActivity(selector, classActivity) {
    const wrapperPropse = document.querySelector(`${selector}`);
    wrapperPropse.addEventListener('click', (e) => {
      if (e.target !== wrapperPropse) {
        wrapperPropse.querySelectorAll(`.${classActivity}`)
          .forEach(element => element.classList.remove(`${classActivity}`));
        e.target.classList.add(classActivity);
      }
      if (e.target.getAttribute('data-sex')) {
        sex = e.target.getAttribute('data-sex');
        localStorage.setItem('sex', sex)
      } else {
        ratio = +e.target.getAttribute('data-ratio');
        localStorage.setItem('ratio', ratio)
      }
      calcTotal()
    })
  }
  getSexAndActivity('.calculating__choose', 'calculating__choose-item_active');
  getSexAndActivity('.calculating__choose_big', 'calculating__choose-item_active');

  function getPersonalValue(selector) {
    const inputs = document.querySelectorAll(selector);
    
    inputs.forEach(element => {
      element.addEventListener('input', (e) => {
        if (e.target.value.match(/\D/g)) {
          e.target.style.border = '1px solid red';
        } else {
          e.target.style.border = '';
        }

        switch (e.target.id) {
          case 'weight': {
            weight = e.target.value
            break;
          }
          case 'height': {
            height = e.target.value;
            break;
          }
          case 'age': {
            age = e.target.value;
            break;
          }
        }
        calcTotal();
      })
    })
  }

  getPersonalValue('.calculating__choose_medium');
  
}

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCards)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function getCards() {
  class MenuCard {
    constructor(src, alt, name, textContent, price, exchange, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.name = name;
      this.textContent = textContent;
      this.price = price;
      this.exchange = exchange;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.priceConvertToUA();
      this.render();
    }

    priceConvertToUA() {
      this.price = this.price * this.exchange;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0 || !this.classes.includes('menu__item')) {
        this.classes.push('menu__item');
      }
      this.classes.forEach(className => element.classList.add(className))
      element.innerHTML = `
        <img src= ${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">Меню ${this.name}</h3>
        <div class="menu__item-descr">${this.textContent}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> UAH/day</div>
        </div>
        `;
      this.parent.append(element)
    }
  }
  document.querySelector('.menu .container').style.alignItems = 'stretch';


  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('https://ihor-novakovskyi.github.io/Food-Project/db.json')
    .then(({menu}) => {
      menu.forEach(({ img, altimg, title, descr, price }) => {
        console.log(descr)
        new MenuCard(img, altimg, title, descr, price, 40, '.menu .container')
      })
    }).catch(data => console.log('its catch data -----', data))

}

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sendForm)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function sendForm(modalSelector) {   
    const message = {
        loading: '/img/spinner.svg',
        success: 'Thank you! We will contact you soon!',
        error: 'Sorry, we have some problems with server'
    };
    const forms = document.querySelectorAll('form');

    forms.forEach((el) => postData(el, modalSelector));



    function postData(form, modalSelector) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const objRequest = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.sendingData)('http://localhost:3000/requests', objRequest)
                .then((data) => {
                    statusMessage.remove();
                    showthanksModal(message.success, modalSelector);
                })
                .catch(() => showthanksModal(message.error, modalSelector))
                .finally(() => form.reset());
        });
    }

    function showthanksModal(message, modalSelector) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(modalSelector);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
            </div>
            `;
        document.querySelector(modalSelector).append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
        }, 2000)
    }
}

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (/* binding */ modal),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
    
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}
function modal(btnShowModalSelector, modalSelector) {
    const btnShowModal = document.querySelectorAll(btnShowModalSelector),
        modal = document.querySelector(modalSelector);

    btnShowModal.forEach((btn) => btn.addEventListener('click', () => showModal(modalSelector, modalTimerId)));

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    })

    let modalTimerId = setTimeout(() => showModal(modalSelector, modalTimerId), 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });
function slider({imgSelector, prevButtonSelector, nextButtonSelector,currentSlideNumber, slideTotalId, wrapperSelector, sliderBox}) {
  const sliderImgs = document.querySelectorAll(imgSelector),
    prevSlideButton = document.querySelector(prevButtonSelector),
    nextSlideButton = document.querySelector(nextButtonSelector),
    currenSlide = document.getElementById(currentSlideNumber),
    totalSlide = document.getElementById(slideTotalId),
    slidesWrapper = document.querySelector(wrapperSelector),
    slidesField = document.querySelector(sliderBox),
    slideWidth = window.getComputedStyle(slidesWrapper).width;
  let numberSlide = 1,
    positionSlide = 0;
  slidesField.style.width = `${100 * sliderImgs.length}%`;
  sliderImgs.forEach(slide => slide.style.width = slideWidth);
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all'
  slidesWrapper.style.overflow = 'hidden';
  currenSlide.textContent = `0${numberSlide}`;

  if (sliderImgs.length < 10) totalSlide.textContent = `0${sliderImgs.length}`;
  else totalSlide.textContent = sliderImgs.length;

  nextSlideButton.addEventListener('click', () => {
    if (numberSlide === sliderImgs.length) {
      positionSlide = 0;
      numberSlide = 1;
    } else {
      positionSlide = -1 * (numberSlide) * +slideWidth.match(/\d/g).join('');
      numberSlide++;
    }
    slidesField.style.transform = `translateX(${positionSlide}px)`;
    if (numberSlide < 10) currenSlide.textContent = `0${numberSlide}`
    else currenSlide.textContent = numberSlide;
    showSlidesIndicate();
  })


  prevSlideButton.addEventListener('click', () => {
    if (numberSlide === 1) {
      positionSlide = -1 * (sliderImgs.length - 1) * +slideWidth.match(/\d/g).join('');
      numberSlide = sliderImgs.length;
    } else {
      numberSlide--;
      positionSlide += +slideWidth.match(/\d/g).join('');
    }
    slidesField.style.transform = `translateX(${positionSlide}px)`;
    if (numberSlide < 10) currenSlide.textContent = `0${numberSlide}`
    else currenSlide.textContent = numberSlide;
    showSlidesIndicate();
  })

  //slider indicator

  const slideBox = document.createElement('div');
  slideBox.classList.add('carousel-indicators');
  document.querySelector('.offer__slider').insertAdjacentElement('afterbegin', slideBox);
  document.querySelector('.offer__slider').style.position = 'relative';
  sliderImgs.forEach(() => {
    const slideIndicator = document.createElement('div');

    slideIndicator.classList.add('dot');
    slideIndicator.addEventListener('click', (e) => {
      slideBox.querySelectorAll('.dot').forEach((ind, index) => {
        if (e.target === ind) {
          positionSlide = -1 * index * +slideWidth.match(/\d/g).join('');
          numberSlide = index + 1;
          slidesField.style.transform = `translateX(${positionSlide}px)`;
          if (numberSlide < 10) currenSlide.textContent = `0${numberSlide}`
          else currenSlide.textContent = numberSlide;
          showSlidesIndicate()
        }
      })
    })
    slideBox.append(slideIndicator)
  })


  function showSlidesIndicate() {
    for (let ind of slideBox.querySelectorAll('.dot')) {
      ind.style.backgroundColor = 'white';
    }
    slideBox.querySelectorAll('.dot')[numberSlide - 1].style.backgroundColor = '#54ed39';
  }
  showSlidesIndicate();
}



/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tabs)
/* harmony export */ });
function tabs(tabsWrapperSelector, tabsLinkSelector, tabContentSelector, activeClass) {    
    const tabsWrapper = document.querySelector(tabsWrapperSelector);
    const tabsBox = tabsWrapper.querySelectorAll(tabsLinkSelector);
    const tabsContent = document.querySelectorAll(tabContentSelector);
//
    function hideInfo() {
        tabsBox.forEach(element => {
            element.classList.remove(activeClass);
        })

        tabsContent.forEach(element => {
            element.classList.remove('show');
            element.classList.add('hide');
        })
    }

    function showInfo(i = 0) {
        tabsBox[i].classList.add(activeClass);
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
    }
    hideInfo();
    showInfo();

    tabsWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains(tabsLinkSelector.slice(1))) {
            tabsBox.forEach((button, i) => {
                if (button === event.target) {
                    hideInfo();
                    showInfo(i);
                }
            })
        }
    })
}


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ timer)
/* harmony export */ });
function timer(dateEnd) {


  timerBlock(dateEnd, '#days', '#hours', '#minutes', '#seconds');

  function timerBlock(dateEnd, days, hours, minutes, seconds) {
    let dayIndicate = document.querySelector(days),
      hourIndicate = document.querySelector(hours),
      minutesIndicate = document.querySelector(minutes),
      secondsIndicate = document.querySelector(seconds),
      interval = setInterval(calculatingTime, 1000);
    calculatingTime();
    return;


    function calculatingTime() {
      let DateNow = new Date(),
        dayRemaining = 0,
        hourRemaining = 0,
        minutesRemaining = 0,
        secondRemaining = 0,
        timeBetween = Date.parse(dateEnd) - Date.parse(DateNow);

      if (timeBetween > 0) {
        dayRemaining = Math.floor(timeBetween / (1000 * 60 * 60 * 24)),
          hourRemaining = Math.floor((timeBetween / (1000 * 60 * 60)) % 24),
          minutesRemaining = Math.floor((timeBetween / (1000 * 60)) % 60),
          secondRemaining = Math.floor((timeBetween / 1000) % 60);
      }


      if (timeBetween <= 0) clearInterval(interval);

      if (dayRemaining < 10) dayRemaining = `0${dayRemaining}`;
      if (hourRemaining < 10) hourRemaining = `0${hourRemaining}`;
      if (minutesRemaining < 10) minutesRemaining = `0${minutesRemaining}`;
      if (secondRemaining < 10) secondRemaining = `0${secondRemaining}`;

      dayIndicate.textContent = dayRemaining;
      hourIndicate.textContent = hourRemaining;
      minutesIndicate.textContent = minutesRemaining
      secondsIndicate.textContent = secondRemaining;


    }
  }

}

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "sendingData": () => (/* binding */ sendingData)
/* harmony export */ });
async function sendingData(url, data) {
    let resObject = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return resObject.json();
}



const getResource = async (url) => {

    const formObj = await fetch(url);
    if (!formObj.ok) {
        throw new Error(`Could not fetch ${url}, status ${formObj.status}`);
    }
    return formObj.json();

};




/***/ }),

/***/ "./node_modules/lodash/_arrayFilter.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");



let doFunc = __webpack_require__(/*! ../node_modules/lodash/_arrayFilter */ "./node_modules/lodash/_arrayFilter.js")
;














window.addEventListener('DOMContentLoaded', () => {
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
    imgSelector: '.offer__slide',
    prevButtonSelector: '.offer__slider-prev',
    nextButtonSelector: '.offer__slider-next',
    currentSlideNumber: 'current',
    slideTotalId: 'total',
    wrapperSelector: '.offer__slider-wrapper',
    sliderBox: '.offer__slider-inner'
  });
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])('.modal');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])('2023-10-31');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

//timer realization
//callUs button and modal window
//cards
//forms
// my first slider
// slider
//menu calc

  //  let obj = {
  //   name: 'Igor',
  //   secondName: 'Novakovskiy',
  //   age: 31,
  //   'wife': 'Mila',
  //  }
  //  obj.name = 'Igor' // сдесь он будет рассматривать name как строковую запись для создания свойства
  //  obj['wife'] //это он будет рассматривать как строковое значение и по немуу создавать свойство
  //именнованная область памяти является,некой строкой которая именует адрес области памяти

  //another realisation slider

  // changeSliderImgs(numberSlide);
  // countingSlider();


  // function changeSliderImgs() {
  //   sliderImgs.forEach((img, ind) => {
  //     ind++;
  //     img.classList.add('hide');
  //     img.classList.remove('show')
  //     if(ind === numberSlide) {
  //       img.classList.remove('hide');
  //       img.classList.add('show')
  //     }
  //   })
  // }

  // function countingSlider() {
  //   if (numberSlide < 10) currenSlide.textContent = `0${numberSlide}`
  //    else currenSlide.textContent = `${numberSlide}`;
  //    if (sliderImgs.length !== 10) totalSlide.textContent = `0${sliderImgs.length}`
  //    else totalSlide.textContent = `${sliderImgs.length}`; 
  // }
  // prevSlideButton.addEventListener('click', () => {
  //   if (numberSlide !== 1) numberSlide--
  //   else numberSlide = sliderImgs.length;
  //   countingSlider();
  //   changeSliderImgs();
  // })

  // nextSlideButton.addEventListener('click', () => {
  //   if (numberSlide !== sliderImgs.length) numberSlide++
  //   else numberSlide = 1;
  //   countingSlider();
  //   changeSliderImgs();
  // })




  // clock realiztaion
//   function clockBlock(days,hours,minutes,seconds) {
//     let dayIndicate = document.querySelector(days),
//     hourIndicate = document.querySelector(hours),
//     minutesIndicate = document.querySelector(minutes),
//     secondsIndicate = document.querySelector(seconds);

//   function clock() {
//   let time = new Date(),
//   days = time.getDate(),
//   hour = time.getHours(),
//   minutes = time.getMinutes(),
//   seconds = time.getSeconds();

//   dayIndicate.textContent = days;
//   hourIndicate.textContent = hour;
//   minutesIndicate.textContent = minutes;
//   secondsIndicate.textContent = seconds;
//   setInterval(clock, 1000)
//   }
//   clock();
// }
// clockBlock('#days', '#hours', '#minutes', '#seconds')



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map


'use strict'

let doFunc = require('../node_modules/lodash/_arrayFilter')
import tabs from './modules/tabs';
import modal from './modules/modal';
import slider from './modules/slider';
import calcCalories from './modules/calculator';
import sendForm from './modules/form';
import timer from './modules/timer';
import card from './modules/cards';








window.addEventListener('DOMContentLoaded', () => {
  tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  modal('[data-modal]', '.modal');
  slider({
    imgSelector: '.offer__slide',
    prevButtonSelector: '.offer__slider-prev',
    nextButtonSelector: '.offer__slider-next',
    currentSlideNumber: 'current',
    slideTotalId: 'total',
    wrapperSelector: '.offer__slider-wrapper',
    sliderBox: '.offer__slider-inner'
  });
  calcCalories();
  sendForm('.modal');
  timer('2023-10-31');
  card();
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



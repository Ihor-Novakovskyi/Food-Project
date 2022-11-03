
'use strict'  
 console.log(document.documentElement)
 
  window.addEventListener('DOMContentLoaded', () => {

  const tabsWrapper = document.querySelector('.tabheader__items');
  const tabsBox = tabsWrapper.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  
  function hideInfo() {
    tabsBox.forEach(element => {
      element.classList.remove('tabheader__item_active');
    })

    tabsContent.forEach(element => {
      element.classList.remove('show');
      element.classList.add('hide');
    })
  }

  function showInfo(i = 0) {
    tabsBox[i].classList.add('tabheader__item_active');
    tabsContent[i].classList.add('show','fade');
    tabsContent[i].classList.remove('hide');
  }
  hideInfo();
  showInfo();

  tabsWrapper.addEventListener('click',(event) => {
    if(event.target.classList.contains('tabheader__item')){
      tabsBox.forEach((button, i) => {
        if(button === event.target) {
          hideInfo();
          showInfo(i);
        }
      })
    }
  })



//timer realization
  let dateEnd = '2023-10-31';

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
  //callUs button and modal window
  const btnShowModal = document.querySelectorAll('[data-modal]'),
        btnCloseModal = document.querySelector('[data-close_modal]'),
        modal = document.querySelector('.modal');
        
  btnShowModal.forEach((btn) => btn.addEventListener('click',showModal));

  function showModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }
  btnCloseModal.addEventListener('click', closeModal)

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  })

  let modalTimerId = setTimeout(showModal, 5000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      showModal();
      window.removeEventListener('scroll', showModalByScroll)
    }
  }

  window.addEventListener('scroll', showModalByScroll);

})







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

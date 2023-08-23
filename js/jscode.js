
'use strict'

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
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
  }
  hideInfo();
  showInfo();

  tabsWrapper.addEventListener('click', (event) => {
    if (event.target.classList.contains('tabheader__item')) {
      tabsBox.forEach((button, i) => {
        if (button === event.target) {
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
    modal = document.querySelector('.modal');

  btnShowModal.forEach((btn) => btn.addEventListener('click', showModal));

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

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') === '') {
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
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
        `;
      this.parent.append(element)
    }
  }
  document.querySelector('.menu .container').style.alignItems = 'stretch';
  const getResource = async (url) => {
    try {
      const formObj = await fetch(url);
      if (!formObj.ok) {
        console.log('error')
      throw new Error(`Could not fetch ${url}, status ${formObj.status}`);
      }
    return formObj.json();
      } catch (error) {
      console.log('error inside', error)
      // await error
    }
    
  };

  getResource('http://localhost:3000/menu')
    .then((response) => {
      response.forEach(({ img, altimg, title, descr, price }) => {

        new MenuCard(img, altimg, title, descr, price, 40, '.menu .container')
      })
    }).catch(data => console.log('its catch data -----', data))


  const message = {
    loading: '/img/spinner.svg',
    success: 'Спасибо! Скоро мы свяжемся с вами!',
    error: 'Извините, техничсекие неполадки'
  };
  const forms = document.querySelectorAll('form');

  forms.forEach(postData);

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

  function postData(form) {
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




      sendingData('http://localhost:3000/requests', objRequest)
        .then((data) => {
          console.log(data) // information about post request
          statusMessage.remove();
          showthanksModal(message.success);
        })
        .catch(() => showthanksModal(message.error))
        .finally(() => form.reset());
    });

  }

  function showthanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    prevModalDialog.classList.remove('show');
    showModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
      `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      prevModalDialog.classList.add('show');
      closeModal();
    }, 2000)
  }

  // my first slider

  const sliderImgs = document.querySelectorAll('.offer__slide'),
    prevSlideButton = document.querySelector('.offer__slider-prev'),
    nextSlideButton = document.querySelector('.offer__slider-next'),
    currenSlide = document.getElementById('current'),
    totalSlide = document.getElementById('total'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
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
  //menu calc
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
});



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




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

  class MenuCard {
    constructor (src, alt, name, textContent, price, exchange, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.name = name;
      this.textContent = textContent;
      this.price = price;
      this.exchange = exchange;
      this.price = price;
      this.classes = classes;
      this.parent  = document.querySelector(parentSelector);
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
  const card1 = new MenuCard(
    "img/tabs/vegy.jpg", 
    "vegy",
    'Фитнес',
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!
    `,
    8,
    40,
    ".menu .container",
    'menu__item'

  )
  const card2 = new MenuCard(
    "img/tabs/elite.jpg", 
    "elite",
    'Премиум',
    `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!
    `,
    14.5,
    40,
    ".menu .container",
    "menu__item"
  )

  const card3 = new MenuCard(
    "img/tabs/post.jpg", 
    "post",
    'Постное',
    `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
    15,
    40,
    ".menu .container",
    'menu__item'
  )
  const forms = document.querySelectorAll('form');
  forms.forEach(postData);
  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      
      e.target.reset();
      const request = new XMLHttpRequest();
      request.open('POST', 'http://food-project/server.php');
      request.send(formData);
      const infoMessage = {
        send: 'Оправка сообщения',
        load: 'Мы свяжемся с вами',
        error: 'Извините, техничсекие неполадки'
      }
      const infoLoad = document.createElement('div');
      e.target.append(infoLoad);
      infoLoad.textContent = infoMessage.send;
      request.addEventListener('onload', () => {
       if (request.status === 200) {
        console.log(request.response)
        infoLoad.textContent = infoMessage.load;
        setTimeout(() => {
          closeModal();
          infoLoad.textContent = '';
        }, 1000)
       } else {
        infoLoad.textContent = infoMessage.error;
       }
      })
    })
  }
})




// class MenuCard {
//   constructor (imgLink, menuName,textMenu, price) {
//     const container = document.querySelectorAll('.container')[4];
//     this.menuItem = document.createElement('div');
//     this.menuItem.classList.add('menu__item');
//     container.append(this.menuItem);

//     this.img  = document.createElement('img');
//     this.img.src = imgLink;
//     this.menuItem.append(this.img);

//     this.nameMenu = document.createElement('h3');
//     this.nameMenu.classList.add('menu__item-subtitle');
//     this.menuItem.append(this.nameMenu);

//     this.nameMenu.innerText = `Меню ${menuName}`;
//     this.menuText = document.createElement('div');
//     this.menuText.classList.add('menu__item-descr');
//     this.menuText.textContent = `Меню "${menuName}" - ${textMenu}`;
//     this.menuItem.append(this.menuText);

//     this.menuDevider = document.createElement('div');
//     this.menuDevider.classList.add('menu__item-divider');
//     this.menuItem.append(this.menuDevider);

//     this.menuPrice = document.createElement('div');
//     this.menuPrice.classList.add('menu__item-price');
//     this.menuItem.append(this.menuPrice);

//     this.itemCost = document.createElement('div');
//     this.itemCost.classList.add('menu__item-cost');
//     this.itemCost.textContent = 'Цена';
//     this.menuPrice.append(this.itemCost);

//     this.totalPrice = document.createElement('div');
//     this.totalPrice.classList.add('menu__item-total');
//     this.totalPrice.innerHTML = `<span>${price}</span> грн/день`
//     this.menuPrice.append(this.totalPrice);
//   }
// }



// new MenuCard('img/tabs/elite.jpg', 'Фитнес',`Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!
// `, 333)






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

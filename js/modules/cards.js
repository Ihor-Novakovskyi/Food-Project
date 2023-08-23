import { getResource } from "../services/services";

export default function getCards() {
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


  getResource('http://localhost:3000/menu')
    .then((response) => {
      response.forEach(({ img, altimg, title, descr, price }) => {
        console.log(descr)
        new MenuCard(img, altimg, title, descr, price, 40, '.menu .container')
      })
    }).catch(data => console.log('its catch data -----', data))

}
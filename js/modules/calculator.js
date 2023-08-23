export default function calcCalories() {
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
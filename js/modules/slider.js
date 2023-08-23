export default function slider({imgSelector, prevButtonSelector, nextButtonSelector,currentSlideNumber, slideTotalId, wrapperSelector, sliderBox}) {
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


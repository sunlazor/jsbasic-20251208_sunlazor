// <div class="carousel__slide" data-id="penang-shrimp">
//   <img src="/assets/images/carousel/...значение slide.image..." class="carousel__img" alt="slide">
//     <div class="carousel__caption">
//       <span class="carousel__price">€<!--значение slide.price--></span>
//       <div class="carousel__title"><!--значение slide.name--></div>
//       <button type="button" class="carousel__button">
//         <img src="/assets/images/icons/plus-icon.svg" alt="icon">
//       </button>
//     </div>
// </div>

// {
//   name: 'Chicken cashew',
//     price: 14,
//   image: 'chicken_cashew.png',
//   id: 'chicken-cashew'
// },

export default class Carousel {
  elem;

  constructor(slides) {
    this.slides = slides;

    let carousel = this.#makeCarousel();
    this.#addSlides(carousel, slides);
    this.#addInteractions(carousel);

    this.elem = carousel;
  }

  #createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }

  #makeCarousel() {
    return this.#createElement(
      `<div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon"/>
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon"/>
      </div>
      <div class="carousel__inner">
<!--        <div class="carousel__slide" data-id="penang-shrimp">-->
<!--          <img src="/assets/images/carousel/penang_shrimp.png" class="carousel__img" alt="slide"/>-->
<!--          <div class="carousel__caption">-->
<!--            <span class="carousel__price">€16.00</span>-->
<!--            <div class="carousel__title">Penang shrimp</div>-->
<!--            <button type="button" class="carousel__button">-->
<!--              <img src="/assets/images/icons/plus-icon.svg" alt="icon"/>-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>`
    );
  }

  #addSlides(carousel, slides) {
    let slidesComponent = new Array(slides.length);

    slides.forEach((slide, index) => {
      slidesComponent[index] = this.#createElement(
        `<div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
        </div>`
      );
    });

    slidesComponent.forEach((slide) => carousel.querySelector('.carousel__inner').appendChild(slide));
  }

  #addInteractions(carousel) {
    carousel.querySelector('.carousel__arrow_left').style.visibility = 'hidden';
    var currentItem = currentItem === undefined ? 0 : currentItem;

    carousel.addEventListener('click', function (event) {
      let caroInner = carousel.querySelector('.carousel__inner');
      let shopItemsCount = caroInner.getElementsByClassName('carousel__slide').length;

      if (event.target.closest('.carousel__arrow_left')) {
        if (currentItem > 0) {
          currentItem = currentItem - 1 >= 0 ? currentItem - 1 : currentItem;
          caroInner.style.transform = `translateX(-${currentItem * 100}%)`;
        }
      } else if (event.target.closest('.carousel__arrow_right')) {
        if (currentItem < shopItemsCount) {
          currentItem = currentItem + 1 < shopItemsCount ? currentItem + 1 : currentItem;
          caroInner.style.transform = `translateX(-${currentItem * 100}%)`;
        }
      }

      if (currentItem === 0) {
        carousel.querySelector('.carousel__arrow_left').style.visibility = 'hidden';
      } else {
        carousel.querySelector('.carousel__arrow_left').style.visibility = 'visible';
      }

      if (currentItem < shopItemsCount - 1) {
        carousel.querySelector('.carousel__arrow_right').style.visibility = 'visible';
      } else {
        carousel.querySelector('.carousel__arrow_right').style.visibility = 'hidden';
      }
    })
  }
}

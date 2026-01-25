export default class StepSlider {
  elem;
  constructor({ steps, value = 0 }) {
    let slider = this.#makeSlider();
    this.#addClosestToClickSpanCalculation(slider);
    this.#addSliderChanges(slider);

    this.elem = slider;
  }

  #makeSlider() {
    return this.#createElement(`
    <!--Корневой элемент слайдера-->
    <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 50%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
        <span></span>
        <span></span>
        <span class="slider__step-active"></span>
        <span></span>
        <span></span>
      </div>
    </div>
    `);
  }

  #createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  };

  #addClosestToClickSpanCalculation(slider) {
    slider.addEventListener('click', (event) => {
      let sliderId = this.#calculateClosestSpan(slider, event);

      slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: sliderId,
        bubbles: true,
      }));
    })
  }

  #calculateClosestSpan(slider, event) {
    const sliderRect = slider.getBoundingClientRect();
    const spans = slider.querySelectorAll('.slider__steps span');

    let minDist = Number.MAX_SAFE_INTEGER;
    let prevDist = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < spans.length; i++) {
      const spanRect = spans[i].getBoundingClientRect();

      minDist = Math.abs(event.clientX - spanRect.left);
      if (minDist <= prevDist) {
        prevDist = minDist;
      } else {
        return i - 1;
      }
    }

    return spans.length - 1;
  }

  #addSliderChanges(slider) {
    slider.addEventListener('slider-change', (event) => {
      const spans = slider.querySelectorAll('.slider__steps span');
      console.log(event.detail);
      const span = spans[event.detail];

      const sliderValueDiv = slider.querySelector('.slider__thumb .slider__value');
      sliderValueDiv.textContent = event.detail;

      const prevActiveSlider = slider.querySelector('.slider__steps .slider__step-active');
      prevActiveSlider.classList.remove('slider__step-active');
      span.classList.add('slider__step-active');

      let thumb = slider.querySelector('.slider__thumb');
      let progress = slider.querySelector('.slider__progress');
      let leftPercents = (100 / (spans.length - 1)) * event.detail;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
    })
  }
}

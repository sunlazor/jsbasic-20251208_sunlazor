export default class StepSlider {
  elem;
  constructor({ steps, value = 0 }) {
    let slider = this.#makeSlider(steps, value);
    this.#addClosestToClickSpanCalculation(slider);
    this.#addSliderChanges(slider);

    this.elem = slider;
  }

  #makeSlider(steps, value) {
    let slider = this.#createElement(`
    <!--Корневой элемент слайдера-->
    <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">${value}</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 50%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
<!--        <span class="slider__step-active"></span>-->
<!--        <span></span>-->
      </div>
    </div>
    `);

    const stepsDiv = slider.querySelector('.slider__steps');
    for (let i = 0; i < steps; i++) {
      let span = document.createElement('SPAN');
      if (i === value) {
        span.classList.add('slider__step-active');
      }
      stepsDiv.appendChild(span);
    }

    this.#moveProgressBar(slider, steps, value)

    return slider;
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
      const span = spans[event.detail];

      const sliderValueDiv = slider.querySelector('.slider__thumb .slider__value');
      sliderValueDiv.textContent = event.detail;

      const prevActiveSlider = slider.querySelector('.slider__steps .slider__step-active');
      prevActiveSlider.classList.remove('slider__step-active');
      span.classList.add('slider__step-active');

      this.#moveProgressBar(slider, spans.length, event.detail);
    })
  }

  #moveProgressBar(slider, stepsCount, stepClicked) {
    let thumb = slider.querySelector('.slider__thumb');
    let progress = slider.querySelector('.slider__progress');
    let leftPercents = (100 / (stepsCount - 1)) * stepClicked;
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }
}

export default class StepSlider {
  elem;
  stepsCount;
  constructor({ steps, value = 0 }) {
    this.stepsCount = steps;

    let slider = this.#makeSlider(steps, value);
    this.#addClosestToClickSpanCalculation(slider);
    this.#addSliderClickChanges(slider);

    this.#addDragEvent(slider);

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

  #addSliderClickChanges(slider) {
    slider.addEventListener('slider-change', (event) => {
      const spans = slider.querySelectorAll('.slider__steps span');
      console.log(event.detail);
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

  #smoothProgressBarMoving(event, slider, thumb, progress) {
    const sliderRect = slider.getBoundingClientRect();

    let dist = event.clientX - sliderRect.left;
    let leftPercents;
    if (event.clientX < sliderRect.left) {
      leftPercents = 0;
    } else if (event.clientX > sliderRect.right) {
      leftPercents = 100;
    } else {
      leftPercents = dist * 100 / sliderRect.width;
    }

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }

  #addDragEvent(slider) {
    let thumb = slider.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    let progress = slider.querySelector('.slider__progress');

    thumb.addEventListener('pointerdown', (pdown) => {
      let spanId;
      pdown.preventDefault();
      slider.classList.add('slider_dragging');

      document.onpointermove = (pmove) => {
        spanId = this.#calculateClosestSpan(slider, pmove);
        this.#smoothProgressBarMoving(pmove, slider, thumb, progress);
      }

      document.addEventListener('pointerup', () => {
        document.onpointermove = () => false;
        document.onpointerup = () => false;
        slider.classList.remove('slider_dragging');

        slider.dispatchEvent(new CustomEvent('slider-change', {
          detail: spanId,
          bubbles: true,
        }))
      });
    });
  }
}

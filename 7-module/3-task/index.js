export default class StepSlider {
  elem;
  constructor({ steps, value = 0 }) {
    this.elem = this.#makeSlider();
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
}

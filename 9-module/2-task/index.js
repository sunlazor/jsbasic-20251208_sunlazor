import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    let carousel = new Carousel(slides);
    document.querySelector('div[data-carousel-holder]').appendChild(carousel.elem);
  }

  async render() {
    // let response = await fetch('./products.json');
    // if (response.ok) {
    //   this.slides = await response.json();
    // }
    //
    // console.log(slides);
  }
}

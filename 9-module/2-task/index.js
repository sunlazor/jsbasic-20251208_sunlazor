import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductGrid from "../../8-module/2-task/index.js";

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  cart;

  constructor() {
    let carousel = new Carousel(slides);
    document.querySelector('div[data-carousel-holder]').appendChild(carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('div[data-ribbon-holder]').appendChild(this.ribbonMenu.elem);

    let sliderInit = {steps: 5, value: 3};
    this.stepSlider = new StepSlider(sliderInit);
    document.querySelector('div[data-slider-holder]').appendChild(this.stepSlider.elem);

    let cartIcon = new CartIcon();
    document.querySelector('div[data-cart-icon-holder]').appendChild(cartIcon.elem);

    this.cart = new Cart(cartIcon);
  }

  async render() {
    await this.#getSlides();
    this.#addListeners();
  }

  #addListeners() {
    document.body.addEventListener('product-add', (ev) => {
      let filteredProduct = this.productGrid.products.filter(item => {
        return item.id === ev.detail
      });

      if (filteredProduct.length > 0) {
        this.cart.addProduct(filteredProduct[0]);
        // console.log(`product was added, and now: ${this.cart.getTotalCount()}`);
      } else {
        console.log('strange product appears');
      }
    });

    document.body.addEventListener('slider-change', (ev) => {
      this.productGrid.updateFilter({maxSpiciness: ev.detail});
    });

    document.body.addEventListener('ribbon-select', (ev) => {
      this.productGrid.updateFilter({category: ev.detail});
    });

    document.body.addEventListener('change', (ev) => {
      if (ev.target.id === 'vegeterian-checkbox') {
        this.productGrid.updateFilter({vegeterianOnly: ev.target.checked});
      } else if (ev.target.id === 'nuts-checkbox') {
        this.productGrid.updateFilter({noNuts: ev.target.checked});
      }
    });
  }

  #getSlides() {
    return new Promise(resolve => {
      fetch('./products.json')
        .then(response => response.json())
        .then(products => {
          this.serverProducts = products;

          this.productGrid = new ProductGrid(products);
          let gridDiv = document.querySelector('div[data-products-grid-holder]');
          if (!gridDiv) {
            return;
          }
          gridDiv.innerHTML = '';
          gridDiv.appendChild(this.productGrid.elem);

          this.productGrid.updateFilter({
            noNuts: document.getElementById('nuts-checkbox').checked,
            vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
            maxSpiciness: this.stepSlider.value,
            category: this.ribbonMenu.value
          });

          resolve();
        })
      ;
    });
  }
}

import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = this.#createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
        </div>
      </div>
    `);

    this.#addProductCards();
  }

  updateFilter(filters) {
    this.filters = filters;
    this.#addProductCards();
  }

  #createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }

  #addProductCards() {
    let inner = this.elem.querySelector('.products-grid__inner');
    let filterKeys = Object.keys(this.filters);
    let productsNodes;

    if (filterKeys.length === 0) {
      productsNodes = Array(this.products.length);
      this.products.forEach((product, i) => {
        productsNodes[i] = new ProductCard(product).elem;
      });
    } else {
      productsNodes = [];
      this.products.forEach(product => {
        console.log(this.filters);
        // 1. Без орехов
        if (Object.hasOwn(this.filters, 'noNuts') && this.filters['noNuts'] === true
          && Object.hasOwn(product, 'nuts') && product['nuts'] === true) {
          return;
        }
        // 2. Вегетарианское
        if (Object.hasOwn(this.filters, 'vegeterianOnly') && this.filters['vegeterianOnly'] === true
          && Object.hasOwn(product, 'vegeterian') && product['vegeterian'] !== true) {
          return;
        }
        // 3. Максимальная острота
        if (Object.hasOwn(this.filters, 'maxSpiciness') && this.filters['maxSpiciness'] !== undefined
          && Object.hasOwn(product, 'spiciness') && product['spiciness'] > this.filters['maxSpiciness']) {
          return;
        }
        // 4. Категория
        if (Object.hasOwn(this.filters, 'category') && this.filters['category']
          && Object.hasOwn(product, 'category') && product['category'] !== this.filters['category']) {
          return;
        }

        productsNodes.push(new ProductCard(product).elem);
        console.log(productsNodes);
      });
    }

    inner.replaceChildren(...productsNodes);
  }
}

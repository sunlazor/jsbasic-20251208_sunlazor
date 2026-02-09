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
    Object.assign(this.filters, filters);
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
      for (const product of this.products) {
        // 1. Без орехов
        if (Object.hasOwn(this.filters, 'noNuts') && this.filters['noNuts'] === true
          && Object.hasOwn(product, 'nuts') && product['nuts'] === true) {
          continue;
        }
        // 2. Вегетарианское
        if (Object.hasOwn(this.filters, 'vegeterianOnly') && this.filters['vegeterianOnly'] === true) {
          if (!Object.hasOwn(product, 'vegeterian') || product['vegeterian'] !== true) {
            continue;
          }
        }
        // 3. Максимальная острота
        if (Object.hasOwn(this.filters, 'maxSpiciness') && Number.isFinite(this.filters['maxSpiciness'])
          && Object.hasOwn(product, 'spiciness') && product['spiciness'] > this.filters['maxSpiciness']) {
          continue;
        }
        // 4. Категория
        if (Object.hasOwn(this.filters, 'category') && !!this.filters['category']
          && Object.hasOwn(product, 'category') && product['category'] !== this.filters['category']) {
          continue;
        }

        productsNodes.push(new ProductCard(product).elem);
      }
    }

    inner.replaceChildren(...productsNodes);
  }
}

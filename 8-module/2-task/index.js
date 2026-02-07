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

    this.#addProductCards(this.elem, this.products);
  }

  #createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }

  #addProductCards(prodGrid, products) {
    let inner = prodGrid.querySelector('.products-grid__inner');
    products.forEach(product => {
      inner.appendChild(new ProductCard(product).elem);
    });
  }
}

export default class ProductCard {
  elem;

  constructor(product) {
    this.elem = this.#createElement(
`<div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${product.image}" class="card__image" alt="product" />
          <span class="card__price">€${product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon"/>
          </button>
        </div>
      </div>`
    );

    let event = new CustomEvent("product-add", {
      detail: product.id,
      bubbles: true,
    });

    let button = this.elem.querySelector('.card__button');
    button.onclick = () => button.dispatchEvent(event); }

  #createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }
}

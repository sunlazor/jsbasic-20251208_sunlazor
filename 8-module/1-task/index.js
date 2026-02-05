import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  startPosition;

  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.startPosition) {
      const iconNode = this.elem.getBoundingClientRect();
      this.startPosition = {left: iconNode.left, top: iconNode.top};
    }

    // console.log(`offsetTop: ${window.pageYOffset}`);
    if (window.pageYOffset > this.startPosition.top) {
      this.elem.style.position = 'fixed';
      this.elem.y = '50px';
      // this.elem.x = '20px';
      // this.elem.x = document.documentElement.clientWidth - this.elem.offsetWidth - 10;
      // this.elem.x = Math.round(document.querySelector('.container').getBoundingClientRect().right) + 20 + 'px';
      // this.elem.x = Math.round(document.querySelector('.container').getBoundingClientRect().right) + 20;
      this.elem.x = Math.min(
        document.querySelector('.container').getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      ) + 'px';

      console.log(`cont right: ${Math.round(document.querySelector('.container').getBoundingClientRect().right)}`);
      console.log(`elem x: ${this.elem.x}`);
    } else {
      this.elem.style.position = '';
    }
  }
}

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!!product) {
      let placeInCart = this.cartItems.findIndex(item => {
        return item.product.id === product.id;
      });
      if (placeInCart > 0) {
        this.cartItems[placeInCart].count++;
      } else {
        let newItem = {
          product: product,
          count: 1,
        }
        placeInCart = this.cartItems.push(newItem) - 1;
      }

      this.onProductUpdate(this.cartItems[placeInCart]);
    }
  }

  updateProductCount(productId, amount) {
    let placeInCart = this.cartItems.findIndex(item => {
      return item.product.id === productId;
    });
    this.cartItems[placeInCart].count += amount;
    if (this.cartItems[placeInCart].count <= 0) {
      this.cartItems.splice(placeInCart, 1);
    } else {
      this.onProductUpdate(this.cartItems[placeInCart]);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, item) => totalPrice + item.product.price * item.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}


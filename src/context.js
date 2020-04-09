import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      detailProduct,
      cart: [],
      modalOpen: false,
      modalProduct: detailProduct,
      cartSubtotal: 0,
      cartTax: 0,
      cartTotal: 0,
    };
    this.handleDetail = this.handleDetail.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clearCart = this.clearCart.bind(this);
  }

  getItem(id) {
    return this.state.products.find(p => p.id === id);
  }

  handleDetail(id) {
    const product = this.getItem(id);
    this.setState({ detailProduct: product });
  }

  addToCart(id) {
    let tempProducts = [...this.state.products];
    let product = tempProducts.find(p => p.id === id);
    product = Object.assign(product, {
      inCart: true,
      count: 1,
      total: product.price,
    });

    this.setState(
      {
        products: tempProducts,
        cart: this.state.cart.concat(product),
      },
      () => {
        this.addTotals();
      }
    );
  }

  openModal(id) {
    let product = this.getItem(id);
    this.setState({
      modalOpen: true,
      modalProduct: product,
    });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  increment(id) {
    let product = this.state.products.find(p => p.id === id);
    product.count++;
    product.total = product.count * product.price;

    this.addTotals();
  }

  decrement(id) {
    let product = this.state.products.find(p => p.id === id);
    product.count--;
    product.total = product.count * product.price;

    if (product.count === 0) this.removeItem(id);

    this.addTotals();
  }

  removeItem(id) {
    this.setState(
      state => {
        let product = state.cart.find(p => p.id === id);
        product = Object.assign(product, {
          inCart: false,
          count: 0,
          total: 0,
        });

        return {
          cart: state.cart.filter(p => p.id !== id),
        };
      },
      () => this.addTotals()
    );
  }

  clearCart() {
    this.setState(
      {
        cart: [],
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,
      },
      () => {
        // Reset all products.
        this.setProducts();
        // Reset totals.
        this.addTotals();
      }
    );
  }

  addTotals() {
    let cartSubtotal = this.state.cart.reduce((acc, val) => acc + val.total, 0);
    let cartTax = parseFloat((cartSubtotal * 0.1).toFixed(2));

    this.setState({
      cartSubtotal,
      cartTax,
      cartTotal: cartSubtotal + cartTax,
    });
  }

  // Create a copy of every object properties to avoid object referencing.
  setProducts() {
    let products = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      products.push(singleItem);
    });

    this.setState({
      products,
    });
  }

  componentDidMount() {
    this.setProducts();
  }

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

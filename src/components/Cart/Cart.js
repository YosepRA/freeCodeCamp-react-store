import React, { Component } from 'react';
import { ProductConsumer } from '../../context';
import Title from '../Title';
import CartColumn from './CartColumn';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotal from './CartTotal';

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            const { cart } = value;

            if (cart.length === 0) {
              return <EmptyCart />;
            }

            return (
              <React.Fragment>
                <div className="container-fluid">
                  <Title name="your" title="cart" />
                </div>
                <CartColumn />
                <CartList value={value} />
                <CartTotal value={value} history={this.props.history} />
              </React.Fragment>
            );
          }}
        </ProductConsumer>
      </section>
    );
  }
}

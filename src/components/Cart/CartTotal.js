import React from 'react';
import PayPalButton from './PayPal';

export default function CartTotal({ value, history }) {
  const { cartSubtotal, cartTax, cartTotal, clearCart } = value;

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <button
              className="btn btn-outline-danger text-uppercase mb-3 px-5"
              type="button"
              onClick={clearCart}
            >
              clear cart
            </button>
            <h5>
              <span className="text-title">subtotal :</span>{' '}
              <strong>$ {cartSubtotal}</strong>
            </h5>
            <h5>
              <span className="text-title">tax :</span>{' '}
              <strong>$ {cartTax}</strong>
            </h5>
            <h5>
              <span className="text-title">total :</span>{' '}
              <strong>$ {cartTotal}</strong>
            </h5>

            <PayPalButton
              total={cartTotal}
              clearCart={clearCart}
              history={history}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

import React from 'react';
import CartItem from './CartItem';

export default function CartList({ value }) {
  const { cart } = value;
  let items = cart.map(item => (
    <CartItem key={item.id} item={item} value={value} />
  ));

  return <div className="container-fluid">{items}</div>;
}

import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import PropTypes from 'prop-types';

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;

    return (
      <ProductConsumer>
        {({ handleDetail, addToCart, openModal }) => {
          return (
            <ProductWrapper className="col-9 col-md-6 col-lg-3 mx-auto my-3">
              <div className="card">
                <div
                  className="img-container p-5"
                  onClick={() => handleDetail(id)}
                >
                  <Link to="/details">
                    <img src={img} alt={title} className="card-img-top" />
                  </Link>

                  <button
                    className="cart-btn"
                    disabled={inCart}
                    onClick={event => {
                      addToCart(id);
                      openModal(id);

                      event.stopPropagation();
                    }}
                  >
                    {inCart ? (
                      <p className="text-capitalize mb-0" disabled>
                        in cart
                      </p>
                    ) : (
                      <i className="fas fa-cart-plus"></i>
                    )}
                  </button>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p className="align-self-center mb-0">{title}</p>
                  <h5 className="text-blue font-italic-mb-0">
                    <span className="mr-1">$</span>
                    {price}
                  </h5>
                </div>
              </div>
            </ProductWrapper>
          );
        }}
      </ProductConsumer>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
  }).isRequired,
};

const ProductWrapper = styled.article`
  .card {
    border-color: transparent;
    transition: all 400ms ease-out;
  }

  .card-footer {
    background-color: transparent;
    border-top: transparent;
    transition: all 400ms ease-out;
  }

  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
    }

    .card-footer {
      background-color: rgb(247, 247, 247);
    }
  }

  .img-container {
    position: relative;
    overflow: hidden;

    &:hover {
      .card-img-top {
        transform: scale(1.1);
      }

      .cart-btn {
        transform: translate(0, 0);
      }
    }
  }

  .card-img-top {
    transition: all 400ms ease-out;
  }

  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
    padding: 0.2rem 0.4rem;
    background-color: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 400ms ease-out;
    cursor: pointer;

    &:hover {
      color: var(--mainBlue);
    }
  }
`;

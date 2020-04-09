import React, { Component } from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context';
import { ButtonContainer } from './Button';
import { Link } from 'react-router-dom';

export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {({ modalProduct, modalOpen, closeModal }) => {
          const { img, title, price } = modalProduct;

          if (!modalOpen) {
            return null;
          }

          return (
            <ModalContainer>
              <div className="container">
                <div className="row">
                  <div
                    id="modal"
                    className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
                  >
                    <h5>item added to the cart</h5>
                    <img src={img} alt={title} className="img-fluid" />
                    <h5>{title}</h5>
                    <h5 className="text-muted">price: ${price}</h5>

                    <Link to="/" className="mb-1">
                      <ButtonContainer onClick={closeModal}>
                        store
                      </ButtonContainer>
                    </Link>
                    <Link to="/cart">
                      <ButtonContainer onClick={closeModal} cart>
                        go to cart
                      </ButtonContainer>
                    </Link>
                  </div>
                </div>
              </div>
            </ModalContainer>
          );
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);

  #modal {
    background-color: var(--mainWhite);
  }
`;

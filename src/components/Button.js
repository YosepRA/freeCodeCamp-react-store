import styled, { css } from 'styled-components';

const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  background: transparent;
  border: 0.05rem solid var(--lightBlue);
  color: var(--lightBlue);
  border-radius: 0.5rem;
  margin: 0.2rem 0.5rem 0.2rem 0;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  transition: all 0.5s ease-out;

  &:hover {
    background: var(--lightBlue);
    color: var(--mainBlue);
  }

  &:focus {
    outline: none;
  }

  ${props =>
    props.cart &&
    css`
      border-color: var(--mainYellow);
      color: var(--mainYellow);

      &:hover {
        background: var(--mainYellow);
        color: var(--mainWhite);
      }
    `}
`;

export { ButtonContainer };

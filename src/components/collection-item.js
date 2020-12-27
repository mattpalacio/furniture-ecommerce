import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const CollectionItem = ({ product }) => {
  return (
    <Card>
      <div>
        <CardImage>
          <StyledImg fluid={product.image.fluid} alt={product.description} />
        </CardImage>

        <CardOverlay>
          <div>
            <p>{product.description}</p>
            <span>{product.price}</span>
          </div>
          <button
            className="snipcart-add-item"
            data-item-id={product.id}
            data-item-name={product.name}
            data-item-price={product.price}
            data-item-image={product.image.url}
            data-item-url={'/'}>
            Add To Cart
          </button>
        </CardOverlay>
      </div>

      {product.name}
    </Card>
  );
};

export default CollectionItem;

const Card = styled.article`
  width: 270px;
  height: 360px;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    width: 100%;
    height: 100%;
    margin-bottom: 0.2em;
    overflow: hidden;
    position: relative;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (hover: hover) {
    ${Card}:hover & {
      img {
        filter: blur(3px);
      }
    }
  }
`;

const StyledImg = styled(Img)`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const CardOverlay = styled.div`
  background: hsla(0, 0%, 100%, 0.3);
  display: none;
  position: absolute;
  inset: 0;
  z-index: 2;

  div {
    width: 100%;
    height: 100%;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  p {
    margin-bottom: 1em;
    font-size: 1.375rem;
    text-align: center;
  }

  span {
    font-size: 1.5rem;

    &::before {
      content: '$';
    }
  }

  button {
    width: 100%;
    padding: 1em 2em;
    background: black;
    opacity: 0.8;
    color: white;
    align-self: flex-end;
  }

  @media (hover: hover) {
    ${Card}:hover & {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

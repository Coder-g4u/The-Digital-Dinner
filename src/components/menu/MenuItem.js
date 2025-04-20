import React from 'react';
import { useCart } from '../../context/CartContext';
import './MenuItem.css';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="menu-item">
      <div className="menu-item-image">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div className="placeholder-image">{item.name.charAt(0)}</div>
        )}
      </div>
      <div className="menu-item-content">
        <h3>{item.name}</h3>
        <p className="description">{item.description}</p>
        <div className="price-action">
          <span className="price">${item.price.toFixed(2)}</span>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;

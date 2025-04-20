import React from 'react';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      updateQuantity(item._id, value);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>${item.price.toFixed(2)} each</p>
      </div>
      <div className="cart-item-actions">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="quantity-input"
        />
        <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
        <button 
          onClick={() => removeFromCart(item._id)}
          className="remove-button"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
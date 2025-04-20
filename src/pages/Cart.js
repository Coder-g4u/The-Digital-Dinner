import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import './Cart.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const Cart = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    if (!customerName || !phoneNumber) {
      setError('Please fill out all fields');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const orderItems = items.map(item => ({
        menuItemId: item._id,
        quantity: item.quantity,
      }));
  
      const payload = {
        customerName,
        phoneNumber,
        items: orderItems
      };
  
      console.log("Submitting order:", payload);
      
      const response = await axios.post(`${API_URL}/orders`, payload);
      
      clearCart();
      navigate(`/confirmation/${response.data.id}`);
      
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error('Error placing order:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button onClick={() => navigate('/menu')} className="shop-button">
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${(total * 1.1).toFixed(2)}</span>
            </div>
            
            <form onSubmit={handleSubmit} className="checkout-form">
              <h3>Your Information</h3>
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="customerName">Name</label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="checkout-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

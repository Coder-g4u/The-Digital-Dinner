import React, { useState } from 'react';
import axios from 'axios';
import OrderSummary from '../components/orders/OrderSummary';
import './OrderHistory.css';

const OrderHistory = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      setError('Please enter your phone number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/orders/phone/${phoneNumber}`);
      setOrders(res.data);
      setSearched(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch orders');
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-form">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search Orders'}
            </button>
          </div>
        </form>
        
        {error && <div className="error-message">{error}</div>}
      </div>
      
      <div className="orders-list">
        {searched && orders.length === 0 ? (
          <div className="no-orders">
            <p>No orders found for this phone number.</p>
          </div>
        ) : (
          orders.map(order => (
            <OrderSummary key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
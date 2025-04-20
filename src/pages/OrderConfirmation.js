import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import OrderSummary from '../components/orders/OrderSummary';
import './OrderConfirmation.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order details');
        setLoading(false);
        console.error('Error fetching order:', err);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) return <div className="loading">Loading order details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!order) return <div className="error">Order not found</div>;

  return (
    <div className="confirmation-page">
      <div className="confirmation-header">
        <h1>Order Confirmed!</h1>
        <p>Thank you for your order, {order.customerName}!</p>
      </div>
      
      <div className="confirmation-details">
        <OrderSummary order={order} />
        
        <div className="pickup-info">
          <h2>Pickup Information</h2>
          <p>Your order will be ready for pickup at:</p>
          <div className="pickup-time">
            {new Date(order.pickupTime).toLocaleString()}
          </div>
          <p>Please show your order ID when you arrive:</p>
          <div className="order-id">
            {order.id.substring(0, 8)}
          </div>
        </div>
        
        <div className="confirmation-actions">
          <Link to="/menu" className="button">
            Order More Food
          </Link>
          <Link to="/order-history" className="button secondary">
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

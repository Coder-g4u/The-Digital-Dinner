import React from 'react';
import './OrderSummary.css';

const OrderSummary = ({ order }) => {
  return (
    <div className="order-summary">
      <div className="order-header">
        <h3>Order #{order.id.substring(0, 8)}</h3>
        <span className={`status status-${order.status}`}>{order.status}</span>
      </div>
      <div className="order-details">
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Phone:</strong> {order.phoneNumber}</p>
        <p><strong>Pickup Time:</strong> {new Date(order.pickupTime).toLocaleString()}</p>
      </div>
      <div className="order-items">
        <h4>Items:</h4>
        <ul>
          {order.items.map(item => (
            <li key={item.id}>
              {item.quantity} x {item.name} - ${item.price.toFixed(2)} each
            </li>
          ))}
        </ul>
      </div>
      <div className="order-total">
        <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderSummary;

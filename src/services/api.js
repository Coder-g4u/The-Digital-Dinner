import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Menu services
export const menuService = {
  // Get all menu items
  getAllItems: async () => {
    try {
      const response = await api.get('/menu');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get menu items by category
  getItemsByCategory: async (category) => {
    try {
      const response = await api.get(`/menu/category/${category}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get menu item by ID
  getItemById: async (id) => {
    try {
      const response = await api.get(`/menu/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Order services
export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get orders by phone number
  getOrdersByPhone: async (phoneNumber) => {
    try {
      const response = await api.get(`/orders/phone/${phoneNumber}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default {
  menuService,
  orderService
};
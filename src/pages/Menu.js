import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '../components/menu/MenuItem';
import './Menu.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Appetizers', 'Main Courses', 'Desserts', 'Drinks'];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/menu`);
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch menu items');
        setLoading(false);
        console.error('Error fetching menu items:', err);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  if (loading) return <div className="loading">Loading menu...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>
      
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <MenuItem key={item._id} item={item} />
          ))
        ) : (
          <p className="no-items">No items available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;

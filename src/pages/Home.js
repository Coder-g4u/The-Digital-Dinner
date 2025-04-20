import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to The Digital Diner</h1>
          <p>Delicious food, just a few clicks away</p>
          <Link to="/menu" className="cta-button">
            View Our Menu
          </Link>
        </div>
      </div>
      
      <section className="features">
        <div className="feature">
          <div className="feature-icon">🍔</div>
          <h2>Fresh Ingredients</h2>
          <p>We use only the freshest ingredients in all our dishes.</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">🚀</div>
          <h2>Quick Pickup</h2>
          <p>Order online and pick up your food without waiting.</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">💖</div>
          <h2>Made with Love</h2>
          <p>Every dish is prepared with care and attention.</p>
        </div>
      </section>
      
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Browse Our Menu</h3>
            <p>Explore our delicious options</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Add to Cart</h3>
            <p>Select your favorite items</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Place Order</h3>
            <p>Enter your details and submit</p>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>Pick Up</h3>
            <p>Collect your food at the scheduled time</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
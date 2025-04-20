// src/context/CartContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  items: [],
  total: 0
};

// Create context
const CartContext = createContext(initialState);

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );

      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };

        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price
        };
      } else {
        // Add new item with quantity 1
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price
        };
      }

    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item._id === action.payload);
      const subtractTotal = itemToRemove.price * itemToRemove.quantity;
      
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        total: state.total - subtractTotal
      };

    case 'UPDATE_QUANTITY':
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item._id === id);
      const oldQuantity = item.quantity;
      const quantityDiff = quantity - oldQuantity;
      
      const updatedItems = state.items.map(item =>
        item._id === id ? { ...item, quantity } : item
      );

      return {
        ...state,
        items: updatedItems,
        total: state.total + (item.price * quantityDiff)
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add item to cart
  const addToCart = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id
    });
  };

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity }
    });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);

export default CartContext;
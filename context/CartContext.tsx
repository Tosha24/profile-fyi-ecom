"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Define the type for a product item in the cart
interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
}

// Define the type for the context state
interface CartContextType {
  cart: CartItem[];
  getCart: () => CartItem[];
  addToCart: (item: CartItem) => void;
  updateCart: (id: number, quantity: number) => void; // New function
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const defaultCartContext: CartContextType = {
  cart: [],
  getCart: () => [],
  addToCart: () => {},
  updateCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},  
};

// Create the context
export const CartContext = createContext<CartContextType>(defaultCartContext);


// CartProvider component to wrap around components needing cart state
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() =>
    JSON.parse(typeof window !== "undefined" && localStorage.getItem("cart") || "[]")
  );

  useEffect(() => {
    try {
      typeof window !== "undefined" && localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Cart saved to localStorage:", cart);
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  const getCart = () => {
    return cart;
  };

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        newCart = [...prevCart, item];
      }
      return newCart;
    });
    toast.success(`'${item.name}' added to cart. \nQuantity: ${item.quantity}`);
  };

  const updateCart = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

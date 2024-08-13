"use client";

import Navbar from "@/components/Navbar";
import QuantitySelector from "@/components/QuantitySelector";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCart, clearCart } =
    useContext(CartContext);
  const router = useRouter();

  const getSubtotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    let discount = parseFloat(getDiscountedPrice());
    let subTotal = parseFloat(getSubtotal());
    let total = subTotal - discount;
    return total.toFixed(2);
  };

  const getDiscountedPrice = () => {
    let subTotal = parseFloat(getSubtotal());
    let discount = 0.1 * subTotal;
    return discount.toFixed(2);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-24">
        <h1 className="text-xl md:text-2xl font-bold mb-4">
          Your Cart ({getTotalItems()})
        </h1>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#FBF6E2] p-3 rounded-lg border-2 border-[#131842] flex flex-col sm:flex-row items-center gap-5"
              >
                <Image
                  src={`/assets/images/${item.image}`}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-36 h-36 cursor-pointer border-2 border-[#ECCEAE] rounded-xl"
                  onClick={() => router.push("/product/" + item.id)}
                />
                <div className="flex flex-col gap-2 w-full">
                  <div
                    onClick={() => router.push("/product/" + item.id)}
                    className="cursor-pointer"
                  >
                    <h2 className="text-lg md:text-xl font-semibold text-darkBlack">
                      {item.name}
                    </h2>
                    <p className="text-sm md:text-base text-lightGrey">
                      {item.description}
                    </p>
                  </div>
                  <QuantitySelector
                    quantity={item.quantity}
                    onIncrease={() => {
                      if (item.quantity < item.stock) {
                        updateCart(item.id, item.quantity + 1);
                      }
                    }}
                    onDecrease={() => {
                      if (item.quantity > 1) {
                        updateCart(item.id, item.quantity - 1);
                      }
                    }}
                  />
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-base md:text-lg font-bold">
                      Rate: ${item.price.toFixed(2)}
                    </p>
                    <p className="text-base md:text-lg font-bold">
                      Item total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 self-end sm:self-center"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            ))}

            <div className="border-2 border-darkBlack p-4 rounded-lg flex flex-col gap-2 sm:w-2/3 lg:w-1/2 xl:w-1/3 ml-auto">
              <div className="font-bold text-xl border-b border-darkBlack pb-2">
                Summary:
              </div>
              <div className="font-bold text-base md:text-lg flex flex-row justify-between">
                <div>Subtotal:</div>
                <div>$ {getSubtotal()}</div>
              </div>
              <div className="font-bold text-base md:text-lg flex flex-row justify-between">
                <div>Discount:</div>
                <div>- $ {getDiscountedPrice()}</div>
              </div>
              <div className="font-bold text-base md:text-lg flex flex-row justify-between border-t border-darkBlack pt-2">
                <div>Total:</div>
                <div>$ {getTotalPrice()}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Clear Cart
              </button>
              <button
                onClick={() => toast.success("Checking Out...")}
                className="bg-rosePink text-white font-bold px-4 py-2 rounded-lg hover:bg-rosePink/80 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;

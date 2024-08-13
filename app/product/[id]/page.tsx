"use client";

import React, { useContext, useEffect, useState } from "react";
import { products } from "@/constants";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CartContext } from "@/context/CartContext";
import { UserContext } from "@/context/UserContext";
import toast from "react-hot-toast";
import Image from "next/image";

const ProductIdPage = ({ params: { id } }: { params: { id: number } }) => {
  const product = products.find((product) => product.id == id)
  const [checkStock, setCheckStock] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (product) {
      setCheckStock(product.stock > 0 ? true : false);
    }
  }, [product?.stock]);

  const { addToCart } = useContext(CartContext);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    if(userId && product) {
      addToCart({
        ...product, image: product.image[0], quantity: quantity
      });
    }
    else{
      toast.error("Please login to add items to cart");
    }
  };

  return (
    <div className="container max-h-[94vh] max-w-[96vw] mx-auto overflow-y-auto m-5 p-4 bg-[#FBF6E2] rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-10 max-h-[600px] relative">
          <Image
            src={`/assets/images/${product.image[0]}`}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <div className="flex flex-row justify-between py-3">
            <div className="bg-[#e7e6e9] text-[#393e48] text-sm py-2 px-4 font-bold rounded-lg mb-2">
              Popular
            </div>
            <button className="text-rosePink bg-lightPink/30 p-2 rounded-full">
              <FaHeart size={30} />
            </button>
          </div>
          <h1 className="text-3xl font-bold mb-5 text-darkBlack">
            {product.name}
          </h1>
          <div className="flex space-x-8 text-sm pb-3">
            <span className="text-rosePink border-b-2 border-rosePink pb-1 cursor-pointer font-bold">
              Description
            </span>
          </div>
          <p className="text-lightGrey mb-4 h-32 text-wrap overflow-y-auto">
            {product.description}
          </p>

          <div className="flex flex-row items-center justify-between mb-4 mr-5">
            <div className="flex flex-col items-start gap-1">
              <div
                className={`${
                  checkStock ? "text-green-500" : "text-red-500"
                } font-bold text-lg`}
              >
                {checkStock ? "In stock" : "Out of Stock"}
              </div>
              <span className="text-2xl font-bold text-darkBlack">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="text-darkBlack font-bold">Quantity:</div>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border-2 border-darkBlack text-darkBlack font-bold rounded px-3 py-2 w-20"
              >
                {Array.from({ length: product.stock }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="border-2 hidden lg:block  border-rosePink text-rosePink font-bold px-6 py-2 rounded-lg hover:bg-rosePink hover:text-white transition duration-300"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>

          <button
            className="border-2 lg:hidden w-full border-rosePink text-rosePink font-bold px-6 py-2 rounded-lg hover:bg-rosePink hover:text-white transition duration-300"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductIdPage;

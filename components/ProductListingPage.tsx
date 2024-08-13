"use client";

import { products, ProductType } from "@/constants";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Navbar from "./Navbar";
import { CartContext } from "@/context/CartContext";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";
import { UserContext } from "@/context/UserContext";

const ProductListingPage = () => {
  const { addToCart } = useContext(CartContext);
  const { userId } = useContext(UserContext);
  const router = useRouter();

  const routeToProduct = (id: number) => {
    router.push(`/product/${id}`);
  };

  const addToCartHandler = (e: any, product: ProductType) => {
    e.stopPropagation();
    if (userId) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image[0],
        description: product.description,
        stock: product.stock,
        quantity: 1,
      });
    } else {
      toast.error("Please login to add items to cart");
    }
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="container mx-auto p-4 pt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              routeToProduct={routeToProduct}
              addToCartHandler={addToCartHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
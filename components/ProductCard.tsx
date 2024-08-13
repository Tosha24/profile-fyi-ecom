import { ProductType } from "@/constants";
import Image from "next/image";
import React from "react";

const ProductCard = ({
  product,
  routeToProduct,
  addToCartHandler,
}: {
  product: ProductType;
  routeToProduct: (id: number) => void;
  addToCartHandler: (e: any, product: ProductType) => void;
}) => {
    return (
      <div
        key={product.id}
        className="bg-[#FBF6E2] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div
          className="cursor-pointer w-full"
          onClick={() => routeToProduct(product.id)}
        >
          <Image
            src={`/assets/images/${product.image[0]}`}
            alt={product.name}
            width={300}
            height={300}
            className="mx-auto my-2 rounded-lg w-[96%] h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 truncate">
              {product.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 truncate">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-md sm:text-lg font-bold">
                ${product.price.toFixed(0)}
              </span>
              <button
                onClick={(e) => addToCartHandler(e, product)}
                className="text-[#131842] font-bold border-2 border-[#131842] hover:bg-[#131842] hover:text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductCard;
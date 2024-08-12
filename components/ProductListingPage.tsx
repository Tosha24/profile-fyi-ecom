import React, { useState, useEffect } from 'react';

// Define the Product type based on the JSON structure
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  stock: number;
}

// Mock API call to fetch products (replace this with an actual API call in a real app)
const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/path/to/your/products.json');
  return response.json();
};

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    // Handle adding the product to the cart (implement this based on your cart logic)
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-green-600 font-bold mb-2">${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
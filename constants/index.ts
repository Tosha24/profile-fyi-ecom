type ProductType = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  stock: number;
};

export const products : ProductType[] = [
  {
    id: 1,
    name: "Smartphone",
    image: "smartphone.jpg",
    price: 499.99,
    description:
      "A high-quality smartphone with a powerful processor and excellent camera.",
    category: "Electronics",
    stock: 25,
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    image: "earbuds.jpg",
    price: 99.99,
    description: "Comfortable wireless earbuds with superior sound quality.",
    category: "Electronics",
    stock: 50,
  },
  {
    id: 3,
    name: "Laptop",
    image: "laptop.jpg",
    price: 899.99,
    description: "A sleek and powerful laptop for all your computing needs.",
    category: "Electronics",
    stock: 10,
  },
  {
    id: 4,
    name: "Running Shoes",
    image: "shoes.jpg",
    price: 59.99,
    description: "Lightweight running shoes with excellent cushioning.",
    category: "Sportswear",
    stock: 30,
  },
  {
    id: 5,
    name: "Fitness Tracker",
    image: "fitness_tracker.jpg",
    price: 49.99,
    description:
      "Keep track of your daily activities and health with this fitness tracker.",
    category: "Sportswear",
    stock: 40,
  },
  {
    id: 6,
    name: "Backpack",
    image: "backpack.jpg",
    price: 39.99,
    description: "Durable and spacious backpack suitable for work or travel.",
    category: "Accessories",
    stock: 20,
  },
  {
    id: 7,
    name: "Sunglasses",
    image: "sunglasses.jpg",
    price: 19.99,
    description: "Stylish sunglasses with UV protection.",
    category: "Accessories",
    stock: 60,
  },
];

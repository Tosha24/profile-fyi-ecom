export type ProductType = {
  id: number;
  name: string;
  image: string[];
  price: number;
  description: string;
  category: string;
  stock: number;
};

export const products: ProductType[] = [
  {
    id: 1,
    name: "Smartphone",
    image: ["smartphone.webp"],
    price: 499,
    description:
      "A high-quality smartphone with a powerful processor and excellent camera. ",
    category: "Electronics",
    stock: 25,
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    image: [
      "earbuds.jpg",
    ],
    price: 99,
    description: "Comfortable wireless earbuds with superior sound quality.",
    category: "Electronics",
    stock: 50,
  },
  {
    id: 3,
    name: "Laptop",
    image: ["laptop.jpg"],
    price: 899,
    description: "A sleek and powerful laptop for all your computing needs.",
    category: "Electronics",
    stock: 10,
  },
  {
    id: 4,
    name: "Running Shoes",
    image: ["shoes.jpeg"],
    price: 59,
    description: "Lightweight running shoes with excellent cushioning.",
    category: "Sportswear",
    stock: 30,  
  },
  {
    id: 5,
    name: "Fitness Tracker",
    image: ["fitness-tracker.jpg"],
    price: 49,
    description:
      "Keep track of your daily activities and health with this fitness tracker.",
    category: "Sportswear",
    stock: 40,
  },
  {
    id: 6,
    name: "Backpack",
    image: ["bagpack.jpeg"],
    price: 39,
    description: "Durable and spacious backpack suitable for work or travel.",
    category: "Accessories",
    stock: 20,
  },
  {
    id: 7,
    name: "Sunglasses",
    image: ["sunglasses.jpg"],
    price: 19,
    description: "Stylish sunglasses with UV protection.",
    category: "Accessories",
    stock: 60,
  },
];

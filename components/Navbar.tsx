"use client";

import { CartContext } from "@/context/CartContext";
import { UserContext } from "@/context/UserContext";
import { getUserEmail } from "@/lib/actions/user.actions";
import { removeSession } from "@/lib/cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { userId, logout } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    async function fetchEmail() {
      if (userId) {
        const email = await getUserEmail(userId);
        setUserEmail(email);
      }
    }
    fetchEmail();
  }, [userId]);

  const router = useRouter();
  const routeToCart = () => {
    router.push("/cart");
  };

  const handleLogout = async () => {
    logout();
    toast.success("Logged out successfully");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#FBF6E2] text-[#131842] shadow-md z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
          >
            My E-Commerce
          </h1>
          {userId && (
            <button
              onClick={routeToCart}
              className="relative flex items-center space-x-2"
              title="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h18l-1.68 10.68a2 2 0 01-1.99 1.82H7.67a2 2 0 01-1.99-1.82L4 7H20M9 20a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div className="bg-white text-black border border-[#131842] absolute bottom-3 font-bold left-2 rounded-full p-1 w-5 h-5 text-xs flex items-center justify-center">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </div>
            </button>
          )}
        </div>

        {userId ? (
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-rosePink text-white px-3 py-2 rounded hover:bg-rosePink/60 transition duration-300"
            >
              Logout
            </button>
            <div
              className="cursor-pointer w-12 h-12 rounded-full bg-rosePink text-[#FBF6E2] items-center justify-center flex text-2xl font-bold"
              title={userEmail}
            >
              {userEmail.charAt(0).toUpperCase()}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4 p-2">
            <button
              onClick={() => router.push("/sign-in")}
              className="bg-rosePink text-white px-3 py-1 rounded hover:bg-rosePink/60 transition duration-300"
            >
              Sign-In
            </button>
            <button
              onClick={() => router.push("/sign-up")}
              className="bg-rosePink text-white px-3 py-1 rounded hover:bg-rosePink/60 transition duration-300"
            >
              Sign-up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

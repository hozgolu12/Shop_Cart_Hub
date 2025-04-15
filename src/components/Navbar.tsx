
import React from "react";
import { Link } from "react-router-dom";
import { Cart } from "@/components/Cart";

export const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">ShopHub</Link>
        <div className="flex items-center space-x-4">
          <Cart />
        </div>
      </div>
    </header>
  );
};

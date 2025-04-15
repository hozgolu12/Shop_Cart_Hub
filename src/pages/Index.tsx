
import React from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Featured Products</h1>
          <p className="text-gray-600 mb-6">Explore our collection of top-quality products</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={{...product, price: product.price}} />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 ShopHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

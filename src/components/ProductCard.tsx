
import React from "react";
import { Product, useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <Button 
            onClick={() => addToCart(product)} 
            size="sm"
            variant="default"
            className="text-xs flex items-center gap-1"
          >
            <PlusCircle size={16} />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

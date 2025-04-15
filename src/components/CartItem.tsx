
import React from "react";
import { CartItem as CartItemType, useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-center py-4 border-b">
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="text-base font-medium text-gray-900">
            {product.name}
          </h3>
          <p className="ml-4 text-sm font-medium text-gray-900">
            ₹{(product.price * quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              onClick={() => decrementQuantity(product.id)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
            >
              <Minus size={16} />
            </Button>
            <span className="px-2">{quantity}</span>
            <Button
              onClick={() => incrementQuantity(product.id)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
            >
              <Plus size={16} />
            </Button>
          </div>

          <Button
            onClick={() => removeFromCart(product.id)}
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 p-0"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

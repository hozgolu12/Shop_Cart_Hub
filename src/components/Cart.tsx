
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { ShoppingCart} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";

export const Cart: React.FC = () => {
  const { cartItems, getCartTotal, getCartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleCheckout = () => {
    setIsOpen(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart size={20} />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-4">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-bold">Your Cart</SheetTitle>
          </div>
        </SheetHeader>
        
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <ShoppingCart size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <SheetClose asChild>
              <Button variant="outline" className="mt-4">
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
            
            <SheetFooter className="border-t pt-4">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-xl font-bold">₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => clearCart()}
                  >
                    Clear Cart
                  </Button>
                  <Button 
                    onClick={handleCheckout}
                    className="flex-1"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

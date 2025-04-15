
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowLeft, CreditCard, Wallet, Smartphone } from "lucide-react";

const Checkout: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      navigate("/");
      alert("Payment successful! Thank you for your order.");
      setIsProcessing(false);
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-6">Add some products to your cart before checking out.</p>
        <Button onClick={() => navigate("/")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate("/")}
        className="mb-6"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Shopping
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="order-2 md:order-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Form */}
        <div className="order-1 md:order-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Complete your purchase securely</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Payment Method</h3>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex items-center">
                        <CreditCard size={16} className="mr-2" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center">
                        <Smartphone size={16} className="mr-2" />
                        UPI
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="flex items-center">
                        <Wallet size={16} className="mr-2" />
                        Digital Wallet
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="**** **** **** ****" required />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVV</Label>
                        <Input id="cvc" placeholder="***" required />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <div className="flex space-x-2">
                      <Input id="upiId" placeholder="yourname@upi" className="flex-1" required />
                    </div>
                  </div>
                )}

                {paymentMethod === "wallet" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Wallet</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button type="button" variant="outline" className="justify-start">
                          <img src="https://img.icons8.com/color/48/000000/paytm.png" alt="PayTM" className="w-5 h-5 mr-2" />
                          PayTM
                        </Button>
                        <Button type="button" variant="outline" className="justify-start">
                          <img src="https://img.icons8.com/color/48/000000/phonepe.png" alt="PhonePe" className="w-5 h-5 mr-2" />
                          PhonePe
                        </Button>
                        <Button type="button" variant="outline" className="justify-start">
                          <img src="https://img.icons8.com/color/48/000000/amazon-pay.png" alt="Amazon Pay" className="w-5 h-5 mr-2" />
                          Amazon Pay
                        </Button>
                        <Button type="button" variant="outline" className="justify-start">
                          <img src="https://img.icons8.com/color/48/000000/google-pay-india.png" alt="Google Pay" className="w-5 h-5 mr-2" />
                          Google Pay
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobileNumber">Mobile Number</Label>
                      <Input id="mobileNumber" placeholder="Enter registered mobile number" required />
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Pay ₹${getCartTotal().toFixed(2)}`}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

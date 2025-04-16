
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
  const [isS1, setIsS1] = useState(false);
  const [isS2, setIsS2] = useState(false);
  const [isS3, setIsS3] = useState(false);
  const [isS4, setIsS4] = useState(false);
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
            
                        <Button type="button" variant="outline" className={`justify-start ${isS1 ? 'bg-gray-200 border-gray-200 shadow-md' : ''}`}
                         onClick={() => setIsS1(!isS1)}>
                          <img src="https://img.icons8.com/color/48/000000/paytm.png" alt="PayTM" className="w-5 h-5 mr-2" />
                          PayTM
                        </Button>
                        <Button type="button" variant="outline" className={`justify-start ${isS2 ? 'bg-gray-200 border-gray-200 shadow-md' : ''}`}
                         onClick={() => setIsS2(!isS2)}>
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAdVBMVEVfJZ////9UC5qahb/x7faWeb1cHp69q9VNAJZdIJ79/P2afsDh2exeI59XD5tRAJj59/uGZLNYFZtyRKno4/BFAJPYz+bGt9psPaVkLKLMv95nMaNpNqSnkceehcKCX7J+WK+0oNB4T6yPcrmJa7bRxuGll8ZBfWcPAAAKzElEQVR4nN2df7eiLBDH0WuIJmKk2S9LrZ73/xIfrdtmCSYwdD19/9qze9b6JAwwM8wgx1BehRimyFAUs73vmX4XZPS/k9WMkcCU5CZMyHmV/BVMmOZlxoxfykPUzco8/QuYMPKXhMOR3BSTZR59GiaMqjU8Siue1b4ujh5MVNUM20C54rC60htsOjBeVWIrb+UfDj5WOqZNAyYvKQec9iJRjsr8AzBeiWyjtAo4OirbaVWYinOgdeU9DvetwqRL8oG3chclazW7pgKT+NzqvO+reTkqY00BJjoRa+ZYJkxOCi9nNEySL8mnUVqxZT765YyFSYs4/guWdqgVY9eckTDRGWpzrK7xQ20czLZmf4XSitVbOBh//2Er9iq+H7XkjIAJi+DjVuxVOChCCJjkwP5sujwUsMN7o/YWJj2rW2QaYBwEwHsFcnpr1N7BpAtFFoo53uz2+/0GYdjRSc7vTjlvYNKjEgvFcbAufy5pkngr/7SG3ZSS4xuaYRglFspdXJ+qjodlNaOgL+cdzSBMWo5n4SwoD9WLryjx0SdphmA8hfnCl0UeCexNDumLejdvBmC80/jdGC9l/js/g4RB7pBNk8Mk8/HHY4oq6XMOoDSUD6w3UpikUDjqBzv5diPRWKgGaeR7ASmMH6uY1fgghXG8EnSXGsTSH04Gs+VKZoiygb1Tugc9CuFYtoeWwKx2ivtkSgr5WI5gd918v1KBSdVHRkMjtzPbHehywxZiAy2ECQ86c5Yc5DT+Bnbx/BEOAyGMr2d/yFxKk1QIdpsmNAIimJWr+cEDu/TkAOrUDVyRW0AAkyy1jQ+T7za8swsIg+JaMNAEMAeDZSFeSB0p3hrUQLP5GJit0RGRH+U0oPEpivurTQ/Gq80+ktdSmiiDnDa47k3QHszMdDC4a8mS5jiXDNKkxb2B9gqTmy9v7k5Kk0M6evDuNbj2AgNic2IpTbMVB6RxXzcCzzBhFUMMa44vEhoPcrmhcTUEEy1hdoQ8ltGkZ0CaV2PzBJMUUCcPLjCcv79XCbiDZs9b9SeYFZwvBSPZESpaw9Fg9DQ7uzDJDPBIKKe5ABoBNu++mi7MCjSUjGklocnhXByUdF9NByYsQbeCzfG2khylKzgad9H5jA7MCtbD1ezTSSU5Ss/gHDZZ59V0YIDM8tMnyRwDZ7DZyZcimAj6xbSS0Xgl2Hkge6w1D5ijldB4JnFApjXUx/GyDxNZiidnEsfASv88+yKW9mBmtgLKZCY8SodbqMWTz15hvJ21KGwsdgyEUO6nYOe9wFTQ8dSHKBc7BpRc80PPD6pnmORoMW2BShwDCZDDht9zBn9htnubeQs0rsUuKBiThvfbJ5i54m9EFRXvxDQux10FVGvg3QMqNxi1QwbF6nKZeKTtll3tN1hnHvHfuO0Nxt8o2DIa1IWvLtmu8xkuP2J1sxr8ujauMOGPyoqJS/1s/REqlEJ2N7HiAROp2DIaFDZZGhr1LTW//b5XmK1KvGEosgwj9V1iEGzvMGGlMsrsw6zUt4nsOiNbmHSh8lPYh/HUT1a3LVMLs1LaJH0A5qS8M8Cb1S/MVi0NyzpMohEhIvkNxlP7v9OEYW10GLWHPqUhOk0Y3u7+UHvGVNtB4IHUkj+Doe12qYHJFRcpvjC+HQoPc500SN1bHvSCPFOAYT9JA+Mpu+Xj0uRm6AiYmcahjZdeC6MeX+Jnq1vNVCcUSeMWRsP5R3ltfqu6++2jrnI9D14WNTBbHU8m39Sn+U0z0UElvf/ri2bCa1f/rbsnNNXssDvMtoHRi5YF/867bCGAiTLxgZPNRG/0hz2dnbVY2jMNCpV2mQLFQhiJuXfFMBBemuZ7oNDUFTcVGLwLUWKaRT0VGMpC5JlGMqYCgzIPpd8DE6HL18CQC9LMx3xoOjA5Mk7KmAwMq5BJEuNV04EpkKrLvKfJwPATWpgGZqYDc0SGKZkTgsE12pvGMicDE+zRzjSuOBkYukMb02dMBgZ9Fczmu2C+Z858FUxjAL7KNH/VommcZjwZGL5Ap6+BceffdJ45IKVIs0jTgSmQanSmp8nAEB9djGGOU4G5IOMM4LgUOc7/xtVk7ATkSwGM7KmWnYDG7lmMRLlXn4ehLDF3nFMigpEEv2w6zjeheUgDZaL4keQqjs2QxinUDTZ1lInCtRKvr0WYNthkfjUnE16WE09FizDXMKCxbSbCzEBxPp9NmDZA65leAYsXIhhPmOpvD+YWOldPanhREItgnDwWPNceDD96OukmPWXCnIDQp307yYS1HCBg2iubGolAPYkLWjjhpXwuto0Z2eeiRQkChjRP1kjR6onXQphm3uR1lhEWxy5jJMs2h4snvOcE8mYineS5viiX1wHxLtX8eDzPCn/lJbKccwAYvkx10hpFT6pkMOMEAHNPa9QtM/MQlo2zz8HcE06dlWmBmwCZpdOZwzxSgdWStEXiC6O+EeYw8eKepK2WPi9SsFEtRw4McysMcLvYEBj7aN+VuLQLEwTXcX67cmLs1qR4oLyZfZjulZPQ2Dg3M3BcSWU7MOwn/Afj5CrXtMTiimXvIWGCTeealpMCVOnga+0cVFOY5wt0ylcbRYqRLo0pzPPVRphLp5xojjRDGLy+PMGEINeBg0wv3dkQht8dxLAXtaleDykzmN5FbbAr9C4thnBSUeVgQ5j+FXrHOIL2K8z2Bz8SnlzSS3UUlqc0g+H/6pxZKDuBWVDPq23U+dqhF12qw2LNiAWHhqDsBGRBkLZA+Lo+nmaHoigOh8PsfKzX1I2xDe+MqCAIcKkWinmjtqL+9Q/NH68GxgKMsFSLzHFvolsxgM5fwMOIi+jAlzcSCB6m82JsFp4SCRzG7fbc6pYEi+x3l4KGoUxSEgy2WJtY0DDyYm2QZfQkAoa5OWXEMHAFDmUChhkqcAhWelIqWBi+HCg96YSVa9cGgMLQ1zp9L+Vazf2BwwKFic8vD+sV0oWtrP4qSJi3hXRhvAFyQcK4s9fngBeffvcFwGBwv5hVvyx4bt5SWi44GIr7kQdBwfa5xcVG3D5GB4YJ6kWISumDFVLsKxY2jtCAiZfjSuk7K3td2vBelJuiDoNdUbFuyPYTY8R8ga9DGYaObz/hJFqNQUaJi0pWKMOQH6H7R9KyZWHNCLiCQI4qjFLLlmbaWGs6Sd2qNxAU2na1Umym4zjb2NbaScn59bPUvKlYWj8dqAGVklhWpMlD+UZpFATy3tRSmBCo/qhIlGVst/4VVmugrNUaDLr9zet30qz/QflAM6XBdnr2XU/KioWbu/cwWk1OLUu70aFya1D7MmhBqdG01a6IZLEcBzMtmncs7xvqTmfevGV53+rYO02EBqDV8Xc1oW73ArA9fnUE1R7c+arG7Y22tfVgx5BYPS7/axyME53UtoOQCsjYEoQjYRyv4H801OK4GJsyORbGSfL1nww1ssxHZ+OMhmmG2vnzQw2Tk0LalwKMk/ifHmqcy3oLGcO0bX7tB6QfokQx71MNxnEqDtndb0gBV74voQrjeEf0CRzKUamcVagM4zh5iWx6B+4oGnclNGAcrzpiq5aA47LSSfbUgWlOOVXNrOFgVld6Nwv0YBq75teZFRxO1pVu7rouTIOTrwk4ToMiSfC0C9MMtrzMIJMgqJvVeaqNYgbT7AlWZ0KADHVA9JKiwWCc1rTtIJpLY4a0DNiT/gdR1cICoThstwAAAABJRU5ErkJggg==" alt="PhonePe" className="w-5 h-5 mr-2" />
                          PhonePe
                        </Button>
                        
                        
                        <Button type="button" variant="outline" className={`justify-start ${isS3 ? 'bg-gray-200 border-gray-200 shadow-md' : ''}`}
                         onClick={() => setIsS3(!isS3)}>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOX3T9cAChlYCngKOGWd4lbDVvN-S7xnx-CYg05d-Zf6X8ElBiJmnIPE0&s" alt="Amazon Pay" className="w-5 h-5 mr-2" />
                          Amazon Pay
                        </Button>
                        
                        
                        <Button type="button" variant="outline" className={`justify-start ${isS4 ? 'bg-gray-200 border-gray-200 shadow-md' : ''}`}
                         onClick={() => setIsS4(!isS4)}>
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

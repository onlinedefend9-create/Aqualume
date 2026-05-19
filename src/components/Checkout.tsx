import React, { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle, Loader2, Plus, Minus, ShoppingBag } from "lucide-react";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  price: string;
  currency: string;
}

export const Checkout = ({ isOpen, onClose, price, currency }: CheckoutProps) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [orderStatus, setOrderStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const unitPrice = parseFloat(price);
  const totalAmount = (unitPrice * quantity).toFixed(2);

  const createOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const order = await response.json();
      return order.id;
    } catch (err) {
      console.error(err);
      setErrorMessage("Could not initiate PayPal checkout.");
      setOrderStatus("error");
      throw err;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const response = await fetch(`/api/orders/${data.orderID}/capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const captureData = await response.json();
      
      const errorDetail = captureData?.details?.[0];
      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${captureData.debug_id})`);
      } else {
        setOrderStatus("success");
      }
    } catch (err) {
      console.error(err);
      setOrderStatus("error");
      setErrorMessage("Payment failed. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 300
              }
            }}
            exit={{ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }}
            className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-12 space-y-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>

            {orderStatus === "idle" && (
              <motion.div 
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="space-y-8 text-center"
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="space-y-2"
                >
                  <h2 className="text-3xl font-black text-brand-dark tracking-tighter">Complete Order</h2>
                  <p className="text-gray-400 font-secondary text-sm">Review your selection below</p>
                </motion.div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                    <div className="w-24 h-24 bg-white rounded-3xl overflow-hidden border border-gray-100 flex-shrink-0 shadow-sm p-2">
                      <img src="input_file_0.png" alt="Product" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-black text-brand-dark leading-tight">WATTer LAMP™</h4>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Saltwater Survival LED</p>
                      <div className="mt-4 flex items-center gap-3">
                         <div className="flex items-center border border-gray-200 rounded-full px-2 py-1 bg-white shadow-sm">
                            <button 
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="p-1 hover:text-brand-blue transition-colors disabled:opacity-30"
                              disabled={quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-xs font-black">{quantity}</span>
                            <button 
                              onClick={() => setQuantity(quantity + 1)}
                              className="p-1 hover:text-brand-blue transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                         </div>
                         <span className="text-sm font-bold text-gray-400 ml-auto">{price} {currency}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 p-4 bg-brand-blue/5 rounded-3xl border border-brand-blue/10">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Subtotal ({quantity} {quantity === 1 ? 'item' : 'items'})</span>
                      <span className="font-bold text-brand-dark">{totalAmount} {currency}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Shipping</span>
                      <span className="text-green-500 font-bold uppercase text-[10px] tracking-widest">Free</span>
                    </div>
                    <div className="h-px bg-brand-blue/10 my-1" />
                    <div className="flex justify-between items-center">
                      <span className="font-black text-brand-dark">Order Total</span>
                      <span className="text-2xl font-black text-brand-blue">{totalAmount} {currency}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="min-h-[150px] flex flex-col justify-center"
                >
                  {isPending ? (
                    <div className="flex flex-col items-center gap-4 text-gray-400">
                      <Loader2 className="animate-spin" size={32} />
                      <p className="text-sm font-bold uppercase tracking-widest">Loading PayPal...</p>
                    </div>
                  ) : (
                    <PayPalButtons 
                      style={{ 
                        layout: "vertical",
                        shape: "pill",
                        label: "checkout",
                        color: "gold" 
                      }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={(err) => {
                        console.error("PayPal Error:", err);
                        setErrorMessage("An error occurred with PayPal. Please try again.");
                        setOrderStatus("error");
                      }}
                      onCancel={() => {
                        console.log("PayPal Checkout Cancelled");
                      }}
                    />
                  )}
                </motion.div>
                
                <motion.p 
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1 }
                  }}
                  className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em]"
                >
                  Secure Encryption • Powered by PayPal
                </motion.p>
              </motion.div>
            )}

            {orderStatus === "success" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6 py-10"
              >
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-brand-dark tracking-tighter">Order Success!</h2>
                  <p className="text-gray-500 font-secondary">Your WATTer LAMP™ is on its way. Check your email for confirmation.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="btn-primary w-full py-4 rounded-2xl"
                >
                  Return to Home
                </button>
              </motion.div>
            )}

            {orderStatus === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6 py-10"
              >
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-brand-dark tracking-tighter">Something went wrong</h2>
                  <p className="text-gray-500 font-secondary">{errorMessage}</p>
                </div>
                <button 
                  onClick={() => setOrderStatus("idle")}
                  className="btn-primary bg-brand-dark hover:bg-black w-full py-4 rounded-2xl"
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

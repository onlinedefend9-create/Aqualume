import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle, Loader2, Plus, Minus, ShieldCheck, Mail, User, MapPin } from "lucide-react";
import productImg from "../assets/images/aqualume_product_shot_studio_1779185939933.png";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  price: string;
  currency: string;
  productName?: string;
  productSubtitle?: string;
  productImage?: string;
  language?: "fr" | "en";
}

export const Checkout = ({ 
  isOpen, 
  onClose, 
  price, 
  currency = "EUR",
  productName = "AquaLume™ Classic",
  productSubtitle = "Saltwater Survival LED",
  productImage = productImg,
  language = "fr"
}: CheckoutProps) => {
  const [orderStatus, setOrderStatus] = useState<"idle" | "success" | "error">("idle");
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Shipping details state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    postalCode: "",
    city: ""
  });
  
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    address: ""
  });

  const unitPrice = parseFloat(price);
  const totalAmount = (unitPrice * quantity).toFixed(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = { fullName: "", email: "", address: "" };
    let hasError = false;
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = language === "en" ? "Full name is required." : "Le nom complet est obligatoire.";
      hasError = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = language === "en" ? "Email address is required." : "L'adresse e-mail est obligatoire.";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === "en" ? "Invalid email address." : "Adresse e-mail invalide.";
      hasError = true;
    }
    if (!formData.address.trim()) {
      newErrors.address = language === "en" ? "Shipping address is required." : "L'adresse de livraison est obligatoire.";
      hasError = true;
    }
    
    if (hasError) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate secure transaction latency for premium feel
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderStatus("success");
    }, 1500);
  };

  const t = {
    fr: {
      orderTitle: "Votre commande",
      orderDesc: "Découvrez votre panier et finalisez votre commande sécurisée.",
      subtotal: "Sous-total",
      shipping: "Livraison",
      freeExpress: "Gratuite (Express)",
      total: "Total",
      shippingInfo: "Informations de Livraison",
      fullName: "Nom Complet",
      fullNamePlaceholder: "Ex: Jean Dupont",
      email: "Adresse E-mail",
      emailPlaceholder: "Ex: jean.dupont@email.fr",
      address: "Adresse de Livraison",
      addressPlaceholder: "Ex: 12 Rue de la Paix",
      postalCode: "Code Postal",
      city: "Ville",
      processing: "Traitement sécurisé...",
      submitBtn: "Valider ma Commande",
      badges: "Paiement 100% Sécurisé SSL • Garantie Remboursement 30 jours",
      successTitle: "Commande Validée !",
      successDescPre: "Merci ",
      successDescPost: ". Votre AquaLume™ est en cours de préparation logistique. Un e-mail de confirmation détaillé a été envoyé à ",
      backToShop: "Retour à la boutique",
      errorTitle: "Une erreur est survenue",
      errorDesc: "Une erreur inattendue est survenue lors de l'enregistrement de votre commande.",
      retry: "Réessayer"
    },
    en: {
      orderTitle: "Your Order",
      orderDesc: "Review your cart items and complete your secure order.",
      subtotal: "Subtotal",
      shipping: "Shipping",
      freeExpress: "Free (Express)",
      total: "Total",
      shippingInfo: "Shipping Information",
      fullName: "Full Name",
      fullNamePlaceholder: "e.g. John Doe",
      email: "Email Address",
      emailPlaceholder: "e.g. john.doe@email.com",
      address: "Shipping Address",
      addressPlaceholder: "e.g. 123 Main Street",
      postalCode: "Postal Code",
      city: "City",
      processing: "Processing securely...",
      submitBtn: "Confirm My Order",
      badges: "100% Secure SSL Payment • 30-Day Money-Back Guarantee",
      successTitle: "Order Confirmed!",
      successDescPre: "Thank you ",
      successDescPost: ". Your AquaLume™ order is now being processed. A detailed confirmation email has been sent to ",
      backToShop: "Back to Shop",
      errorTitle: "An error occurred",
      errorDesc: "An unexpected error occurred while placing your order. Please try again.",
      retry: "Try Again"
    }
  }[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
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
            exit={{ opacity: 0, scale: 0.95, y: 15, transition: { duration: 0.2 } }}
            className="relative bg-[#151b27] border border-white/10 text-white w-full max-w-lg rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-y-auto p-4 md:p-8 space-y-4"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X size={16} className="text-gray-300" />
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
                      staggerChildren: 0.05
                    }
                  }
                }}
                className="space-y-4"
              >
                <div className="text-center">
                  <h2 className="text-xl font-black text-white tracking-tight">{t.orderTitle}</h2>
                  <p className="text-gray-400 text-xs mt-1">{t.orderDesc}</p>
                </div>

                {/* Product Summary */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-[#0d1015] rounded-2xl border border-white/5">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#111622] rounded-xl overflow-hidden border border-white/15 flex-shrink-0 p-1 flex items-center justify-center">
                      <img src={productImage} alt={productName} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 text-center sm:text-left space-y-1">
                      <h4 className="font-bold text-white leading-tight text-sm">{productName}</h4>
                      <p className="text-[9px] font-bold text-primary uppercase tracking-widest">{productSubtitle}</p>
                      
                      <div className="pt-1.5 flex items-center justify-center sm:justify-start gap-3">
                         <div className="flex items-center border border-white/10 rounded-full px-2 py-0.5 bg-black/40">
                            <button 
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="p-1 text-gray-400 hover:text-primary transition-colors disabled:opacity-30"
                              disabled={quantity <= 1 || isSubmitting}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-6 text-center text-[11px] font-black">{quantity}</span>
                            <button 
                              onClick={() => setQuantity(quantity + 1)}
                              className="p-1 text-gray-400 hover:text-primary transition-colors"
                              disabled={isSubmitting}
                            >
                              <Plus size={10} />
                            </button>
                         </div>
                         <span className="text-xs font-bold text-gray-400">{price} €</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="flex flex-col gap-2 p-4 bg-[#0d1015] rounded-2xl border border-white/5 text-xs">
                    <div className="flex justify-between items-center text-gray-400">
                      <span>{t.subtotal}</span>
                      <span className="font-bold text-white">{totalAmount} €</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400">
                      <span>{t.shipping}</span>
                      <span className="text-primary font-black uppercase text-[10px]">{t.freeExpress}</span>
                    </div>
                    <div className="h-px bg-white/5 my-1" />
                    <div className="flex justify-between items-center">
                      <span className="font-black text-gray-400 uppercase text-[10px] tracking-wider">{t.total}</span>
                      <span className="text-lg sm:text-xl font-black text-white tracking-tight">{totalAmount} <span className="text-xs text-primary font-bold">€ EUR</span></span>
                    </div>
                  </div>
                </div>

                {/* Delivery Form */}
                <form onSubmit={handleLocalSubmit} className="space-y-3.5 pt-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 text-left">{t.shippingInfo}</h3>
                  
                  <div className="space-y-3">
                    {/* Full Name */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1.5 pl-1">
                        <User size={10} className="text-primary" />
                        {t.fullName}
                      </label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={t.fullNamePlaceholder}
                        disabled={isSubmitting}
                        className={`w-full bg-[#0d1015] border ${errors.fullName ? 'border-red-500' : 'border-white/10 focus:border-primary'} text-sm text-white px-4 py-3 rounded-xl outline-none focus:ring-0 transition-colors placeholder-gray-600`}
                      />
                      {errors.fullName && <p className="text-red-500 text-[10px] font-bold mt-1 pl-1">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1.5 pl-1">
                        <Mail size={10} className="text-primary" />
                        {t.email}
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t.emailPlaceholder}
                        disabled={isSubmitting}
                        className={`w-full bg-[#0d1015] border ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-primary'} text-sm text-white px-4 py-3 rounded-xl outline-none focus:ring-0 transition-colors placeholder-gray-600`}
                      />
                      {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 pl-1">{errors.email}</p>}
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1.5 pl-1">
                        <MapPin size={10} className="text-primary" />
                        {t.address}
                      </label>
                      <input 
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder={t.addressPlaceholder}
                        disabled={isSubmitting}
                        className={`w-full bg-[#0d1015] border ${errors.address ? 'border-red-500' : 'border-white/10 focus:border-primary'} text-sm text-white px-4 py-3 rounded-xl outline-none focus:ring-0 transition-colors placeholder-gray-600`}
                      />
                      {errors.address && <p className="text-red-500 text-[10px] font-bold mt-1 pl-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Postal Code */}
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 pl-1">
                          {t.postalCode}
                        </label>
                        <input 
                          type="text" 
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          placeholder="Ex: 75001"
                          disabled={isSubmitting}
                          className="w-full bg-[#0d1015] border border-white/10 focus:border-primary text-sm text-white px-4 py-3 rounded-xl outline-none focus:ring-0 transition-colors placeholder-gray-600"
                        />
                      </div>

                      {/* City */}
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 pl-1">
                          {t.city}
                        </label>
                        <input 
                          type="text" 
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Ex: Paris"
                          disabled={isSubmitting}
                          className="w-full bg-[#0d1015] border border-white/10 focus:border-primary text-sm text-white px-4 py-3 rounded-xl outline-none focus:ring-0 transition-colors placeholder-gray-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-[#3ce573] text-[#151b27] py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-95 shadow-lg shadow-primary/10 flex items-center justify-center gap-2 mt-4 disabled:opacity-75 disabled:hover:bg-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {t.processing}
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={16} />
                        {t.submitBtn} • {totalAmount} €
                      </>
                    )}
                  </button>
                </form>
                
                <div className="flex items-center justify-center gap-2 opacity-50 text-[9px] text-gray-300 font-bold uppercase tracking-[0.1em] text-center pt-1 md:pt-2">
                  <ShieldCheck size={12} className="text-primary" />
                  <span>{t.badges}</span>
                </div>
              </motion.div>
            )}

            {orderStatus === "success" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6 py-10"
              >
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white tracking-tighter">{t.successTitle}</h2>
                  <p className="text-gray-400 font-secondary text-sm">
                    {t.successDescPre} <span className="text-white font-bold">{formData.fullName || "cher client"}</span>{t.successDescPost}<span className="text-white font-semibold">{formData.email || "votre adresse email"}</span>.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setOrderStatus("idle");
                    onClose();
                  }}
                  className="bg-primary hover:bg-[#3ce573] text-[#151b27] w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-colors shadow-lg shadow-primary/10"
                >
                  {t.backToShop}
                </button>
              </motion.div>
            )}

            {orderStatus === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6 py-10"
              >
                <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                  <AlertCircle size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white tracking-tighter">{t.errorTitle}</h2>
                  <p className="text-gray-400 font-secondary">{t.errorDesc}</p>
                </div>
                <button 
                  onClick={() => setOrderStatus("idle")}
                  className="bg-white/10 hover:bg-white/20 text-white w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {t.retry}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

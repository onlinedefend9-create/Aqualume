"use client";

import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PayPalCheckout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const initPayPal = () => {
      if (window.paypal && window.paypal.HostedButtons && containerRef.current) {
        if (containerRef.current.children.length === 0) {
           try {
             window.paypal.HostedButtons({
               hostedButtonId: "SFSQ384DXFELU",
             }).render("#paypal-container-SFSQ384DXFELU");
             setIsLoaded(true);
           } catch(e) {
             console.error("PayPal render error:", e);
           }
        }
      } else {
        timeoutId = setTimeout(initPayPal, 200);
      }
    };

    initPayPal();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-full relative flex items-center justify-start min-h-[55px]">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="w-6 h-6 border-2 border-[#10b981] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div 
        ref={containerRef} 
        id="paypal-container-SFSQ384DXFELU"
        className="w-full h-full"
      ></div>
    </div>
  );
}

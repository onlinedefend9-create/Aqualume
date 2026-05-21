import React from 'react';
import Navbar from './components/Navbar';
import HeroStory from './components/HeroStory';
import Features from './components/Features';
import Products from './components/Products';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#151b27] overflow-x-hidden">
      <Navbar />
      <HeroStory />
      <Features />
      <Products />
      <HowItWorks />
      <Testimonials />
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;

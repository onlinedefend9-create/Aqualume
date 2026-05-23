import React from 'react';
import HeroStory from './HeroStory';
import About from './About';
import Features from './Features';
import Products from './Products';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';

const Home: React.FC = () => {
  return (
    <>
      <HeroStory />
      <About />
      <Features />
      <Products />
      <HowItWorks />
      <Testimonials />
    </>
  );
};

export default Home;

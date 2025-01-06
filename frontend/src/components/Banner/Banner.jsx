// filepath: frontend/src/components/Banner.jsx
import React from 'react';

const Banner = () => {
  return (
    <div className="relative bg-gray-200 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center py-8">
        <div className="relative z-10 flex flex-col items-start justify-center h-full w-full md:w-1/2 p-8 order-2 md:order-1">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Welcome to Gussy Clothing Store</h1>
          <p className="text-lg md:text-xl mb-4">Find the best clothing items at unbeatable prices!</p>
          <button className="bg-white text-primary font-bold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300 text-base md:text-lg">
            Shop Now
          </button>
        </div>
        <div className="relative w-full md:w-1/2 h-64 md:h-96 lg:h-128 mb-8 md:mb-0 order-1 md:order-2">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/best-white-shirts-women-2023-64c2926a7a80b.jpg"
            alt="Banner"
            className="w-full h-full object-cover rounded-bl-[64px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
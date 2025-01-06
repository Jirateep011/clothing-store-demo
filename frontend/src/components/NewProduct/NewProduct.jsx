import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Modal from '../Modal/Modal';

const NewProduct = ({ clothingItems }) => {
    const carouselRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handlePrevClick = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    const handleNextClick = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft.current = carouselRef.current.scrollLeft;
        carouselRef.current.style.cursor = 'grabbing';
        carouselRef.current.style.userSelect = 'none';
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
        carouselRef.current.style.cursor = 'default';
        carouselRef.current.style.userSelect = 'auto';
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        carouselRef.current.style.cursor = 'default';
        carouselRef.current.style.userSelect = 'auto';
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // Scroll-fast
        carouselRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleItemClick = (item) => {
        setSelectedProduct(item);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="text-left mb-1">
                <h1 className="text-4xl font-bold text-gray-800">NEW PRODUCT</h1>
            </div>
            <div className="relative">
                <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full z-10"
                    onClick={handlePrevClick}
                >
                    <FaChevronLeft />
                </button>
                <div
                    ref={carouselRef}
                    className="flex overflow-x-scroll no-scrollbar space-x-4 mx-12"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {clothingItems.map((item) => (
                        <div
                            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 transform transition duration-500 hover:scale-105 w-64 flex-shrink-0 select-none text-center cursor-pointer"
                            key={item._id}
                            onClick={() => handleItemClick(item)}
                        >
                            <div className="w-full h-48 sm:h-64 overflow-hidden mb-4">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-t-lg pointer-events-none" />
                            </div>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-2">{item.name}</h2>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <p className="text-base sm:text-lg md:text-xl font-semibold text-slate-700">฿ {item.price}</p>
                        </div>
                    ))}
                </div>
                <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full z-10"
                    onClick={handleNextClick}
                >
                    <FaChevronRight />
                </button>
            </div>
            {selectedProduct && (
                <Modal
                    isOpen={!!selectedProduct}
                    onClose={handleCloseModal}
                    product={selectedProduct}
                />
            )}
        </div>
    );
};

export default NewProduct;
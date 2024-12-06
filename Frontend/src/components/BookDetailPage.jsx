import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetailPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [hasPaid, setHasPaid] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false); // state for wishlist
    const pagesSectionRef = useRef(null);

    useEffect(() => {
        // Fetch book details
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://bookwookweb-backend.onrender.com/book/${id}`);
                if (response.data) {
                    setBook(response.data);
                }
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };
        fetchBookDetails();

        // Check localStorage for wishlist state
        const savedWishlistState = localStorage.getItem(`wishlist_${id}`);
        if (savedWishlistState !== null) {
            setIsWishlisted(JSON.parse(savedWishlistState));
        }
    }, [id]);

    const handleScrollToPages = () => {
        if (pagesSectionRef.current) {
            pagesSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handlePayment = () => {
        setHasPaid(true);
        alert("Payment successful! You can now read the book.");
    };

    // Toggle wishlist and update localStorage
    const toggleWishlist = () => {
        const newWishlistState = !isWishlisted;
        setIsWishlisted(newWishlistState);
        localStorage.setItem(`wishlist_${id}`, JSON.stringify(newWishlistState)); // Save to localStorage
    };

    if (!book) return <p>Loading...</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Book Details Section */}
            <div className="flex flex-col sm:flex-row gap-8">
                {/* Book Cover Image */}
                <div className="w-full sm:w-1/3">
                    <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-85 object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Book Info */}
                <div className="flex-1 p-6 bg-white rounded-lg shadow-lg dark:bg-slate-900" style={{ marginTop: "35px" }}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">{book.title}</h2>
                        <button
                            onClick={toggleWishlist}
                            className={`text-5xl ${isWishlisted ? "text-red-600" : "text-gray-500"} hover:scale-110 transition-transform`}
                            title="Add to Wishlist"
                        >
                            ♥
                        </button>
                    </div>
                    <p className="text-lg font-medium text-gray-600 mb-4 dark:text-white">Price: ${book.price}</p>
                    <p className="text-sm text-gray-500 mb-4 dark:text-white">Category: {book.category}</p>
                    <p className="text-sm text-gray-500 mb-4 dark:text-white">Genre: {book.genres}</p>
                    <p className="text-sm text-gray-700 mb-4 dark:text-white">
                        "BookWook is an innovative platform offering free and paid books. Discover engaging stories, read book pages online, and enjoy a seamless experience for readers and book enthusiasts alike."
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <button
                            onClick={() => window.history.back()}
                            className="mt-4 bg-primary text-white py-2 px-6 rounded-full hover:bg-blue-400 transition-colors w-full sm:w-auto"
                        >
                            Back
                        </button>

                        {book.price > 0 && !hasPaid ? (
                            <div className="mt-4 w-full sm:w-auto">
                                <p className="text-lg font-semibold text-gray-700 mb-4 dark:text-white">
                                    To read the book, please proceed with payment.
                                </p>
                                <button
                                    onClick={handlePayment}
                                    className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-400 transition-colors w-full sm:w-auto"
                                >
                                    Proceed with Payment
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleScrollToPages}
                                className="mt-4 bg-secondary text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors w-full sm:w-auto"
                            >
                                Read Now
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Pages Section */}
            {hasPaid || book.price === 0 ? (
                <div className="mt-8 sm:mt-16" ref={pagesSectionRef}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">Book Pages ---</h3>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        style={{
                            height: "calc(100vh - 150px)",
                            overflowY: "scroll",
                        }}
                    >
                        {["/images/page1.png", "/images/page2.png", "/images/page3.png", "/images/page4.png"].map(
                            (page, index) => (
                                <div key={index} className="flex justify-center">
                                    <img
                                        src={page}
                                        alt={`Page ${index + 1}`}
                                        className="object-contain"
                                        style={{
                                            width: "419px", 
                                            height: "596px", 
                                            maxWidth: "100%", 
                                            maxHeight: "100%", 
                                            objectFit: "contain"
                                        }}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default BookDetailPage;

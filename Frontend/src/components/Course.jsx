import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import axios from "axios";
import GenresMenu from "./GenresMenu"; // Import the genres menu component

function Course() {
  const [books, setBooks] = useState([]); // State to hold all books
  const [selectedGenre, setSelectedGenre] = useState(null); // State to hold the selected genre
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query entered by the user
  const [filteredBooks, setFilteredBooks] = useState([]); // State to hold the filtered books

  // Fetch all books on component load
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://bookwookweb-backend.onrender.com/book");
        const sortedBooks = response.data.sort((a, b) => {
          if (a.category === "Shelf+" && b.category !== "Shelf+") return -1;
          if (a.category !== "Shelf+" && b.category === "Shelf+") return 1;
          return 0;
        });
        setBooks(sortedBooks);
        setFilteredBooks(sortedBooks); // Initialize filteredBooks with all books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Function to filter books based on search query and selected genre
  const handleSearch = () => {
    let filtered = books;

    // Filter based on the search query
    if (searchQuery) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        book.genres.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter based on the selected genre
    if (selectedGenre) {
      filtered = filtered.filter((book) => book.genres === selectedGenre);
    }

    setFilteredBooks(filtered);
  };

  // Function to handle the search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Call handleSearch whenever the search query or selected genre changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedGenre]);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 bg-white">
      {/* Genres Menu */}
      <GenresMenu onGenreSelect={setSelectedGenre} />

      {/* Search Bar - Placed below GenresMenu */}
      <div className="flex justify-center mt-0 mb-0 dark:bg-slate-900 w-full"> 
        <div className="relative w-full max-w-4xl"> 
          <input
            type="text"
            value={searchQuery} // Bind input value to state
            onChange={handleSearchChange} // Handle input change
            className="w-full p-4 pl-12 border-2 border-gray-400 rounded-md dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-500 h-12"
            placeholder="Search books..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Tagline */}
      <div className="flex items-center justify-center text-center py-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          "Books to Read, Stories to Hook — Unlock More with{" "}
          <span className="text-blue-600">BookWook!</span>"
        </h1>
      </div>

      {/* Display Filtered Books */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link key={book._id} to={`/book/${book._id}`}>
              <Cards item={book} />
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-600 dark:text-white col-span-4">
            No books found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

export default Course;

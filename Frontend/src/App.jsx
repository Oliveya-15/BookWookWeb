import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Courses from "./Courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import About from "./Home/About";
import Contact from "./Home/Contact";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 
import BookDetailPage from "./components/BookDetailPage"; 
import Myprofile from "./components/Myprofile"; // Import MyProfile component

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        {/* Include Navbar here so it appears on every page */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book/:id" element={<BookDetailPage />} /> {/* New route for BookDetailPage */}
          <Route path="/myprofile" element={<Myprofile />} /> {/* New route for MyProfile */}
        </Routes>

        {/* Include Footer here so it appears on every page */}
        <Footer />

        <Toaster />
      </div>
    </>
  );
}

export default App;

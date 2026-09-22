import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServicesPage from "./components/ServicesPage";
import CategoryPage from "./pages/CategoryPage";
import ServiceDetail from "./pages/ServiceDetail";
import BookingPage from "./pages/BookingPage";
import SearchResultsPage from "./pages/SearchResultPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<CategoryPage />} />
        <Route path="/services/:slug/:serviceSlug" element={<ServiceDetail />} />
        <Route path="/booking/:slug/:serviceSlug" element={<BookingPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
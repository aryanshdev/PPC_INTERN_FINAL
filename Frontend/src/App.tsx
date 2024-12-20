import { DarkThemeToggle, Navbar } from "flowbite-react";
import Topbar from "./Components/Topbar.jsx";
import BookTaxi from "./Pages/BookTaxi.jsx";
import { Outlet, Navigate, Route, Routes, BrowserRouter, useLocation, useParams } from "react-router-dom";
import BookingConfirmation from "./Pages/BookingConfirmation.jsx";
import Ride from "./Pages/Ride.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css"

function App() {

  return (
    <BrowserRouter>
      <div>
        <Topbar />
        {/* Add the Toaster component */}
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<BookTaxi />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/bookingConfirmation" element={<BookingConfirmation />} />
          <Route path="/ride" element={<Ride />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

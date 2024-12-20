import React, { useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    addressName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    otp: "",
  });

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigator = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  async function getOtp() {
    try {
      if (!formData.email) {
        toast.error("Please enter an email address");
        return;
      }

      const response = await axios.post("http://localhost:10000/auth/signup/sendOTP", { userEmail: formData.email }, {withCredentials:true});
      if (response.status === 200) {
        toast.success("OTP sent to your email ID");
        
        setIsOtpSent(true);
      }
      console.log("OTP sent to your email ID");

    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP");
    }
  }

  async function verifyOtp() {
    try {
      const response = await axios.post("http://localhost:10000/auth/signup/verifyOTP", {
        userEmail: formData.email,
        enteredOTP: formData.otp,
      }, {withCredentials:true}
    );
      console.log()
      if (response.status === 200) {
        toast.success("OTP Verified Successfully");
        
      setOtpVerified(true);
      }

    } catch  (error) {
    
      if (error.response.status == 401){
        toast.error("Wrong OTP! Please Retry")
      }
      else {
        toast.error("Some Server Error")
      }
    }
  }

  async function sendUserData(e) {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!otpVerified) {
      toast.error("Please verify OTP first");
      return;
    }

    try {
      const response = await axios.post("http://localhost:10000/auth/signup/createAccount", formData,  {withCredentials:true});
      console.log("User data sent successfully:", response.data);
      if (response.status === 200) {
        toast.success("Account created successfully! Redirecting To Sign-In");
        navigator("/login")
        
      }
    } catch (error) {
     if(error.response.status == 401){
      toast.error("Verify OTP First")
     }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <img src={logo} alt="Logo" className="mb-4 w-20" />
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">Sign Up</h1>
        <form    className="mx-auto max-w-md">
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-3 flex items-center justify-center">
            <button
              type="button"
              onClick={getOtp}
              className="mb-2 me-2 rounded-full bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Get OTP
            </button>
          </div>

          {isOtpSent == true ? (
            <div className="mb-3">
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter OTP"
                required
              />
              <button
                type="button"
                onClick={verifyOtp}
                className="mt-2 w-full rounded-full bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Verify OTP
              </button>
            </div>
          ) : (
            <></>
          )}
          </form>
         {otpVerified == true ?  <form onSubmit={sendUserData}>
          <div className="mb-3">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="my-3 mb-3">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Phone Number"
              required
            />
          </div>

          <div className="my-2 mb-3">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
              required
            />
          </div>

          <div className="mx-2 mb-3">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="addressName"
              value={formData.addressName}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Address Name"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Full Address"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="City"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="State"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Country"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Pin Code"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Create Account
          </button>
        </form> : <></>}
      </div>
    </div>
  );
}

export default SignUpPage;

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; // Importing Link from react-router-dom for navigation

const displayCab = (cabJSON, callBack) => {
  return (
    <div
      className="my-2 flex  flex-row rounded-lg border-2 border-black bg-gray-100 p-3"
      key={cabJSON.carRegNum}
    >
      <div className="w-2/3">
        <h2 className="text-lg font-bold">{cabJSON.carType}</h2>
        <h3 className="text-sm">{cabJSON.carModel}</h3>
        <h3 className="font-semibold mt-2">ETA: About 30 Minutes</h3>
        <h3 className="font-bold mt-2">Price: 200 INR</h3>
      </div>
      <div className="flx-col flex w-1/3 flex-wrap justify-center ">
        <img src="./images/sedan.webp" className="w-3/4"></img>

        <button
          className="mx-auto my-auto w-full rounded-full bg-blue-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            callBack(cabJSON.carRegNum);
          }}
        >
          Book
        </button>
      </div>
    </div>
  );
};

const BookTaxi = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const navigate = useNavigate();
  const [searchedRides, setSearchedRides] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  useEffect(() => {
    axios
      .get("http://localhost:10000/user/getBasicInfo", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.status);
        if (res.status == 200) {
          setMail(res.data.email);
          setName(res.data.name);
          document
            .getElementById("userPFP")
            .setAttribute("src", res.data.profilePhoto);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status == 401) {
          navigate("/login");
        } else {
          console.error("An unexpected error occurred:", error);
        }
      });
  });
  const getAvailableCabs = async () => {
    var src = document.getElementById("sourceINP").value;
    var dst = document.getElementById("destinationINP").value
    if (!src || !dst) { toast.error("Please Fill Source and Destination First") }
    await axios
      .post(
        "http://localhost:10000/app/cabs/getAvailableCabs",
        { from: document.getElementById("sourceINP").value },
        { withCredentials: true },
      )
      .then((data) => {
        setSearchedRides(data.data);
        setDestination(dst);
        setSource(src);
        document.getElementById("cabsData").classList.remove("hidden");
      });
  };
  const bookCab = async (id) => {
    await axios
      .post(
        "http://localhost:10000/app/cabs/bookCab",
        { selectedCabNum: id, from: source, to: destination },
        { withCredentials: true },
      )
      .then((data) => {
        if (data.status == 200) {
          navigate("/bookingConfirmation?id=" + data.data.tripID);
        } else {
          toast.error("OOPPSSS!! Some Issue Occured. Please Try Again ");
        }
      });
  };
  return (
    <div className="mx-auto flex h-auto max-w-screen-xl flex-col items-center justify-center space-y-6 ">
      <h2
        style={{
          fontSize: "50px",
          background: "linear-gradient(135deg, rgb(209 141 95), #B48CDE)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="mx-auto max-w-7xl pl-4 text-left font-sans text-9xl font-bold text-neutral-800 dark:text-neutral-200 md:text-9xl"
      >
        Select your Pick Up and Drop Off
      </h2>

      {/* Google Maps Embed */}
      <div
        className=" map-container lg:flex "
        style={{ borderRadius: "30px", overflow: "hidden" }}
      >
        <style>
          {` .map-container {display: block; /* Default display */ } @media screen and (max-width: 768px) {.map-container { display: none; /* Hide the map-container on smaller devices */}}`}
        </style>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7547.508051723295!2d72.82994764150057!3d18.94227867893967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce27b8aa3bdf%3A0x21434b0703218d1b!2sChhatrapati%20Shivaji%20Maharaj%20Terminus!5e0!3m2!1sen!2sin!4v1733722444780!5m2!1sen!2sin"
          width="1400"
          height="600"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <br />

      {/* Go Green, Affordable Rates, and Choose Car Type cards */}
      <div className="offercards flex flex-row flex-wrap justify-center gap-4">
        <style>
          {`
            .offercards {
                display: flex; /* Ensures the cards are arranged horizontally */
                gap: 1rem; /* Adds consistent spacing between the cards */
            }
            @media screen and (max-width: 768px) {
                .offercards {
                    display: none; /* Hides the cards on smaller devices */
                }
            }
        `}
        </style>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{
              width: "18rem",
              height: "10rem",
              whiteSpace: "normal",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              borderRadius: "20px",
              backgroundColor: "#E8FAE8",
              textDecoration: "none", // Remove underlines
            }}
          >
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-green-800">
                Go Green
              </h2>
              <p>Book an EV.</p>
            </div>
          </a>
        </div>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{
              width: "18rem",
              height: "10rem",
              whiteSpace: "normal",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "#FFF7E3",
              borderRadius: "20px",
              textDecoration: "none", // Remove underlines
            }}
          >
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-red-500">
                Affordable Rates
              </h2>
              <p className="card-text">Best prices for your rides.</p>
            </div>
          </a>
        </div>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{
              width: "18rem",
              height: "10rem",
              whiteSpace: "normal",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "#EADEFE",
              borderRadius: "20px",
              textDecoration: "none",
            }}
          >
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-amber-600">
                Choose car type
              </h2>
              <p className="card-text">Best prices for your rides.</p>
            </div>
          </a>
        </div>
      </div>
      <br />
      {/* New Div Below Google Maps */}
      <div
        className="flex w-full flex-col items-center space-y-6 bg-gray-100 py-6"
        style={{ borderTopLeftRadius: "30px" }}
      >
        <h2
          style={{
            fontSize: "50px",
            background: "linear-gradient(135deg, rgb(209 141 95), #B48CDE)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="mx-auto max-w-7xl pl-4 font-sans text-9xl font-bold text-neutral-800 dark:text-neutral-200 md:text-9xl"
        >
          Book a Cab
        </h2>
        {/* Personal Details Card */}
        <br />
        <div
          className="h-auto bg-white"
          style={{
            border: "1px solid grey",
            borderRadius: "10px",
            padding: "16px",
          }}
        >
          <div className="px -5 flex h-auto flex-row items-center rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:max-w-xl    md:flex-row">
            <img
              id="userPFP"
              className="h-20 w-20 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
              alt="Bordered avatar"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {name}
              </h5>
              <p>{mail}</p>
              <button
                type="button"
                className="flex flex-row rounded-full bg-gray-600 px-5 py-1.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go To Profile
              </button>
            </div>
          </div>

          {/* Toggle Switch */}
          <label className="my-6 inline-flex cursor-pointer items-center">
            <input type="checkbox" value="" className="peer sr-only" />
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
            <span className="mx-3 ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              For Someone
            </span>
          </label>
          {/* Input Fields for Booking Taxi */}
          <div className="w-full max-w-md">
            <div className="mb-6">
              <label
                htmlFor="sourceINP"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Source Location{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="inline size-5"
                >
                  <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                </svg>
              </label>
              <input
                type="text"
                id="sourceINP"
                // eslint-disable-next-line tailwindcss/classnames-order
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="destinationINP"
                // eslint-disable-next-line tailwindcss/classnames-order
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Destination{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="inline size-5"
                >
                  <path d="M360-440h80v-110h80v110h80v-190l-120-80-120 80v190Zm120 254q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                </svg>
              </label>
              <input
                type="text"
                id="destinationINP"
                // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <button
              onClick={getAvailableCabs}
              className="mb-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search Cabs
            </button>
            <div>
              <div id="cabsData" className="hidden">
                <label
                  htmlFor="small-input"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Choose Ride
                </label>
                <div className="flex flex-col">
                  {searchedRides.map((data) => displayCab(data, bookCab))}
                </div>
              </div>
            </div>
          </div>

          {/* Correct Link component for navigation */}
        </div>
      </div>
    </div>
  );
};

export default BookTaxi;

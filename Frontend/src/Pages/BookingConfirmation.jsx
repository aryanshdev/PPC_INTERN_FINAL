import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookingConfirmation = () => {
  const [rideDetails, setRideDetails] = useState([]);
  const [partnerDetails, setPartnerDetails] = useState([]);
  const [cabDetails, setCabDetails] = useState([]);
  const navigate = useNavigate(); 
  const getRideDetails = () => {
    axios
      .get(`http://localhost:10000/app/rides/getRideDetails`, {
        withCredentials: true,
      })
      .then((data) => {
        setRideDetails(data.data.rideData);
        setCabDetails(data.data.cabData);
        setPartnerDetails(data.data.partnerData);
      }).catch(err=>{
        switch(err.status){
            case 401:
                toast.error("Login Again");
                navigate("/login")
                break;
            case 500:
                toast.error("Internal Server Error");
                break;
        }
      });
  };

  useEffect(() => {
    getRideDetails();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-white p-8">
      {/* Confirmation Check */}
      <div className="mb-12 flex flex-col items-center gap-4">
        <div className="flex h-28 w-28 justify-center rounded-full  border-2 border-white align-middle shadow-lg">
          <img
            src="https://img.icons8.com/color/100/checked.png"
            alt="checked"
            className=" aspect-square "
          />
        </div>

        {/* Booking Details */}
        <div className="mb-8 flex justify-center gap-12">
          <button class="mb-2 me-2 rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Pin: 3456
          </button>
          <Link to="/ride">
            <button class="mb-2 me-2 rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Start Ride
            </button>
          </Link>
        </div>

        <div className="text-center">
          <h2 className="mb-1 text-2xl font-bold">Booking Confirmed</h2>
          <p className="text-gray-600">Trip ID: {rideDetails.rideID}</p>
        </div>
      </div>

      {/* Added vertical spacing */}
      <div className="mb-8"></div>
      {/* Trip Details */}
      <div className="w-full max-w-md text-center">
        <h3 className="mb-4 text-2xl font-semibold text-gray-600">
          Trip Details
        </h3>{" "}
        {/* Centered and larger font size */}
        <div className="flex flex-col gap-6">
          {/* Trip Info */}
          <div className="flex flex-col justify-center gap-2">
            <div className="flex flex-row items-center justify-center gap-2">
              <h3 className="text-4xl font-semibold text-gray-800">
                {rideDetails.source}
              </h3>
              <img
                width="100"
                height="50"
                src="https://img.icons8.com/laces/100/arrow.png"
                alt="arrow"
                className="mx-2"
              />
              <h3 className="text-4xl font-semibold text-gray-800">
                {rideDetails.destination}
              </h3>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Estimated Trip Duration: 30 mins
            </h3>
            <h3 className="text-xl font-semibold text-gray-800">
              To Pay: 200 INR
            </h3>
          </div>
          <br />
        </div>
      </div>
      <div className="w-full max-w-md text-center">
        <h3 className="mb-4 text-2xl font-semibold text-gray-600">
          Partner And Cab Details
        </h3>{" "}
        {/* Centered and larger font size */}
        <div className="flex flex-col gap-6">
          <div className="flex w-full flex-row">
            <div className="flex w-3/4 flex-col items-start gap-2">
              <h3 className="block text-2xl font-semibold text-gray-800">
                {partnerDetails.name}
              </h3>

              {/* Added Stars Below Name */}
              <div className="flex flex-col">
                <div className="mt-2 flex gap-1 align-middle text-yellow-500">
                  {Array.from({ length: partnerDetails.rating }, (_, index) => (
                    <span key={index}>
                      <img
                        width="24"
                        height="24"
                        src="https://img.icons8.com/fluency/48/star--v1.png"
                        alt="star--v1"
                      />
                    </span>
                  ))}
                  {partnerDetails.rating % 1 !== 0 ? (
                    <span>
                      <img
                        width="24"
                        height="24"
                        src="https://img.icons8.com/fluency/24/star-half-empty.png"
                        alt="star-half-empty"
                      />
                    </span>
                  ) : (
                    <></>
                  )}
                  <h3>({partnerDetails.reviewsRecieved} Reviews)</h3>
                </div>
              </div>
              <h3 className="text-lg font-semibold">
                {partnerDetails.tripsCompleted} Trips Completed
              </h3>
            </div>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
              alt="Willis Bricks"
              className="aspect-square w-1/4 rounded-full border-2 border-white object-cover shadow-lg"
            />
          </div>
          {/* Cab Info */}
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-2xl font-medium text-gray-800">
              {cabDetails.carModel}
            </h3>
            <h3 className="text-lg font-semibold text-gray-800">
              {cabDetails.carType}
            </h3>
            <p className="text-xl font-semibold text-gray-800">
              Car Number : {cabDetails.carRegNum}
            </p>
          </div>
          <br />

          {/* Action Buttons */}
          <div className="flex flex items-center justify-between">
            <button class="mb-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Chat
            </button>
            <button class="mb-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Locate
            </button>
          </div>

          {/* Arrival Info */}
          <div className="flex flex items-center justify-between gap-4">
            <div>
              <span className="text-gray-600">Arriving in</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="mb-2 me-2 rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                2 mins
              </button>
            </div>
            <button
              className="mb-2 me-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => {
                toast(
                  <>
                    <p>Are You Sure You Want To Cancel ?</p>
                    <br />
                    <button
                      style={{
                        background: "#92400e",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: 20,
                      }}
                    >
                      Confirm
                    </button>
                  </>,
                  {
                    icon: "⚠️",
                    style: {
                      border: "1px solid #facc15", // Yellow border
                      padding: "16px",
                      color: "#92400e", // Dark orange text
                      backgroundColor: "#fef08a", // Light yellow background
                    },
                  },
                );
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="mt-auto pt-8 pb-4">
                <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
                    {links.map((link) => (
                        <a key={link} href="#" className="hover:text-gray-900">
                            {link}
                        </a>
                    ))}
                </nav>
            </footer> */}
    </div>
  );
};

export default BookingConfirmation;

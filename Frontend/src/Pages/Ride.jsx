import React from 'react';
import { Link } from 'react-router-dom'; 
const Ride = () => {
  return (
    <div className="relative mx-auto min-h-screen max-w-md bg-white p-6">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 absolute right-0"
        >
          SOS
        </button>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center gap-4 mb-16">
        <img
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
          alt="Chris Dave"
          className="w-28 h-28 rounded-full object-cover border-2 border-white shadow-lg"
        />
        <div>
          <h1 className="text-2xl font-bold">Chris DAVE</h1>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Personal Details
          </button>
        </div>
      </div>
<br/>
      {/* Action Buttons */}
      <div className="flex gap-6 mb-12">
        <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          Live Support
        </button>
        <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          End your ride
        </button>
        <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Pin: 234
        </button>
      </div>
      <br/>

      {/* Shopping Cart Illustration */}
      <div className="flex flex-row justify-between mb-8">
        <img
          src="./images/Infographics.gif"
          alt="Shopping Cart"
          className="w-48 h-48 object-contain"
        />
        <div className="absolute right-8 flex flex-row">
          <div className="text-gray-600">You will reach in</div> &nbsp;&nbsp;&nbsp;
          <button className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            2 mins
          </button>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      {/* Driver Details */}
      <div className="bg-white rounded-lg p-4">
        <h3 className="text-gray-600 font-bold text-xl mb-4 uppercase">
          Taxi Ride Application Cab details
        </h3>
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
              alt="Willis Bricks"
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-lg mb-2"
            />
            <div className="text-center">
              <div className="font-medium">Willis Bricks</div>
              <div className="text-yellow-500">★★★</div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex gap-2 mb-4">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <span className="flex items-center justify-center gap-2">Chat</span>
              </button>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <span className="flex items-center justify-center gap-2">Locate</span>
              </button>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <span className="flex items-center justify-center gap-2">Profile</span>
              </button>
            </div>
            <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Write a feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ride;

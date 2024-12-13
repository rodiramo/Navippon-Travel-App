import React from "react";

const TravelStats = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Travel Stats</h2>
        <div className="text-blue-500 cursor-pointer">Viewing all time</div>
      </div>
      <div className="mb-2">
        <p className="text-gray-700 font-bold">Distance Traveled</p>
        <p className="text-2xl font-bold">34007 km</p>
      </div>
      <div className="flex items-center mb-2">
        <img
          src="/calendar-icon.svg"
          alt="Calendar Icon"
          className="w-6 h-6 mr-2"
        />
        <p className="text-gray-700">
          Total Days <span className="font-bold">15</span>
        </p>
      </div>
      <div className="flex items-center mb-2">
        <img
          src="/suitcase-icon.svg"
          alt="Suitcase Icon"
          className="w-6 h-6 mr-2"
        />
        <p className="text-gray-700">
          Total Trips <span className="font-bold">1</span>
        </p>
      </div>
      <div className="flex items-center mb-2">
        <img
          src="/passport-icon.svg"
          alt="Passport Icon"
          className="w-6 h-6 mr-2"
        />
        <p className="text-gray-700">
          Countries/Regions Visited <span className="font-bold">1</span>
        </p>
      </div>
      <div className="flex items-center mb-2">
        <img
          src="/location-icon.svg"
          alt="Location Icon"
          className="w-6 h-6 mr-2"
        />
        <p className="text-gray-700">
          Cities Visited <span className="font-bold">1</span>
        </p>
      </div>
      <div className="flex items-center">
        <img src="/leaf-icon.svg" alt="Leaf Icon" className="w-6 h-6 mr-2" />
        <p className="text-gray-700">
          Carbon Footprint <span className="font-bold">0 tCO2</span>
        </p>
      </div>
    </div>
  );
};

export default TravelStats;

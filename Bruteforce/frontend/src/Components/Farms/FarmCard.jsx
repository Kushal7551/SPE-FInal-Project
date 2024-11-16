import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function FarmCard({ farmName, imagePath, latitude, longitude, farmID , cropName }) {
  return (
    <Link to={`/farms/${cropName}/${farmID}`} 
      className="flex flex-col items-center bg-green-100 border border-gray-200 rounded-lg shadow-lg md:flex-row md:max-w-2xl hover:bg-green-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-6"> {/* Applied light green background */}
      
      <img
        className="object-cover w-full rounded-t-lg h-[400px] md:h-[300px] md:w-[200px] md:rounded-none md:rounded-l-lg" // Increased image size
        src={imagePath}
        alt={farmName}
      />
      
      <div className="flex flex-col justify-between p-6 leading-normal"> {/* Increased padding */}
        <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white"> {/* Increased font size and made font bold */}
          {farmName}
        </h5>
        <p className="mb-4 font-semibold text-gray-700 dark:text-gray-400"> {/* Increased font size and added bold for labels */}
          <span className="font-bold">Latitude:</span> {latitude}<br />
          <span className="font-bold">Longitude:</span> {longitude}<br />
          <span className="font-bold">Farm ID:</span> {farmID}
        </p>
      </div>
    </Link>
  );
}

export default FarmCard;


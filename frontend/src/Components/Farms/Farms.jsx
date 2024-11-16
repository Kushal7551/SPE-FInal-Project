import React from 'react';
import Navbar from '../Navbar';
import Header from '../Header';
import FarmCard from '../Farms/FarmCard';
import { useParams } from 'react-router-dom'; // Import useParams

const Farms = () => {
  const { cropName } = useParams();
  return (
    <div>
        <Navbar/>
        <Header text="Farms" backPath='/' />
        {/* <div className="grid grid-cols-3 gap-4 py-8 mx-auto"> */}
        <div className='ml-12'>
        <div className="flex justify-center px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 py-8 gap-4 max-w-screen w-full">
            <FarmCard
              farmName="Farm A"
              imagePath="/src/assets/chilli.svg"
              latitude="34.0522"
              longitude="-118.2437"
              farmID="1"
              cropName={cropName}
            />
            <FarmCard
              farmName="Farm B"
              imagePath="/src/assets/chilli.svg"
              latitude="36.7783"
              longitude="-119.4179"
              farmID="2"
              cropName={cropName}
            />
            <FarmCard
              farmName="Farm C"
              imagePath="/src/assets/chilli.svg"
              latitude="40.7128"
              longitude="-74.0060"
              farmID="3"
              cropName={cropName}
            />
            <FarmCard
              farmName="Farm D"
              imagePath="/src/assets/chilli.svg"
              latitude="41.8781"
              longitude="-87.6298"
              farmID="4"
              cropName={cropName}
            />
            <FarmCard
              farmName="Farm E"
              imagePath="/src/assets/chilli.svg"
              latitude="34.0522"
              longitude="-118.2437"
              farmID="5"
              cropName={cropName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Farms;

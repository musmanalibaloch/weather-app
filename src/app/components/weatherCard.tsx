   // components/WeatherCard.tsx
   import React from 'react';

   interface WeatherCardProps {
       date: string;
       temperature: number;
       condition: string;
   }

   const WeatherCard: React.FC<WeatherCardProps> = ({ date, temperature, condition }) => {
       return (
           <div className="bg-white shadow-md rounded-lg p-4">
               <h3 className="text-lg font-bold">{date}</h3>
               <p className="text-xl">{temperature}°C</p>
               <p className="text-gray-600">{condition}</p>
           </div>
       );
   };

   export default WeatherCard;
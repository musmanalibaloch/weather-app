   // components/FavoriteCities.tsx
   import React from 'react';

   interface FavoriteCitiesProps {
       favorites: string[];
       onRemove: (city: string) => void;
       onSelect: (city: string) => void;
   }

   const FavoriteCities: React.FC<FavoriteCitiesProps> = ({ favorites, onRemove, onSelect }) => {
       return (
           <div className="text-black bg-white shadow-md rounded-lg p-4 dark:bg-gray-800 dark:text-white">
               <h2 className="text-lg font-bold">Favorite Cities</h2>
               <ul>
                   {favorites.map(city => (
                       <li key={city} className="flex justify-between items-center p-2">
                           <span
                               className="cursor-pointer hover:text-blue-500"
                               onClick={() => onSelect(city)}
                           >
                               {city}
                           </span>
                           <button onClick={() => onRemove(city)} className="text-red-500">Remove</button>
                       </li>
                   ))}
               </ul>
           </div>
       );
   };

   export default FavoriteCities;
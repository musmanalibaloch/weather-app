   // components/FavoriteCities.tsx
   import React from 'react';

   interface FavoriteCitiesProps {
       favorites: string[];
       onRemove: (city: string) => void;
   }

   const FavoriteCities: React.FC<FavoriteCitiesProps> = ({ favorites, onRemove }) => {
       return (
           <div>
               <h2 className="text-lg font-bold">Favorite Cities</h2>
               <ul>
                   {favorites.map(city => (
                       <li key={city} className="flex justify-between">
                           {city}
                           <button onClick={() => onRemove(city)}>Remove</button>
                       </li>
                   ))}
               </ul>
           </div>
       );
   };

   export default FavoriteCities;
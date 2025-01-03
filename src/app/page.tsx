"use client"
import { useEffect, useState, useCallback } from "react";
import WeatherCard from "@/app/components/weatherCard";
import FavoriteCities from "@/app/components/favoriteCities";
import ThemeToggle from "@/app/components/themeToggle"; // Ensure this import is correct
import { getWeather } from "@/app/utils/getWeather"; // Import the getWeather function
import { SimplifiedWeatherDay } from "@/app/types";
import citiesData from "@/app/utils/cities.json"; // Import the cities from the JSON file
import Spinner from "@/app/components/Spinner"; // Import the Spinner component

export default function Home() {
    const [weatherData, setWeatherData] = useState<SimplifiedWeatherDay[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [city, setCity] = useState(citiesData[0] || ""); // Set default city to the first city in the list
    const [error, setError] = useState<string | null>(null); // State for error handling
    const [showFavorites, setShowFavorites] = useState(false); // State to toggle between views
    const [filteredCities, setFilteredCities] = useState<string[]>(citiesData); // Use cities from JSON
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [loading, setLoading] = useState(false); // State to manage loading

    const fetchWeather = useCallback(async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const data = await getWeather(city); // Use the utility function
            setWeatherData(data);
            setError(null); // Clear any previous errors
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message); // Set error message if it's an instance of Error
            } else {
                setError("An unknown error occurred."); // Fallback for unknown errors
            }
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    }, [city]); // Include city as a dependency

    useEffect(() => {
        fetchWeather(); // Fetch weather for the default city on mount
    }, [fetchWeather]); // Include fetchWeather in the dependency array

    const addFavorite = (city: string) => {
        if (!favorites.includes(city)) {
            setFavorites([...favorites, city]);
        }
    };

    const removeFavorite = (city: string) => {
        setFavorites(favorites.filter(fav => fav !== city));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCity(value);
        setIsDropdownOpen(true);
        setFilteredCities(citiesData.filter(city => city.toLowerCase().includes(value.toLowerCase())));
    };

    const handleCitySelect = (selectedCity: string) => {
        setCity(selectedCity); // Update input with selected city
        setIsDropdownOpen(false); // Close dropdown
        fetchWeather(); // Fetch weather for the selected city
    };

    const handleFavoriteSelect = (selectedCity: string) => {
        setCity(selectedCity); // Update input with selected city
        setShowFavorites(false); // Change tab to weather
        fetchWeather(); // Fetch weather for the selected city
    };

    return (
        <div className="flex flex-col min-h-screen p-8 gap-4 dark:bg-gray-900 bg-slate-400 dark:text-white">
            <div className="flex justify-between w-full">
                <h1 className="text-2xl font-bold m-0 text-black dark:text-white">Weather Forecast</h1> {/* Removed margin */}
                <ThemeToggle /> {/* Moved to the top right */}
            </div>
            <main className="flex flex-col gap-4 w-full">
                <div className="flex gap-2 items-center"> {/* Flex container for input and buttons */}
                    <div className="relative w-1/2"> {/* Adjusted width for dropdown */}
                        <input
                            type="text"
                            value={city}
                            onChange={handleInputChange}
                            onFocus={() => setIsDropdownOpen(true)} // Open dropdown on focus
                            className="border p-1 rounded dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 w-full
                            text-black" // Full width
                            placeholder="Enter city"
                        />
                        {isDropdownOpen && filteredCities.length > 0 && (
                            <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-60 overflow-y-auto dark:bg-gray-800">
                                {filteredCities.map((cityName) => (
                                    <li
                                        key={cityName}
                                        onClick={() => handleCitySelect(cityName)} // Fetch weather on city selection
                                        className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white" // Set text color for light and dark mode
                                    >
                                        {cityName}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button onClick={fetchWeather} className="bg-blue-500 text-white p-1 rounded"> {/* Reduced padding */}
                        Get Weather
                    </button>
                    <button onClick={() => addFavorite(city)} className="bg-green-500 text-white p-1 rounded">
                        Add to Favorites
                    </button>
                </div>
                {loading ? ( // Show spinner while loading
                    <Spinner />
                ) : (
                    <>
                        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                        <div className="flex gap-4">
                            <button onClick={() => setShowFavorites(false)} className={`p-2 ${!showFavorites ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>Weather</button>
                            <button onClick={() => setShowFavorites(true)} className={`p-2 ${showFavorites ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>Favorite Cities</button>
                        </div>
                        {showFavorites ? (
                            <FavoriteCities favorites={favorites} onRemove={removeFavorite} onSelect={handleFavoriteSelect} />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {weatherData && Array.isArray(weatherData) && weatherData.map((day: SimplifiedWeatherDay) => (
                                    <WeatherCard
                                        key={day.date}
                                        date={day.date}
                                        temperature={day.temperature}
                                        condition={day.condition}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
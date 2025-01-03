import {  SimplifiedWeatherDay } from '@/app/types'; // Import the WeatherData and SimplifiedWeatherDay types

export const getWeather = async (city: string): Promise<SimplifiedWeatherDay[]> => {
    const response = await fetch(`/api/weather?city=${city}`); // Call the backend API
    const data: SimplifiedWeatherDay[] = await response.json(); // Use the WeatherData type

    if (!response.ok) {
        throw new Error('Error fetching weather');
    }

    const resp = data.map((day: SimplifiedWeatherDay) => ({ // Assign type to day
        date: day.date,
        temperature: day.temperature,
        condition: day.condition,
    }));

    console.log(resp);

    return resp;
};
// components/WeatherCard.tsx
import React from 'react';

interface WeatherCardProps {
    date: string;
    temperature: number;
    condition: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ date, temperature, condition }) => {

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
        return `${dateObj.toLocaleDateString('en-US', options).replace(day.toString(), `${day}${suffix}`)}`;
    };

    // Map weather conditions to icons
    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
            case 'sunny':
                return '☀️'; // Example icon for clear weather
            case 'partly cloudy ':
                return '☁️'; // Example icon for cloudy weather
            case 'moderate rain':
                return '🌧️'; // Example icon for rain
            case 'patchy rain nearby':
                return '🌧️'; // Example icon for rain
            case 'overcast ':
                return '☁️'; // Example icon for rain
            case 'heavy snow':
                return '❄️'; // Example icon for snow
            case 'moderate or heavy snow showers':
                return '❄️'; // Example icon for snow
            case 'blizzard':
                return '❄️'; // Example icon for snow
            case 'moderate snow':
                return '❄️'; // Example icon for snow
            case 'patchy moderate snow':
                return '❄️'; // Example icon for snow
            // Add more conditions as needed
            default:
                return '🌈'; // Default icon
        }
    };

    return (
        <div className="weather-card p-4 border rounded shadow-lg transition-transform transform hover:scale-105 bg-white text-black dark:bg-black dark:text-white">
            <h3 className="text-lg font-bold">{formatDate(date)}</h3> {/* Use formatted date */}
            <div className="flex items-center">
                <span className="text-4xl">{getWeatherIcon(condition)}</span>
                <span className="text-2xl ml-2">{temperature}°C</span>
            </div>
            <p className="text-sm">{condition}</p>
        </div>
    );
};

export default WeatherCard;
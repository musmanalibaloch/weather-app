export interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
}

export interface WeatherDay {
    date: string;
    day: {
        avgtemp_c: number;
        condition: WeatherCondition;
    };
}

export interface WeatherData {
    forecastday: WeatherDay[];
}

export interface WeatherDataForecast {
    forecast: { forecastday: WeatherDay[] };
}

export interface SimplifiedWeatherDay {
    date: string;
    temperature: number;
    condition: string;
}
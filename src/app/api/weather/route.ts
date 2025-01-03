import { NextResponse } from 'next/server';
import {  WeatherDataForecast } from '@/app/types';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');


    if (!city) {
        return NextResponse.json({ error: 'City is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&days=5`);
        const data: WeatherDataForecast = await response.json();

        if (response.ok) {
            const forecast = data.forecast.forecastday.map((day) => ({
                date: day.date,
                temperature: day.day.avgtemp_c,
                condition: day.day.condition.text,
            }));
            return NextResponse.json(forecast, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Unable to fetch weather data' }, { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
    }
}
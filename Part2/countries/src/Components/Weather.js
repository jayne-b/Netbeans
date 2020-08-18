import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ result }) => {
    const [weather, setWeather] = useState(null)
    const api_key = process.env.REACT_APP_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${result}`

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                console.log('response', response)
                setWeather(response.data.current)
            })
            .catch(e => { console.log('error', e) })
    }, [result])
    console.log('weather', weather)

    if (weather) {
        return (
            <div>
                <h2>Weather in {result}</h2>
                <p><b>Temperature:</b> {weather.temperature}</p>
                <img src={weather.weather_icons} alt={weather.weather_descriptions} />
                <p><b>Wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</p>
            </div>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default Weather

import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Search from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import snow from '../assets/snow.png'
import rain from '../assets/rain.png'
import wind from '../assets/wind.png'



function Weather() {
    const inputRef = useRef()
    const [WeatherData, setWeatherData] = useState(false)

    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": clear,
        "02n": cloud,
        "03d": cloud,
        "03n": drizzle,
        "04d": drizzle,
        "04n": rain,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": snow,
        "13d": snow,
        "13n": snow,
        
    }

    const search = async (City) => {
        if(City ===""){
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=${import.meta.env.VITE_APP_ID}
`
            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return
            }
            const icon = allIcons[data.weather[0].icon]||clear
            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                tempreture: Math.floor(data.main.temp),
                location: data.name,
                icon:icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather in data")
        }
    }

    useEffect(() => {
        search("London");
    }, [])


    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder='Enter City Name'/> 
                    
                <img src={Search} alt="" onClick={()=>{
                    search(inputRef.current.value)
                }}/>
            </div>
            <img src={WeatherData.icon} className='weather_icon' />
            <p className='temp'>{WeatherData.tempreture}°c</p>
            <p className='loc'>{WeatherData.location}</p>
            <div className='weather_data'>
                <div className="col">
                    <img src= {humidity} className='img' />
                    <div>
                        <p>{WeatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind} className='img' />
                    <div>
                        <p>{WeatherData.wind}km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Weather

import React, { useState, useEffect } from 'react';
 
export const Weathercard = ( {tempInfo} ) => {
    const [weatherState, setWeatherState] = useState('');
    const {
        temp,
        humidity,
        pressure,
        weathermoosd,
        name,
        speed,
        country,
        sunset,
    } = tempInfo;

    useEffect(() => {
        if(weathermoosd) {
            switch (weathermoosd){
                case "Clouds": 
                    setWeatherState("wi wi-day-cloudy");
                break;
                case "Haze": 
                    setWeatherState("wi wi-day-fog");
                break;
                case "Clear": 
                    setWeatherState("wi wi-day-sunny");
                break;

                default:
                    setWeatherState("wi wi-day-sunny");
                break;
            }
        }
    }, [weathermoosd]);
    // Converting the seconds into time
    let sec = sunset;
    let date = new Date(sec * 1000);
    let timeStr = `${date.getHours()}:${date.getMinutes()}`
    return (
        <>
            {/* our Temp Card */}
            <article className='widget'>
                <div className='weatherIcon'>
                    <i className={`2wi ${weatherState}`}></i>
                </div>

                <div className='weatherInfo'>
                    <div className='temperature'>
                        <span>{temp}&deg;</span>
                    </div>

                    <div className='description'>
                        <div className='weatherCondition'>{weathermoosd}</div>
                        <div className='place'>{name}, {country} </div>
                    </div>
                </div>

                <div className='date'> {new Date().toLocaleString()} </div>

                {/* our 4column section */}
                <div className='extra-temp'>
                    <div className='temp-info-minmax'>
                        <div className='two-sided-section'>
                            <p>
                                <i className={"wi wi-sunset"}></i>
                            </p>
                            <p className='extra-info-leftside'>
                                {timeStr} PM <br />
                                Sunset
                            </p>
                        </div>

                        <div className='two-sided-section'>
                            <p>
                                <i className={"wi wi-humidity"}></i>
                            </p>
                            <p className='extra-info-leftside'>
                                {humidity} <br />
                                Humidity
                            </p>
                        </div>
                    </div>

                    <div className='weather-extra-info'>
                        <div className='two-sided-section'>
                            <p>
                                <i className={"wi wi-rain"}></i>
                            </p>
                            <p className='extra-info-leftside'>
                                {pressure} <br />
                                Pressure
                            </p>
                        </div>
                        <div className='two-sided-section'>
                            <p>
                                <i className={"wi wi-strong-wind"}></i>
                            </p>
                            <p className='extra-info-leftside'>
                                {speed} <br />
                                Speed
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}

export default Weathercard;
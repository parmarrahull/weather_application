import React, { useEffect, useState } from 'react';
import Weathercard from './Weathercard';
import axios from 'axios'


const Temp = () => {

    const [users, setUsers] = useState([]);
    const [inputName, setInputName] = useState("");

    useEffect(async() => {
        try {
            let res = await axios.get('http://localhost:8000/getusers')
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }, [])

    const [searchValue, setSearchValue] = useState("Limbdi");
    const [tempInfo, setTempInfo] = useState ({});

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3062cfd0d4a6fc1f913947d3093779d9`;

            const res = await fetch(url);
            const data = await res.json();
        
            const { temp, humidity, pressure } = data.main;
            const { main: weathermoosd } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermoosd,
                name,
                speed,
                country,
                sunset,
            };
            console.log(myNewWeatherInfo);
            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() =>{
        getWeatherInfo();
    },[]);

    const submitForm = async() => {
        try {
            let data = {
                name: inputName,
            }
            let res = await axios.post('http://localhost:3000/register', data);
        } catch (error) {
            
        }
    }

    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input
                        type='search'
                        placeholder='search...'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    <button
                        className='searchButton'
                        type='button'
                        onClick={getWeatherInfo}>
                        Search
                    </button>
                </div>
            </div>
            <Weathercard tempInfo={tempInfo} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
                <ul>
                    {users?.map(user => {
                        return (
                            <li>
                                {user.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
            {/* <div>
                <form>
                    <input type="text" name="name" />
                    <input type="submit" value="Submit" onClick={submitForm} />
                </form>
            </div> */}
        </>
    )
}

export default Temp;
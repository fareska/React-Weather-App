import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default function Favorites() {

    const [favorites, setFavorites] = useState([]);
    const [favoritesForecast, setFavoritesForecast] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (cityName) => {
            const res = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${process.env.REACT_APP_API_KEY}`);
            return res.data.data[0];
        }
        const fetchFavoritesForecast = async () => {
            let res = JSON.parse(localStorage.getItem('favorites' || "[]"));
            await setFavorites(res);
            let data = [];
            for (const fav of res) {
                let cityData = {};
                let res = await fetchData(fav);
                cityData.name = res.city_name;
                cityData.temp = res.temp;
                cityData.icon = res.weather.icon; // .code
                cityData.description = res.weather.description;
                data.push(cityData);
            }
            setFavoritesForecast(data);
            setLoading(false);
        }
        fetchFavoritesForecast();
    }, [])

    return (
        <div id="favoritesContainer" >
            {
                loading ? 'loading'
                    : favoritesForecast.map((fav, i) => {
                        { console.log(fav) }

                        return (
                            <Card key={i} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>{fav.name + '  ' +fav.temp}<span>&deg;C</span></Card.Title>
                                    <Card.Text>
                                        {fav.description}
                                        <img style={{height:'30px', width:'30px' }} src={`https://www.weatherbit.io/static/img/icons/${fav.icon}.png`} alt="weatherIcon" />
                                    </Card.Text>
                                    <Button variant="primary">Delete</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
            }
        </div>
    )
}
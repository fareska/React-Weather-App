import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import SearchInput from './SearchInput';
import axios from 'axios';
import FiveDaysForecast from './FiveDaysForecast';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
    root: {

    },
    button: {
        margin: theme.spacing(1),
        width: '90%',  
        // borderRadius: '50px',
        backgroundColor: '#F79238',
       
    },

}));


export default function Home() {
    const classes = useStyles();

    const [inputVal, setInput] = useState('');
    const [cityName, setCityName] = useState('Tel aviv');
    const [forecastData, setForecastData] = useState([]);
    const [favorites, setFavorites] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.REACT_APP_API_KEY}&days=5`);
            setForecastData(res.data);
        }
        const savedRes = JSON.parse(localStorage.getItem('favorites' || "[]"));
        fetchData();
        setFavorites(savedRes);
    }, [cityName]);

    const handleSearchClick = (val) => {
        setCityName(val);
    }

    const isNewCity = (cityName) =>  !favorites.includes(cityName);
    

    const handleSaveClick =async (cityName) =>{
        if(isNewCity(forecastData.city_name)){
            let newFav = [...favorites, ...[forecastData.city_name]];
            await setFavorites(newFav);
            //if i console.log favorites here i will see favorites before the value changed .. how can i get the updated favorites ? (callback ?)
            const savedRes = JSON.parse(localStorage.getItem('favorites' || "[]"));
            savedRes.push(forecastData.city_name);
            localStorage.setItem('favorites', JSON.stringify(savedRes));
        }
    }

    return (
        <div id="homeContainer" className="font-link">
            <SearchInput handleSearchClick={handleSearchClick} />
            <FiveDaysForecast forecastData={forecastData} />
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSaveClick}
            >
                Save City
            </Button>
        </div>
    )
}




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
        const savedRes = JSON.parse(localStorage.getItem('favoritesData'));
        fetchData();
        console.log(savedRes);
    }, [cityName]);

    useEffect(() => {
        const saveFavoritesToLocal = () => {
            localStorage.setItem('favorites',JSON.stringify(favorites))
        }
        if(favorites.length > 0){
            saveFavoritesToLocal();
        } 

    }, [favorites])


    const handleSearchClick = (val) => {
        setCityName(val);
    }

    const isNewCity = (cityName) => {
        let ans;
        for (const fav of favorites) {
            debugger
            fav === cityName ? ans = false : ans = true ; 
        }
        return !ans;
    }

    const handleSaveClick = (cityName) =>{
        console.log(isNewCity(forecastData.city_name));
        // favorites.push(cityName);
        // let newFav = [...favorites, forecastData.city_name]
        // setFavorites(newFav);
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




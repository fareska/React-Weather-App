import React from 'react';
import moment from 'moment';

const styles = {
    singleDayContainer : {
        color: 'white',
    },
}

export default function SingleDayForecast(props) {

    return (
        <div className="singleDayContainer" style={styles.singleDayContainer} >
            <div className="left">
                <span> {moment(props.forecast.datetime).format("ddd")} </span>
            </div>

            <div className="right">
                <span> {props.forecast.temp}</span>
                <span>&deg;C</span>
                <img style={{height:'30px', width:'30px' }} src={`https://www.weatherbit.io/static/img/icons/${props.forecast.weather.icon}.png`} alt="" />
            </div>
        </div>

    )
}

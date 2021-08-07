import React, { useState, useEffect } from 'react'
import SingleDayForecast from './SingleDayForecast'

const styles = {
    city : {
        color: 'white',
    },
}


export default function FiveDaysForecast(props) {

    const [fiveDays, setFiveDays] = useState([]);

    useEffect(() => {
        setFiveDays(props.forecastData.data ? props.forecastData.data : [])
    }, [props.forecastData])

    return (

        < div >
            {
                fiveDays.length === 0
                    ? 'loading'
                    : <div>
                        <div id="city" style={styles.city}>
                            <h3>{props.forecastData.city_name}</h3>
                            <h1>{props.forecastData.data[0].temp} <span>&deg;C</span> </h1>
                        </div>

                        <div>
                            {fiveDays.map((f, i) => <SingleDayForecast key={i} forecast={f} />)}
                        </div>
                    </div>
            }

        </div >
    )
}

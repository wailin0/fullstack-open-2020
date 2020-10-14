import React, {useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    const [weather, setWeather] = useState({})
    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        axios.get('http://api.weatherstack.com/current?access_key='+process.env.REACT_APP_API_KEY+'&query=' + search)
            .then(response => {
                setWeather(response.data.current)
            })
            .catch(e => console.log(e))
    }, [search])


    const searchHandler = e => {
        setSearch(e.target.value)
    }

    const searchedData = countries.filter(country => {
            if (search.length !== 0) {
                return country.name.toLowerCase().includes(search.toLowerCase())
            }
            return null
        }
    )

    const showCountry = (countryName) => {
        setSearch(countryName)
    }

    return (
        <>
            find countries <input value={search} onChange={searchHandler}/>
            {
                (searchedData.length > 10) && <p>Too many matches, specify another filter</p>
            }
            {
                (searchedData.length === 1) &&
                (
                    searchedData.map(country => (
                        <div key={country.name}>
                            <h3>{country.name}</h3>
                            <p>capital {country.capital}</p>
                            <p>population {country.population}</p>
                            <h3>Spoken languages</h3>
                            {
                                country.languages.map(l => (
                                    <li key={l.name}>{l.name}</li>
                                ))
                            }
                            <br/>
                            <img src={country.flag} width="100" alt=""/>
                            <h3>Weather in {country.capital}</h3>
                            {
                                weather !== undefined &&
                                <>
                                    <p><strong>temperature:</strong> {weather.temperature} Celcius</p>
                                    <img src={weather.weather_icons} alt=""/>
                                    <p><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir} </p>
                                </>
                            }
                        </div>
                    ))
                )
            }
            {
                (searchedData.length <= 10 && searchedData.length !== 1) &&
                searchedData.map(country => (
                    <p key={country.name}>{country.name}
                        <button onClick={() => showCountry(country.name)}>show</button>
                    </p>
                ))
            }

        </>
    )

}

export default App
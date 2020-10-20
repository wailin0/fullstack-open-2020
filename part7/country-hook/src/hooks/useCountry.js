import {useState, useEffect} from "react"
import axios from "axios"

export const useCountry = (name) => {
    const [country, setCountry] = useState(null);


    useEffect(() => {
        axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
            .then(res => {
                setCountry({data: res.data[0], found: true})
            })
            .catch(() => {
                setCountry({data: null, found: false})
            })
     
    }, [name]);

    return {country};
};
import React from 'react'
import {filter} from "../reducers/filterReducer";
import {useDispatch} from "react-redux";

const Filter = () => {

    const dispatch = useDispatch()


    const handleChange = (event) => {
        const filtered = event.target.value
        dispatch(filter(filtered))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter
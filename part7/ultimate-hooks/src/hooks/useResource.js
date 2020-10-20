import {useState} from "react";
import axios from "axios";

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const getAll = () => {
        const request = axios.get(baseUrl)
        return request.then((response) => setResources(response.data))
    }

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource)
        setResources([...resources, response.data])
    }

    const service = {
        getAll,
        create
    }

    return [
        resources, service
    ]
}

export default useResource
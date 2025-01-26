import { useState , useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  let name = 'content'

  return {
    name,
    type,
    value,
    onChange,
    onReset
  }
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

    async function getAll() {
        let res = await axios.get("http://localhost:3005" + baseUrl)
        return res.data
    }

    function getResource() {
        getAll().then(response => setResources(response))
    }

    useEffect(() => {
        getResource()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const create = async (resource) => {
        return await axios.post("http://localhost:3005" + baseUrl, resource)
    }

    const service = (resource) => {
        create(resource).then(res => setResources(resources.concat(res.data)))
    }

    return [
        resources, service
    ]
};


export {
  useField,
  useResource
}
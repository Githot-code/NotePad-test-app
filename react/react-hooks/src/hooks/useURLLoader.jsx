import axios from "axios";
import React, {useState, useEffect} from 'react'

const useURLLoader = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(
        () => {
            setLoading(true);
            axios.get(url).then(result => {
                console.log(result);
                setData(result.data);
                setLoading(false);
                
            })
        }
    , [url])
    
    return [data, loading]
}

export default useURLLoader;
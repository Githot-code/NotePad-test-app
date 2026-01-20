import React, { useEffect, useState} from "react";
import axios from "axios";

const DogShow = () => {
    
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetch, setFetch] = useState(false);

    const style = {
        width: 200
    }

    //现在这样写会无限♾️循环 😵‍💫
    useEffect(
        () => {
            setLoading(true);
            axios.get('https://dog.ceo/api/breeds/image/random').then(result => {
                console.log(result);
                setUrl(result.data.message);
                setLoading(false);
                
            })
        }
    , [fetch])  //useEffect 的数组参数用于控制请求的次数和目标信息的返回方向[]

    return (
        <>
            {
                loading ? <p>🐶 Loading ... </p> :
                <img src={url} alt="dog" style={style}/>
            }
            <button onClick={() => { setFetch(!fetch) } }> Next 🐶～下一张狗狗的图片 </button>
        </>
    )
}

export default DogShow;
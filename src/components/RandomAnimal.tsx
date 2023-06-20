import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { baseUrl, accessToken } from '../components/Helper/index';


const RandomAnimal = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://dog.ceo/api/breeds/image/random").then((res)=>{
      console.log(res.data.message);
      setData(res.data.message);


    }).then((err)=>{
      console.log(err);

    })
  }, [])

  return (
    <div>
{data}
    </div>
  )
}

export default RandomAnimal

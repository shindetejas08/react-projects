// import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"

function Github() {
    // const [data, setData] = useState([])
    // useEffect(()=>{
    //     fetch("https://api.github.com/users/shindetejas08")
    //     .then((response)=>response.json())
    //     .then((data)=> {
    //         console.log(data);
    //         setData(data)
    //     })
    // },[])
    const data = useLoaderData()
  return (
    <div className="text-center bg-gray-500 text-white p-4 m-4 text-3xl">
      Github Followers: {data.followers}
      <img src={data.avatar_url} alt="github picture" width="300"/>
    </div>
  )
}

export default Github

export const GithubLoaderData = async ()=>{
    const response = await fetch("https://api.github.com/users/shindetejas08")
    return response.json()
}
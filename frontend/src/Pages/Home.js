import React, { useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast';

export default function Home() {
  const [url,seturl]=useState(null)
 const[urlcode,seturlcode]=useState(null)
 const[show,setshow]=useState(null)

  const handleGenerate=async(e)=>{
    e.preventDefault()
    if(url!=null){
    let res=await axios.post("/url/shorten",{longUrl:url})
    // let get=await axios.get("")
    // console.log(res)
    setshow(res.data.data.shortUrl)
    seturlcode(res.data.data.urlCode)
    // result()
    console.log(res.data.data.urlCode)
  }
  else{toast.error("Provide valid Url")}
}

const resul= async()=>{
  let res=await axios.get(`/${urlcode}`)
    console.log({get:res})
  }



  
  return (
 <div className=' flex flex-col   justify-start '>
    <h1 className='text-5xl font-bold px-5 py-10'>Shrink Your Url </h1>
    <div className='grid gap-4 grid-cols-1'>
    <form className=' px-5 gap-5' onSubmit={handleGenerate}>
    <input type="text" value={url} onChange={(e)=>{seturl(e.target.value)}} className=' border-2 border-black rounded-md hover:underline hover:underline-offset-4 cursor-pointer p-4 w-3/5' placeholder='Enter yout Url and Press genrtate' />
    <button type='Submit' className='border-2 font-medium border-sky-500 rounded-md p-4 mx-8 bg-sky-500/100  hover:underline hover:underline-offset-4 '>Generate</button>
    </form>
    <div>
      {show?(<form className=' flex px-5 ' action="">

<input type="text" onClick={resul} value={show} className=' border-2 border-black rounded-md hover:underline hover:underline-offset-4 cursor-pointer p-4 w-3/5'/>
{/* <button type='Submit' className='border-2 font-medium border-sky-500 rounded-md p-4 mx-8 bg-sky-500/100  hover:underline hover:underline-offset-4 '>Generate</button> */}
</form>):("")}
    </div></div>
 </div>
  )
}

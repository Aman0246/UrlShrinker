import React, { useState } from 'react'
import axios from "axios"
import home from "./home.css"
import validUrl from "valid-url";
import toast from 'react-hot-toast';
import { BsFillClipboardFill } from 'react-icons/bs';
import { BsFillClipboardCheckFill } from 'react-icons/bs';
export default function Home() {
  const [url,seturl]=useState(null)
 const[urlcode,seturlcode]=useState(null)
 const[show,setshow]=useState(null)


 const [icon , seticon]=useState(true)
 const clipboard=()=>{
  navigator.clipboard.writeText(show)
 seticon(false)
 toast.success("Url Copied")

 }

  const handleGenerate=async(e)=>{
    e.preventDefault()
    if(url!=null){
      seticon(true)
      if(validUrl.isWebUri(url)){
    let res=await axios.post("/url/shorten",{longUrl:url})
    setshow(res.data.data.shortUrl)
    seturlcode(res.data.data.urlCode)
    console.log(res.data.data.urlCode)
  }
  else{toast.error("Provide valid Url")
setshow(null)
}
}
  else{toast.error("Provide valid Url")}
}

  return (
 <div className=' flex flex-col   justify-start '>
    <h1 className='text-5xl font-bold px-5 py-10'>Shrink Your Url </h1>
    <div className='grid gap-4 grid-cols-1'>
    <form className=' px-5 gap-5' onSubmit={handleGenerate}>
    <input type="text" value={url} onChange={(e)=>{seturl(e.target.value)}} className='a border-2 border-black rounded-md hover:underline hover:underline-offset-4 cursor-pointer p-4 w-3/5' placeholder='Enter yout Url and Press genrtate' />
    <button type='Submit' className='border-2 font-medium border-sky-500 rounded-md p-4 mx-8 bg-sky-500/100  hover:underline hover:underline-offset-4 '>Generate</button>
    </form>
    <div>
      {show?(<form className=' flex px-5 ' action="">

<input type="text"  value={show} className='flex justify-center items-center a border-2 border-black rounded-md hover:underline hover:underline-offset-4 cursor-pointer p-4 w-3/5'/>
<span onClick={clipboard} className='absolute '> {icon?(<><BsFillClipboardFill size={25}/></>):(<><BsFillClipboardCheckFill color='Green' size={25}/></>)}</span>
</form>):("")}
    </div></div>
 </div>
  )
}

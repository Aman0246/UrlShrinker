import React, { useState } from 'react'
import axios from "axios"
import home from "./home.css"
import validUrl from "valid-url";
import validator from "validator"
import toast from 'react-hot-toast';
import { BsFillClipboardFill } from 'react-icons/bs';
import { BsFillClipboardCheckFill } from 'react-icons/bs';
import { AiOutlineLink } from 'react-icons/ai';
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
      if (!validator.isURL(url)) {
     return   toast.error("in valalid Domain")

      }
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
    <div className='flex justify-center items-center flex-col'>
 <div className='p-[2rem]  font-bold text-[4rem]' >Shrink Your Url </div>
   <div className='flex flex-col  justify-center  p-[1rem] items-center w-full ' >
     <form  onSubmit={handleGenerate}  className=' w-3/5 flex items-center  gap-3 justify-between '>
                <AiOutlineLink className='absolute' />
                <input type="url" value={url} onChange={(e)=>{seturl(e.target.value)}} className='w-full flex px-[2rem] cursor-pointer rounded-lg py-[1rem]' placeholder=' Enter yout Url and Press genrtate' />

                <button type='Submit' className='px-2 py-3 rounded-xl bg-black text-white  '>Generate</button>
    </form>
    {show?(<form className=' w-3/5 flex items-center  gap-3 justify-between ' action="">

       <input type="text"  onClick={()=>window.open(show)} value={show} className='w-full mt-[1rem] flex px-[2rem] hover:underline cursor-pointer rounded-lg py-[1rem]'/>
       <span onClick={clipboard} className='relative left-'> {icon?(<span className=''><BsFillClipboardFill size={25}/></span>):(<span><BsFillClipboardCheckFill color='Green' size={25}/></span>)}</span>
          </form>):("")}
    </div>
   </div>

  )
}


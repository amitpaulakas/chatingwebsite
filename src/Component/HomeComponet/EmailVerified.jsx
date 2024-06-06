import React from 'react'
import PictureEmail from "../../assets/email.gif"
import { Link } from "react-router-dom";


const EmailVerified = ({email, displayName}) => {
  return (
    <div className='flex justify-center items-center h-[100vh] bg-blue-300'>
    <div className='flex justify-center items-center flex-col  items-center gap-y-5 font-Nunito font-bold'>
    <div>
       
            <img className='h-auto w-full items-center  object-cover' src={PictureEmail} alt={PictureEmail} />
       
    
     </div>
     <h1> {displayName ? displayName : "@username please go to your emailbox"}</h1>
     <h1 className='text-4xl capitalize'>
     please verify your mail <span className=' lowercase'>{email ? email : "example.gmail.com"}</span> 
     </h1>
     <button className='px-10 py-5 bg-green-500'><Link target='_bkank' to={"https://mail.google.com/mail/u/0/#inbox"}>Go to Email</Link></button>
    </div>
    </div>
  )
}

export default EmailVerified

import React, { useEffect, useState } from 'react'
import { getAuth ,onAuthStateChanged } from "firebase/auth";
import EmailVerifiedPage from '../Component/HomeComponet/EmailVerified';
import Homeleft from '../Component/HomeComponet/HomeComponent/Homeleft/Homeleft';
import Homerighe from '../Component/HomeComponet/HomeComponent/HomeRight/Homerighe';


const Home = () => {
  const auth = getAuth();
  const [EmailVerified, setEmailVerified]=useState("")
  const [displayName , setdisplayName]= useState("")
  const [Email, setEmail]=useState("")

  const [userInfo, setuserInfo]=useState({
    emailVerified:false,
    displayName:"",
    email:"",
    
  })
const user = auth.currentUser;

useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    setuserInfo({
      ...userInfo,
      emailVerified:user.emailVerified,
      displayName:user.displayName,
      email:user.email
    })
    // setEmailVerified(user.emailVerified)
    // setdisplayName(user.displayName)
    // setEmail(user.email)
  } )
},[userInfo.emailVerified])
  return (
  <div >
      <div className='h-[100vh] '>
      {userInfo.emailVerified ?(
<div className=' flex p-3 '>
  <Homeleft />
  <Homerighe />
</div>
      ) : (
<EmailVerifiedPage email= {userInfo.email} displayName= {userInfo.displayName} />
      )}
    </div>
  </div>
  )
}

export default Home

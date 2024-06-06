import React, { useEffect, useState } from 'react'
import profilePica from "../../../../assets/profile.png"
import HOmeLogo from "../../../../assets/HOme.gif"
import LogoutLogo from "../../../../assets/logout.png"
import MessageLogo from "../../../../assets/Message.gif"
import SettingLogo from "../../../../assets/setting.gif"
import NotificationnLogo from "../../../../assets/notification.gif"
import { Link, useLocation } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import { Uploader } from "uploader"
import { getAuth,updateProfile, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref,set, onValue, child, push, update  } from "firebase/database";
import moment from 'moment';
import { ToastContainer, toast, Bounce } from 'react-toastify';





const Homeleft = () => { 
  const auth = getAuth();
  const [userInfo, setuserInfo]= useState({})
  const db = getDatabase();
  const[photoURL , setphotoURL]= useState()
const LinkLocation= useLocation(); 
const uploader = Uploader({
  apiKey: "free"
});
// Get a user Information using auth proverdier
useEffect(()=>{
  // const starCountRef = ref(db, '/users');
  // let useinfo = []
  // onValue(starCountRef, (snapshot) => {
  //    snapshot.forEach((item)=>{
  //     useinfo.push({
  //       userKey: item.key,
  //       email:item.val().email,
  //       uid: item.val().uid,
  //       username: item.val().username,
  //     })
     
      
  //    })
   
     
  //    setuserInfo(useinfo);
   
  // });

  onAuthStateChanged(auth, (user)=>{
if(user){
  const {uid}= user;
  console.log(user);
  const userDbRef = ref(db, 'users/');
  onValue(userDbRef, (snapshot) => {

    const data = snapshot.val();
    snapshot.forEach((item)=>{
      if(item.val().uid === uid){
        setuserInfo(Object.assign(item.val(),{userKey: item.key}));

      }
    })
  });
}
  })
 
   
},[db,auth])
console.log(userInfo);

//home page navigation
 let active = (LinkLocation.pathname.split("/home")[1]);
//  handle profile upload implement
const HandleProfileUpload =()=>{
//modal uplode picture
uploader.open({ multi: false ,  mimeTypes: ["image/*"],}).then(files => {
  if (files.length === 0) {
    console.log('No files selected.')
  } else {
    console.log('Files uploaded:', files[0].fileUrl);
    const userDbRef = ref(db, `users/${userInfo.userKey}`);
    update(userDbRef,{
      profile_picture: files[0].fileUrl,
    }).then(()=>{
      updateProfile(auth.currentUser, {
        photoURL: files[0].fileUrl,
      }).then(()=>{
        toast.info(`${auth.currentUser.displayName} Profile picture Upload sucessfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          })
      })
    })
    console.log(auth.currentUser.displayName);
    // setphotoURL(files[0].fileUrl);
    // set(ref(db, 'users/' + userInfo[0].userKey ), { 
    //   username: auth.currentUser.displayName,
    //   email: auth.currentUser.email,
    //   uid: auth.currentUser.uid,
    //   profile_picture: files[0].fileUrl,
    // });
  



  }
}).catch(err => {
  console.error(err);
});
}


  return (
    <div>
      <div className='h-[96vh]  bg-btn-color  px-[43px] py-[38px] rounded-xl '>
        <div>
        <ToastContainer />
           <div className='w-[100px] h-[100px] rounded-full bg-white shadow-lg cursor-pointer' onClick={HandleProfileUpload} >
       {userInfo.profile_picture ? (    <div className='flex h-full w-full justify-center items-center relative after:absolute after:top-0 after:left-0 after:bg-[#00000086] after:content-[""] after:h-[100px] after:w-[100px] after:rounded-full after:border-2 after:border-white-300
            ' >
           <picture className='w-[100px] h-[100px] rounded-full'>
                <img src={userInfo.profile_picture} alt={userInfo.profile_picture} className='w-full h-full object-cover rounded-full' />
            </picture>
            <span className=' absolute flex justify-center items-center text-white text-2xl z-10'>
            <MdOutlineFileUpload />
            </span>
           </div>):(    <div className='flex h-full w-full justify-center items-center relative after:absolute after:top-0 after:left-0 after:bg-[#00000086] after:content-[""] after:h-[100px] after:w-[100px] after:rounded-full after:border-2 after:border-white-300
            ' >
           <picture className='w-[100px] h-[100px] rounded-full'>
                <img src={profilePica} alt={profilePica} className='w-full h-full object-cover rounded-full' />
            </picture>
            <span className=' absolute flex justify-center items-center text-white text-2xl z-10'>
            <MdOutlineFileUpload />
            </span>
           </div>)}
          
           </div>
            <div className='mt-10'>
            <ul className='flex  flex-col justify-center items-center  gap-y-8'>
            <h1 className=' items-center text-xl font-bold text-white'>  {userInfo.username && userInfo.username.slice(0,1).toUpperCase()+userInfo.username.slice(1,6)}..
            {/* {userInfo.length > 0 && ( <h1 className='text-white font-bold text-2xl'>{userInfo[0].username? userInfo[0].username.split(" ")[0].charAt(0).toUpperCase()+userInfo[0].username.split(" ")[0].slice(1,7) :null}
            
            
            </h1>)} */}
            </h1>
                <li className={active === "/chathome" ? " after:rounded-l-lg relative after:absolute after:top-0  after:right-0 after:w-4 after:h-full after:bg-btn-color  ml-5 cursor-pointer bg-white w-[160%] flex justify-center items-center py-4 rounded-l-lg" : "cursor-pointer"}>
                  <Link to="chathome">
                  <img src={HOmeLogo} alt={HOmeLogo} className='w-[50px] h-[50px]' /></Link>
                  
                    
                </li>
                <li className={active === "/message" ? " after:rounded-l-lg relative after:absolute after:top-0  after:right-0 after:w-4 after:h-full after:bg-btn-color  ml-5 cursor-pointer bg-white w-[160%] flex justify-center items-center py-4 rounded-l-lg" : "cursor-pointer"}>
                  <Link to={"message"}>
                  <img src={MessageLogo} alt={MessageLogo} className='w-[50px] h-[50px]' /></Link>
                    
                </li>
                <li className={active === "/notification" ? " after:rounded-l-lg relative after:absolute after:top-0  after:right-0 after:w-4 after:h-full after:bg-btn-color  ml-5 cursor-pointer bg-white w-[160%] flex justify-center items-center py-4 rounded-l-lg" : "cursor-pointer"}>
                  <Link to={"notification"}>
                  <img src={NotificationnLogo} alt={NotificationnLogo} className='w-[50px] h-[50px]' />
                  </Link>
                    
                </li>
                <li className={active === "/settings" ? " after:rounded-l-lg relative after:absolute after:top-0  after:right-0 after:w-4 after:h-full after:bg-btn-color  ml-5 cursor-pointer bg-white w-[160%] flex justify-center items-center py-4 rounded-l-lg" : "cursor-pointer"}>
                   <Link to={"settings"}>
                   <img src={SettingLogo} alt={SettingLogo} className='w-[50px] h-[50px]' /></Link>
                </li>
                <li className="cursor-pointer">
                   <Link to={""}>
                   <img src={LogoutLogo} alt={LogoutLogo} className='w-[40px] h-[40px]' />
                   </Link>
                </li>
            </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Homeleft

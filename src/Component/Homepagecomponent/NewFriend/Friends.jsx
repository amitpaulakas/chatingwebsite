import React, { useEffect, useState } from 'react'
import Search from '../../HomeComponet/HomeComponent/HomepageCommonComponent/Search';
import { FaEllipsisVertical } from "react-icons/fa6";
import p1 from "../../../assets/1p.gif"
import p2 from "../../../assets/2p.gif"
import p3 from "../../../assets/3p.gif"
import p4 from "../../../assets/4p.gif"
import { getAuth, onAuthStateChanged,updateProfile } from "firebase/auth";
import { getDatabase ,ref, onValue,set, push, remove, } from "firebase/database";
import moment from 'moment';
import { FaUsers } from "react-icons/fa6";
import { Bounce, toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';


const Friends = () => {
  const auth = getAuth();
  const db = getDatabase();
const [Friendss, setFriendss]= useState([]);

  /** * todo :  fetch all friend  data from Friend request
 * @param({})
 */
useEffect(()=>{
  const currentUid= auth.currentUser.uid
const friendsDbRef =  ref(db, 'Friends/');
onValue(friendsDbRef, (snapshot)=>{
  let friendblankArey=[];
  snapshot.forEach((item)=>{
    
      friendblankArey.push({...item.val(),friendsUserKey:item.key})
    
    
  })
  setFriendss(()=>{
    return friendblankArey.filter((item)=> item.reciverUid === currentUid)
  });
})
},[auth.currentUser.uid, db])

/**
 * todo :HandleBlockUsers funtionality impliment
 * @params{(items)}
 */

const HandleBlockUsers = (item) =>{
console.log(item);
set(push(ref(db, "Block/")), {
BlockById: auth.currentUser.uid,
BlockByName:auth.currentUser.displayName,
BlockByEmail:auth.currentUser.email,
whoBlock:item.SenderUid,
whoBlockName:item.senderName,
whoBlockemail:item.SenderEmail,
BlockByReciverUserKey:item.reciverUserKey,
WhoBlockedProfilePicture:item.profile_picture,
createAtDate:moment().format("MM/DD/YYYY, h:mm:ss a"),
}).then(()=>{
  remove(ref(db, "Friends/" + item.friendsUserKey));
  console.log("amit all is ok");
  toast.error(`${item.senderName} is Blocked`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });
})
}
  return (
    <div className='self-end '>
         <div className=' items-center '>
   <div className='w-[427px] mt-10 items-center'>
   <div className='flex justify-between   my-5'>
            <h1 className=' mr-25 text-xl font-popins text-customBlack font-bold'> 
            
<button type="button" className="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-btn-color rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
<FaUser className='text-2xl mr-2'/>
<span className="sr-only">Notifications</span>
Friends List
  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500   rounded-full -top-2 -end-2 ">{Friendss.length>0 ? Friendss.length: 0}</div>
</button>
  </h1>


            <span>
<FaEllipsisVertical className=' text-2xl text-btn-color'/>
            </span>
        </div>
 
    <div  className='rounded-2xl mt-2 w-[427px]    shadow-xl h-[347px] overflow-y-auto  scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300' >
       

    <div className='grid-cols-1 divide-y '>
{Friendss.length> 0 ? 
(Friendss?.map((item)=>(
  auth.currentUser.uid === item.reciverUid && (
    <div key={item.id} className='flex items-center  justify-between px-8 py-5  '>
    <div className='w-[70px] h-[70px] cursor-pointer relative '>
      {item.profile_picture ? ( <picture>
       <img src={item.profile_picture} alt={item.profile_picture} className='w-full h-full object-cover rounded-full  shadow-lg' />
     </picture>) : (
       <picture>
       <img src={p2} alt={p2} className='w-full h-full object-cover rounded-full  shadow-lg' />
     </picture>
     )}
    
    {navigator.onLine && (
         <span class="absolute right-0 bottom-1 flex h-3 w-3">
         <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
         <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
         </span>
    )}
    </div>
    <div className=' w-[30%] flex flex-col items-start justify-center  text-wrap'>
     <h1 className='text-xl font-popins text-customBlack font-bold'>
          {item.senderName ?  item.senderName: "Unkhown Name"} 
        </h1>
     <p className=' text-[18px] font-popins opacity-70 text-customBlack font-normal '>{item.reciveName  ?  item.reciveName + " Message You": "text Missing"} </p>
    
    </div>
    <div className='flex flex-col justify-center items-center gap-y-2'>
     <p className='text-sm font-popins  font-semibold text-black-500 opacity-75 px-5 py-2  rounded-lg'>{moment(item.createAtDate).fromNow() }
     </p>
     <button className='relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-btn-color rounded-lg hover:bg-blue-800 dark:hover:bg-blue-700 ' onClick={()=>HandleBlockUsers(item)}>
      Block
     </button>
    </div>
    </div>
  )
    
    
)) ) :(
  <div  className='flex items-center  justify-center px-8 py-5  '>
  <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<span class="font-medium">!</span> No Friend Available Right now
</div>
 
  </div>
)}

    
    </div>
    
 </div>
 
   </div>
   </div>
    </div>
  )
}

export default Friends

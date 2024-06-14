import React, { useEffect, useState } from 'react'
import Search from '../../HomeComponet/HomeComponent/HomepageCommonComponent/Search';
import { FaEllipsisVertical } from "react-icons/fa6";
import p1 from "../../../assets/1p.gif"
import p2 from "../../../assets/2p.gif"
import p3 from "../../../assets/3p.gif"
import p4 from "../../../assets/4p.gif"
import { getDatabase ,ref, onValue,set, push, remove, } from "firebase/database";
import moment from 'moment';
import { getAuth, onAuthStateChanged,updateProfile } from "firebase/auth";
import { Bounce, toast } from 'react-toastify';
import { fireToastError } from '../../../utils/utils';

const FriendRequest = () => {
const db = getDatabase();
const [FriendRequestList , setFriendRequestList] = useState([]);
const auth = getAuth();
/**
 * todo :  fetch friend request data from realtime database
 * @param({})
 */
useEffect(() => {
  const FriendRequestDbRef = ref(db, 'FriendRequest/');
 
  onValue(FriendRequestDbRef, (snapshot) => {
    let friendRequestBlankArr = [];
    snapshot.forEach((item)=>{
      console.log(item.val());
      if(item.val().reciverUid === auth.currentUser.uid){
        friendRequestBlankArr.push({ ...item.val(),createAtDate:moment().format("MM/DD/YYYY, h:mm:ss a"), friendReuestUsersKey:item.key,});
      }
    })
    setFriendRequestList(friendRequestBlankArr);
  });
},[db]);
console.log(FriendRequestList);
// HandleAcceptRequest funtionality apliment
const HandleAcceptRequest =(item)=>{
console.log(item);
  set(push(ref(db, "Friends/")), {
    ...item,
    createAtDate:moment().format("MM/DD/YYYY, h:mm:ss a"),
  }).then(()=>{
    const friendRequestDbRef = ref(db, `FriendRequest/${ item.friendReuestUsersKey}`,);
    remove(friendRequestDbRef);
  }).then(()=>{
    toast.success(`${item.senderName} is your Friend now`, {
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
  }).then(()=>{
    set(push(ref(db, "notification/")), {
      NotificationUid:item.SenderUid,
      NotificationName: auth.currentUser.displayName,
      NotificationNamePhoto: auth.currentUser.photoURL,
      NotificationMessage: `${auth.currentUser.displayName} Accept your Friend request`,
      createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
    });
  })
}
// HandlecalcleRequest funtionality implement
const HandlecancleRequest =(item)=>{
  const friendRequestDbRef = ref(db, `FriendRequest/${ item.friendReuestUsersKey}`,);
 remove(friendRequestDbRef);
 fireToastError();
 set(push(ref(db, "notification/")), {
  NotificationUid:item.SenderUid,
  NotificationName: auth.currentUser.displayName,
  NotificationNamePhoto: auth.currentUser.photoURL,
  NotificationMessage: `${auth.currentUser.displayName}Reject your Friend request`,
  createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
});
}
  return (
    <div>
       
       <div className='self-end '>
         <div className=' items-center '>
   <div className='w-[427px] mt-10 items-center'>
   <div className='flex justify-between   my-5'>
            <h1 className=' mr-25 text-xl font-popins text-customBlack font-bold'>Friend Request</h1>
            <span>
<FaEllipsisVertical className=' text-2xl text-btn-color animate-pulse'/>
            </span>
        </div>
 
    <div  className='rounded-2xl mt-2 w-[427px]    shadow-xl h-[147px] overflow-y-auto  scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300' >
       
    <div className='grid-cols-1 divide-y '>
{FriendRequestList.length > 0 ? (FriendRequestList?.map((item)=>(
    <div key={item.id} className='flex items-center  justify-between px-8 py-5  '>
    <div className='w-[70px] h-[70px] cursor-pointer relative '>
     <picture>
       <img src={item.profile_picture} alt={item.profile_picture} className='w-full h-full object-cover rounded-full  shadow-lg' />
     </picture>
   
    </div>
    <div className=' w-[30%] flex flex-col items-start justify-center  text-wrap'>
     <h1 className='text-xl font-popins text-customBlack font-bold'>
          {item.senderName ?  item.senderName: "Unkhown Name"} 
        </h1>
     <p className=' text-[18px] font-popins opacity-70 text-customBlack font-normal '>{moment(item.createAtDate).fromNow()} </p>
    </div>
    <div>
     <div className='flex items-center gap-x-4'>
        <button className='transition-all text-sm font-popins   font-semibold text-black-500  bg-gradient-to-r from-[#24c6dc] to-indigo-400 opacity-75 px-3 py-2  rounded-lg hover:bg-gradient-to-l from-[#24c6d5] to-indigo-400'onClick={()=>HandleAcceptRequest(item)} >Accept</button>
        
        <button onClick={()=>HandlecancleRequest(item)} className="rounded-lg text-sm bg-gradient-to-r from-[#ff6767] to-[#f80778]  px-3 py-2 font-semibold text-white transition-all hover:bg-gradient-to-l opacity-75 hover:from-[#f96363] hover:to-[#d43394]">
                      Cancel
                    </button>
     </div>
    </div>
    </div>
    
)) ):(
   <div  className='flex items-center  justify-center px-8 py-5  '>
   <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 <span class="font-medium">!</span> No Friend Request  
</div>
  
   </div>
)}

  
    
    </div>
    
 </div>
 
   </div>
   </div>
    </div>
    </div>
  )
}

export default FriendRequest

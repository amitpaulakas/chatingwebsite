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
import { Bounce, toast } from 'react-toastify';
import { FaUsers } from 'react-icons/fa';
const Friends = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [Blocklist, setBlocklist]= useState([]);


 useEffect(()=>{
  const BlocklistDbRef= ref(db,"Block/" )
  onValue(BlocklistDbRef,(snapshot)=>{
    let BlocklistArrey=[];
    snapshot.forEach((item)=>{
      BlocklistArrey.push({...item.val(),Blockuserkey:item.key})
    })
    setBlocklist(()=>{
    const filteItem =  BlocklistArrey.filter((item)=>item.BlockById=== auth.currentUser.uid,);
    return filteItem;
    });
    
  })
},[db])
/**
 * todo:HandleUnblock funtionality implement
 * @params ({})
 */
const HandleUnblock= (item)=>{
  set(push(ref(db, "Friends/")), {
    senderName:item.whoBlockName, 
    SenderEmail:item.whoBlockemail,
    SenderUid:item.whoBlock,
    reciveName:item.BlockByName ,
    reciverEmai:item.BlockByEmail,
    reciverUid:item.BlockById,
    profile_picture:item.WhoBlockedProfilePicture,
    reciverUserKey:item.BlockByReciverUserKey,
    createAtDate:moment().format("MM/DD/YYYY, h:mm:ss a"),
    }).then(()=>{
      console.log(item);
      remove(ref(db,"Block/" + item.Blockuserkey));
      console.log("amit all is ok");
      toast.info(`${item.whoBlockName} is Unblocked`, {
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
<FaUsers className='text-2xl mr-2'/>
<span className="sr-only">Notifications</span>
Block List
  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500   rounded-full -top-2 -end-2 ">{Blocklist.length>0 ? Blocklist.length: 0}</div>
</button>
            </h1>
            <span>
<FaEllipsisVertical className=' text-2xl text-btn-color'/>
            </span>
        </div>
 
    <div  className='rounded-2xl mt-2 w-[427px]    shadow-xl h-[147px] overflow-y-auto  scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-red-300' >
       
    <div className='grid-cols-1 divide-y '>
{Blocklist.length > 0 ? Blocklist?.map((item)=>(
    <div key={item.id} className='flex items-center  justify-between px-8 py-5  '>
    <div className='w-[70px] h-[70px] cursor-pointer relative '>
      {item.WhoBlockedProfilePicture ?( <picture>
       <img src={item.WhoBlockedProfilePicture} alt={item.WhoBlockedProfilePicture} className='w-full h-full object-cover rounded-full  shadow-lg' />
     </picture>): ( <picture>
       <img src={p3} alt={item.p3} className='w-full h-full object-cover rounded-full  shadow-lg' />
     </picture>)}
    
    {item.active && (
         <span class="absolute right-0 bottom-1 flex h-3 w-3">
         <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
         <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
         </span>
    )}
    </div>
    <div className=' w-[40%] flex flex-col items-start justify-center  text-wrap'>
     <h1 className='text-xl font-popins text-customBlack font-bold'>
          {item.whoBlockName ?  (item.whoBlockName): ("Unkhown Name")} 
        </h1>
     <p className=' text-[18px] font-popins opacity-70 text-customBlack font-normal '>{moment(item.createAtDate).calendar() ?  moment(item.createAtDate).calendar(): "text Missing"} </p>
    </div>
    <div>
    <div className='text-sm font-popins  font-semibold text-black-500 bg-btn-color opacity-75 px-3 py-2  rounded-lg'><button className='text-sm font-popins  font-semibold text-white animate-pulse bg-btn-color opacity-75 px-3 py-2  rounded-lg' onClick={()=> HandleUnblock(item)}>UNBLOCK</button></div>
    </div>
    </div>
    
))  :   <div  className='flex items-center  justify-center px-8 py-5  '>
<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<span class="font-medium">!</span> No BlockList Available here 
</div>

</div>}

   

    
    </div>
    
 </div>
 
   </div>
   </div>
    </div>
  )
}

export default Friends

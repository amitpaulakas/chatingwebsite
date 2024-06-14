import React, { useEffect, useState } from 'react'
import Img from ".././../assets/1p.gif"
import { getDatabase, onValue, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import moment from 'moment';
const notification = () => {
    const auth = getAuth();
    const db = getDatabase();
  const [notification, setnotification]= useState([]);
  
    /** * todo :  fetch all friend  data from Friend request
   * @param({})
   */
  useEffect(()=>{
    const currentUid= auth.currentUser.uid
  const fnotificationDbRef =  ref(db, 'notification/');
  onValue(fnotificationDbRef, (snapshot)=>{
    let notificationlankArey=[];
    snapshot.forEach((item)=>{
      if(item.val().NotificationUid === auth.currentUser.uid){
        notificationlankArey.push({...item.val(),friendsUserKey:item.key})
      }
  
    })
    setnotification(notificationlankArey);
  })
  },[auth.currentUser.uid, db])

  return (
    <div className='mt-10 h-[85vh] overflow-y-scroll flex flex-col justify-start items-stretch gap-y-2'>
      
{notification?.map((notification)=>(
    <div class="flex items-start gap-2.5">
   <div>
   <img className="w-10 h-10 rounded-full shadow-2xl"  src={notification.NotificationNamePhoto} alt={Img} />
   </div>
    <div class="flex flex-col w-full  leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
       <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">{notification.NotificationName}</span>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(notification.createdAtDate).calendar()}</span>
       </div>
       <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{notification.NotificationMessage}</p>
       <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(notification.createdAtDate).fromNow()}</span>
    </div>
    
    
 </div>
))}

    </div>
  )
}

export default notification

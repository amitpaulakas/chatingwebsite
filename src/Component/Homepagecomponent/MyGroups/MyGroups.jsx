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
import { FaUsers } from 'react-icons/fa';
import Grouplist from '../GroupList/Grouplist';
import Modal from 'react-modal';
import { ImCross } from 'react-icons/im';
import { fireToast, fireToasterror } from '../../../utils/utils';
const Friends = () => {
  const auth = getAuth();
  const db = getDatabase();
const [MyGroup, setMyGroup]= useState([]);
const [Groupreq, setGroupreq]= useState([]);
const [GroupreqItem, setGroupreqItem]= useState([]);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(GroupKey) {
    setIsOpen(true);
     const GroupRWqDbRef =  ref(db, 'GroupRequest/');
    onValue(GroupRWqDbRef, (snapshot)=>{
      let GroupReqItem=[];
      snapshot.forEach((item)=>{
        if(item.val().GroupKey === GroupKey){
          GroupReqItem.push({...item.val(), groupRequestkey:item.key})
        }
      })
      setGroupreqItem(GroupreqdbblankArey);
    })
  }
console.log(GroupreqItem);
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

//HandleGroupreqAcceptRequest funtionality implement
const HandleGroupreqAcceptRequest = (item)=>{
  set(push(ref(db, "GroupMember/")), {
    AdminId:item.AdminId,
    AdminUserName:item.AdminUserName,
    AdminEmail:item.AdminEmail,
    GroupKey:item.GroupKey,
    Groupname:item.Groupname,
    GroupPhotoUrl:item.GroupPhoto,
    GroupTagname:item.Grouptagname,
    groupmembername:item.whoWantToJoinGroupName,
    GoupJoinMemberId:item.whoWantToJoinGroupId,
    GroupJoinMemberPhoto:item.WhoWantToJoinGroupPhoto,
    createAtDate:moment().format("MM/DD/YYYY, h:mm:ss a"),


  });
}

//HandleGroupReqcancleRequest funtionality implement
const HandleGroupReqcancleRequest = (item)=>{
  console.log(item);
remove(ref(db, "GroupRequest/" + item.groupRequestkey)).then(()=>{
  closeModal();
fireToasterror(`${item.Groupname} is removed`)
  set(push(ref(db, "notification/")), {
    NotificationName: item.Groupname,
    NotificationNamePhoto: item.GroupPhoto,
    NotificationMessage: `${item.Groupname} Send You a Group Join Request`,
    createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
  });
})

}

/**
 * todo fecth all group data
 */
useEffect(()=>{
  
const GroupListDbRef =  ref(db, 'GroupList/');
onValue(GroupListDbRef, (snapshot)=>{
  let GroupdblankArey=[];
  snapshot.forEach((item)=>{
    if(item.val().AdminId === auth.currentUser.uid){
      GroupdblankArey.push({...item.val(),GroupKey:item.key})
    }
  })
  setMyGroup(GroupdblankArey);
})
},[auth.currentUser.uid, db])
console.log(MyGroup);
  /**
 * todo fecth all group data
 */

  useEffect(()=>{
  
    const GroupRWqDbRef =  ref(db, 'GroupRequest/');
    onValue(GroupRWqDbRef, (snapshot)=>{
      let GroupreqdbblankArey=[];
      snapshot.forEach((item)=>{
        if(item.val().AdminId === auth.currentUser.uid){
          GroupreqdbblankArey.push(item.val().AdminId + item.val().GroupKey )
        }
      })
      setGroupreq(GroupreqdbblankArey);
    })
    },[auth.currentUser.uid, db])
  console.log(Groupreq);
  return (
    <div className='self-end '>
         <div className=' items-center '>
   <div className='w-[427px] mt-10 items-center'>
   <div className='flex justify-between   my-5'>
   <button type="button" className="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-btn-color rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
<FaUsers className='text-2xl mr-2'/>
<span className="sr-only">Notifications</span>
My Group
  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500   rounded-full -top-2 -end-2 ">{MyGroup.length>0 ? MyGroup.length: 0}</div>
</button>
            <span>
<FaEllipsisVertical className=' text-2xl text-btn-color'/>
            </span>
        </div>
 
    <div  className='rounded-2xl mt-2 w-[427px]    shadow-xl h-[147px] overflow-y-auto  scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300' >
       
    <div className='grid-cols-1 divide-y '>
    {MyGroup.length> 0 ?
    MyGroup?.map((item)=>(
    <div key={item.id} className='flex items-center  justify-between px-8 py-5  '>
    <div className='w-[70px] h-[70px] cursor-pointer relative '>
     <picture>
       <img src={item.GroupPhoto? item.GroupPhoto:p4 } alt={item.GroupPhoto? item.GroupPhoto:p4 } className='w-full h-full object-cover rounded-full  shadow-lg' />
     </picture>
    {item.active && (
         <span class="absolute right-0 bottom-1 flex h-3 w-3">
         <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
         <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
         </span>
    )}
    </div>
    <div className=' w-[30%] flex flex-col items-start justify-center  text-wrap'>
     <h1 className='text-xl font-popins text-customBlack font-bold'>
          {item.Groupname ?  item.Groupname: "Unkhown Name"} 
        </h1>
     <p className=' text-[18px] font-popins opacity-70 text-customBlack font-normal '>{item.Grouptagname ?  item.Grouptagname: "text Missing"} </p>
    </div>
    <div>
     <div className='text-sm font-popins  font-semibold text-black-500 opacity-75 px-5 py-2  rounded-lg'>
      {Groupreq.includes(auth.currentUser.uid + item.GroupKey) ? (
        <div className='flex gap-x-3'>
           <button className='  text-white transition-all text-sm font-popins   font-semibold text-black-500  bg-gradient-to-r from-[#24c6dc] to-indigo-400 opacity-75 px-3 py-2  rounded-lg hover:bg-gradient-to-l from-[#24c6d5] to-indigo-400' onClick={()=> openModal(item.GroupKey)} >See group request</button>
           
        </div>
      ):(moment(item.createAtDate).fromNow() )}
      </div>
    </div>
    </div>
      
)):  <div  className='flex items-center  justify-center px-8 py-5  '>
  <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<span class="font-medium">!</span> No Group are Available. Make Group to contact your friends
</div>
 
  </div>}
 
   

    
    </div>
    
 </div>
 <div>
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
       
        <div >
            <button className='flex text-white justify-center items-center  w-[34px] h-[34px]  text-sm rounded-full bg-red-600' onClick={()=> closeModal()}><ImCross />
</button>
          </div>
        
        <div>{GroupreqItem?.map((item)=>(
              <div key={item.id} className='flex items-center  justify-between px-8 py-5  '>
              <div className='w-[70px] h-[70px] cursor-pointer relative '>
               <picture>
                 <img src={item.GroupPhoto? item.GroupPhoto:p4 } alt={item.GroupPhoto? item.GroupPhoto:p4 } className='w-full h-full object-cover rounded-full  shadow-lg' />
               </picture>
              {item.active && (
                   <span class="absolute right-0 bottom-1 flex h-3 w-3">
                   <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                   </span>
              )}
              </div>
              <div className=' w-[30%] flex flex-col items-start justify-center  text-wrap'>
               <h1 className='text-xl font-popins text-customBlack font-bold'>
                    {item.Groupname ?  item.Groupname: "Unkhown Name"} 
                  </h1>
               <p className=' text-[18px] font-popins opacity-70 text-customBlack font-normal '>{item.Grouptagname ?  item.Grouptagname: "text Missing"} </p>
              </div>
              <div>
               <div className='text-sm font-popins  font-semibold text-black-500 opacity-75 px-5 py-2  rounded-lg'>
               <div className='flex items-center gap-x-4'>
        <button className='transition-all text-sm font-popins   font-semibold text-black-500  bg-gradient-to-r from-[#24c6dc] to-indigo-400 opacity-75 px-3 py-2  rounded-lg hover:bg-gradient-to-l from-[#24c6d5] to-indigo-400'onClick={()=>HandleGroupreqAcceptRequest(item)} >Accept</button>
        
        <button onClick={()=>HandleGroupReqcancleRequest(item)} className="rounded-lg text-sm bg-gradient-to-r from-[#ff6767] to-[#f80778]  px-3 py-2 font-semibold text-white transition-all hover:bg-gradient-to-l opacity-75 hover:from-[#f96363] hover:to-[#d43394]">
                      Cancel
                    </button>
     </div>
                </div>
              </div>
              </div>
                
          ))
          }</div>
        <form>
          
        </form>
      </Modal>
    </div>
   </div>
   </div>
    </div>
  )
}

export default Friends

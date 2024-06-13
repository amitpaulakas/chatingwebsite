import React, { useEffect, useState } from 'react'
import Search from '../../HomeComponet/HomeComponent/HomepageCommonComponent/Search';
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaPlus, FaMinus, FaUserFriends, FaUsers } from "react-icons/fa";
import p1 from "../../../assets/1p.gif"
import p2 from "../../../assets/2p.gif"
import p3 from "../../../assets/3p.gif"
import p4 from "../../../assets/4p.gif"
import { getDatabase ,ref, onValue,set, push, } from "firebase/database";
import moment from 'moment';
import { getAuth, onAuthStateChanged,updateProfile } from "firebase/auth";
import { useRevalidator } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';


const Userlist = () => {
  const db = getDatabase();
const auth = getAuth();
  const [userlist,setuserlist]=useState([]);
  const [RecentCurrentUser, setRecentCurrentUser] = useState({});
  const [friendRequestUser, setfriendRequestUser]=useState([]);
const [IsheFriend, setIsheFriend]= useState([]);
  useEffect(()=>{
    const UserDbRef = ref(db, 'users/');
    onValue(UserDbRef, (snapshot) => {
      let UserArray =[];
      const data = snapshot.val();
      snapshot.forEach((item)=>{
        // UserArray.push(object.assign(item.val(), {userKey: item.key}));
        if(item.val().uid !== auth.currentUser.uid){
          UserArray.push({...item.val(),userKey: item.key});
        }else if (item.val().uid === auth.currentUser.uid) {
         setRecentCurrentUser({...item.val(), userKey: item.key});
        }
        
      })
      setuserlist(UserArray);
    });
    
  },[])
 
  

// const Formatedate = moment("05/21/2024 3:25:50 pm ").format(" MM/DD/YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"

// HandleFriendRequest  funtionality implement

 const HandleFriendRequest = (item)=>{

  set(push(ref(db, 'FriendRequest/' )), {
    SenderUid:auth.currentUser.uid,
    SenderEmail: auth.currentUser.email,
    profile_picture:auth.currentUser.photoURL ? auth.currentUser.photoURL : "NEI",
    SenderUserkey: RecentCurrentUser.userKey,
    senderName : auth.currentUser.displayName,
    reciverUid:item.uid,
    reciveName:item.username,
    reciverEmail:item.email,
    reciverUserKey:item.userKey,
    createAtDate:moment().format("MM/DD/YYYY,h:mm:ss a") ,
  }).then(()=>{
    toast.success(`${item.username} Friend Request sent`, {
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

 };

  // console.log(userlist[0].createAtDate.split("/"));

  /**
   * todo : fetch all data from  friend request documents
   * @params ({})
   */
  useEffect(()=>{
    const FriendRequestDbRef = ref(db, 'FriendRequest/');
    onValue(FriendRequestDbRef, (snapshot) => {
      let friendRequestArrey= [];
      const data = snapshot.val();
      snapshot.forEach((item)=>{
        // UserArray.push(object.assign(item.val(), {userKey: item.key}));
        friendRequestArrey.push(item.val().SenderUid + item.val().reciverUid);
      })
      setfriendRequestUser(friendRequestArrey)
    });
  },[db])

  
  /**
   * todo : fetch all data from  friend request documents
   * @params ({})
   */
  useEffect(()=>{
    const FriendtDbRef = ref(db, 'Friends/');
    onValue(FriendtDbRef, (snapshot) => {
      let friendDbArrey= [];
      const data = snapshot.val();
      snapshot.forEach((item)=>{
        // UserArray.push(object.assign(item.val(), {userKey: item.key}));
        friendDbArrey.push(item.val().SenderUid + item.val().reciverUserKey);
      })
      setIsheFriend(friendDbArrey)
    });
  },[])
console.log(IsheFriend);
console.log(IsheFriend.includes(auth.currentUser.SenderUid + auth.currentUser.SenderUid));
  console.log(userlist[0]);
  return (
 
       <div className='self-end '>
         <div className=' items-center '>
   <div className='w-[427px] mt-10 items-center'>
   <div className='flex justify-between   my-5'>
            <h1 className=' mr-25 text-xl font-popins text-customBlack font-bold'><button type="button" className="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-btn-color rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
<FaUsers className='text-2xl mr-2'/>
<span className="sr-only">Notifications</span>
Friends List
  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500   rounded-full -top-2 -end-2 ">{userlist.length>0 ? userlist.length: 0}</div>
</button></h1>
            <span>
<FaEllipsisVertical className=' text-2xl text-btn-color animate-pulse'/>
            </span>
        </div>
 
    <div  className='rounded-2xl mt-2 w-[427px]    shadow-xl h-[347px] overflow-y-auto  scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300' >
       
    <div className='grid-cols-1 divide-y '>
    {userlist.length > 0 ? userlist?.map((item)=>(
    <div key={item.id} className='flex items-center  justify-between px-8 py-5  '>
    <div className='w-[70px] h-[70px] cursor-pointer relative '>
     <picture>
       <img src={item.profile_picture? item.profile_picture: p1} alt={item.profile_picture} className='w-full h-full object-cover rounded-full  shadow-lg' />
     </picture>
   
    </div>
    <div className=' w-[40%] flex flex-col items-start justify-center  text-wrap'>
     <h1 className='text-xl font-popins text-customBlack font-bold'>
          {item.username ?  item.username : "Unkhown Name"} 
        </h1>
     <p className=' text-[18px] font-popins opacity-70 text-customBlack font-normal '>{moment(userlist[0].createAtDate).fromNow()}</p>
    </div>
   {IsheFriend.includes(auth.currentUser.uid+ item.userKey)? (
   <div>
    <button className='text-sm font-popins  font-semibold text-white animate-pulse bg-btn-color opacity-75 px-3 py-2  rounded-lg'> <FaUserFriends/></button>
    
   </div>
   ):
friendRequestUser.includes(auth.currentUser.uid + item.uid)? (<div>
 <div className='text-sm font-popins  font-semibold text-black-500 bg-btn-color opacity-75 px-3 py-2  rounded-lg' ><button className='text-sm font-popins  font-semibold text-white animate-pulse bg-btn-color opacity-75 px-3 py-2  rounded-lg'><FaMinus /></button></div>


</div> ): (<div  onClick={()=> HandleFriendRequest(item)}>
 <div className='text-sm font-popins  font-semibold text-black-500 bg-btn-color opacity-75 px-3 py-2  rounded-lg' ><button className='text-sm font-popins  font-semibold text-white animate-pulse bg-btn-color opacity-75 px-3 py-2  rounded-lg'><FaPlus /></button></div>
</div>) }
 
  
   
    </div>
    
))  : 
 <div  className='flex items-center  justify-center px-8 py-5 h-[38vh] '>
    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">!</span> No User are found at this time 
</div>
   
    </div> }

  
    </div>
    
 </div>
 
   </div>
   </div>
    </div>
   
  )
}

export default Userlist

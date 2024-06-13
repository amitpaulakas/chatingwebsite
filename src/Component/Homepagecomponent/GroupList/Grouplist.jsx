import React, { useState,createRef, useEffect } from 'react'
import Search from '../../HomeComponet/HomeComponent/HomepageCommonComponent/Search';
import { FaEllipsisVertical } from "react-icons/fa6";
import p1 from "../../../assets/1p.gif"
import p2 from "../../../assets/2p.gif"
import p3 from "../../../assets/3p.gif"
import p4 from "../../../assets/4p.gif"
import Modal from 'react-modal';
import { ImCross } from 'react-icons/im';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { getDatabase, push, set,ref as Dbref, onValue } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { getAuth  } from "firebase/auth";
import { fireToast, fireToasterror } from '../../../utils/utils';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import moment from 'moment';
import { FaUsers } from 'react-icons/fa';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:"30%"
  },
};

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const Grouplist = () => {
  const auth = getAuth();
  const db = getDatabase();
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("");
  const [GroupInfo, setGroupInfo] = useState({Grouptagname:"",Groupname:"",groupPhoto: ""});
  const cropperRef = createRef();
  const storage = getStorage();
  const [AllGroupList, setAllGroupList]= useState([]);
  const [Groupreqest, setGroupreqest]= useState([]);
  const [RecentCurrentUser, setRecentCurrentUser] = useState({});


  function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function openModal() {
    setIsOpen(true);
  }
/**HandleOpenModal funtionality implement 
*/
const HandleOpenModal = ()=>{
  openModal();
  
}

/**HandleCreateGroup funtion implement
 *  params : ({event})
 */
const HandleInput =(event)=>{
  setGroupInfo({
    ...GroupInfo,
    [event.target.id] : event.target.value,
  }
    
  )
}


/**HandleCreateGroup funtion implement */
const HandleCreateGroup =()=>{
  const {groupPhoto,Grouptagname,Groupname}= GroupInfo;
  if(!Groupname){
    fireToasterror("Groupname Missing","top-center",6000)
  }else if (!Grouptagname){
    fireToasterror("Grouptagname Missing","top-center",6000)
  }else if (!groupPhoto){
    fireToasterror("groupPhoto Missing","top-center",6000)
  }else{
    fireToast("everything is ok","top-center",6000);
    setLoading(true)
    const storageRef = ref(storage, `Group-Images/Images${uuidv4()}`);
// Data URL string
const groupPhotoUrl = groupPhoto;
uploadString(storageRef, groupPhotoUrl, 'data_url')
.then((snapshot) => {
  console.log('Uploaded a data_url string!');
}).then(()=>{
getDownloadURL(storageRef).then((downloadURL) => {
  set(push(Dbref(db, 'GroupList/')), {
    Groupname: Groupname,
    Grouptagname: Grouptagname,
    GroupPhoto:downloadURL,
    AdminId: auth.currentUser.uid,
    AdminUsername:auth.currentUser.displayName,
    AdminEmail:auth.currentUser.email,
    AdminPhotUrl:auth.currentUser.photoURL,
    createAtDate:moment().format("MM/DD/YYYY, h:mm:ss a"),
  });
});
}).then(()=>{
  fireToast("group Creat Sucessfully")
}).catch((err)=>{
  fireToast(err.message)
}).finally(()=>{
  setLoading(false);
  setGroupInfo({
    Grouptagname:"",
    Groupname:"",
    groupPhoto: ""
  })
  setImage("");
  closeModal();
})

  }
}


/**
 * todo fecth all group data
 */
useEffect(()=>{
  
  const AllGroupListDbRef =  Dbref(db, 'GroupList/');
  onValue(AllGroupListDbRef, (snapshot)=>{
    let AllgrouplistblankArey=[];
    snapshot.forEach((item)=>{
      if(item.val().AdminId !== auth.currentUser.uid){
        AllgrouplistblankArey.push({...item.val(),userKey: item.key});
      }else if (item.val().AdminId === auth.currentUser.uid) {
       setRecentCurrentUser({...item.val(), userKey: item.key});
      }
        // AllgrouplistblankArey.push({...item.val(),GroupKey:item.key})
      
    })
    setAllGroupList(AllgrouplistblankArey);
  })
  },[auth.currentUser.uid, db])
console.log(AllGroupList);
 /**todo all data fatch */
 
   useEffect(()=>{
   
     const GroupRWqDbRef =  Dbref(db, 'GroupRequest/');
     onValue(GroupRWqDbRef, (snapshot)=>{
       let GroupreqdbblankArey=[];
       snapshot.forEach((item)=>{
         if(item.val().whoWantToJoinGroupId === auth.currentUser.uid){
          GroupreqdbblankArey.push(
            item.val().whoWantToJoinGroupId + item.val().GroupKey
          )
         }
       })
       setGroupreqest(GroupreqdbblankArey);
     })
     },[auth.currentUser.uid, db])
   
   
/**
   * todo :GroupRequest database
   */
const handleJoin=(item)=>{
  
  set(push(Dbref(db, "GroupRequest/")), {
    ...item,
    whoWantToJoinGroupId: auth.currentUser.uid,
    whoWantToJoinGroupName: auth.currentUser.displayName,
    WhoWantToJoinGroupPhoto: auth.currentUser.photoURL,
    createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
  })
    .then(() => {
      fireToast(
        `${auth.currentUser.displayName} Want to Join Request Send To ${item.Groupname}`,
        "top-right",
      );
    })
    .then(() => {
      set(push(Dbref(db, "notification/")), {
        NotificationName: auth.currentUser.displayName,
        NotificationNamePhoto: auth.currentUser.photoURL,
        NotificationMessage: `${auth.currentUser.displayName} Send You a Group Join Request`,
        createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
      });
    });
}
 

/**todo cropimage */
const onChange = (e) => {
  e.preventDefault();
  let files;
  if (e.dataTransfer) {
    files = e.dataTransfer.files;
  } else if (e.target) {
    files = e.target.files;
  }
  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result );
  };
  reader.readAsDataURL(files[0]);
};

/**crop image data */
const getCropData = () => {
  if (typeof cropperRef.current?.cropper !== "undefined") {
    // setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    setGroupInfo({
      ...GroupInfo,
      groupPhoto:cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
    })
    fireToast("Image Croping Done")
    
  }
}
  return (
  <div>
      
   <div className=' items-center '>
   <div className='w-[427px] mt-10 items-center'>
   <div className='flex justify-between  my-5'>
   <button type="button" className="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-btn-color rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
<FaUsers className='text-2xl mr-2'/>
<span className="sr-only">Notifications</span>
Groups List
  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500   rounded-full -top-2 -end-2 ">{AllGroupList.length>0 ? AllGroupList.length: 0}</div>
</button>
            <button type="button" className="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-btn-color rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={HandleOpenModal}>


Create Group
  
</button>
        </div>
   <div className='rounded-2xl mt-2 w-[427px]    shadow-xl h-[347px] overflow-y-auto  scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300' >
       
       <div className='grid-cols-1 divide-y '>
{AllGroupList?.map((item)=>(
 <div className='flex items-center  justify-between px-8 py-5  '>
 <div className='w-[70px] h-[70px] cursor-pointer'>
    <picture>
      <img src={item.GroupPhoto} alt={p1} className='w-full h-full object-cover rounded-full  shadow-lg' />
    </picture>
  </div>
  <div className=' w-[60%] flex flex-col items-center justify-center  text-wrap'>
    <h1 className='text-lg font-popins text-customBlack font-bold'>{item.Groupname}</h1>
    <p className=' text-[14px] font-popins opacity-70 text-customBlack font-normal '>{item.Grouptagname}</p>
  </div>
  <div>
      {Groupreqest.includes(auth.currentUser.uid + item.GroupKey) ?  <button className='text-xl font-popins  font-semibold text-white px-1 py-1 bg-btn-color rounded-lg' > Join pending
      </button> : <button className='text-xl font-popins  font-semibold text-white px-3 py-2 bg-btn-color rounded-lg' onClick={() => handleJoin(item)}>Join
      </button>}
      
  </div>
 </div>
))}
      
   
       
       </div>
       
    </div>
    {/**Modal body stucture */}
    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        
      >
        
        <div className='overflow-y-auto  scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300'>
          <div >
            <button className='flex text-white justify-center items-center  w-[34px] h-[34px]  text-sm rounded-full bg-red-600' onClick={()=> closeModal()}><ImCross />
</button>
          </div>
          <div >
            <h1 className='text-black-600 font-bold font-Nunito text-3xl flex justify-center py-2'>Group Information</h1>
            <form action="#" onSubmit={(e)=>e.preventDefault()}>
             <div className='flex flex-col gap-y-3'>
             <label htmlFor="GroupName"> Group Name <span className='text-red-500 align-text-top'>*</span></label>
              <input className='p-3 border-[1px] border-gray-200 ' value={GroupInfo.Groupname} onChange={HandleInput} type="text" id='Groupname' name='groupname' placeholder='Enter your group name'/>
             </div>
             <div className='flex flex-col gap-y-3'>
             <label htmlFor="Grouptagname"> Group Tagname <span className='text-red-500 align-text-top'>*</span></label>
              <input className='p-3 border-[1px] border-gray-200 ' value={GroupInfo.Grouptagname} onChange={HandleInput} type="text" id='Grouptagname' name='Grouptagname' placeholder='Enter your group name'/>
             </div>
            
             <div className="flex flex-col gap-y-3 ">
                <label htmlFor="groupPhoto  ">
                  GroupPhoto
                  <span className="align-text-top text-red-500">*</span>
                </label>
                <div className="flex items-center justify-between">
                  <input
                    type="file"
                    id="groupPhoto"
                    name="groupPhoto"
                    onChange={onChange}
                  />
                  <button
                    className="rounded-lg  bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-1 font-Poppins text-xl font-semibold text-white"
                    onClick={getCropData}
                  >
                    Crop Image
                  </button>
                </div>
                <div className="flex items-center justify-between gap-x-10">
                  <div className="h-[222px] w-[50%]">
                    <Cropper
                      ref={cropperRef}
                      style={{ height: "100%", width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={2}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      guides={true}
                    />
                  </div>
                  <div className="box">
                    <div className="img-preview"></div>
                  </div>
                </div>
              </div>

             
             <button onClick={HandleCreateGroup} className='mt-5 w-full bg-green-600 text-white py-8 text-white font-Nunito font-bold text-xl rounded-full  '> {Loading ? Loading && <div className=" absolute left-[21%] animate-spin h-5 w-5 mr-3 z-10  rounded-full border-t-4 border-b-4 border-yellow-400" viewBox="0 0 24 24">
    
    </div> :"Create " }Create Group </button>
            </form>
          </div>
        </div>
      </Modal>
    {/**Modal body stucture */}
   </div>
   </div>
  </div>
  )
}

export default Grouplist

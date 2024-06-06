import React, { useState } from 'react'
import Search from '../../HomeComponet/HomeComponent/HomepageCommonComponent/Search';
import { FaEllipsisVertical } from "react-icons/fa6";
import p1 from "../../../assets/1p.gif"
import p2 from "../../../assets/2p.gif"
import p3 from "../../../assets/3p.gif"
import p4 from "../../../assets/4p.gif"
import Modal from 'react-modal';
import { ImCross } from 'react-icons/im';
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
const Grouplist = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
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
/**HandleOpenModal funtionality implement */
const HandleOpenModal = ()=>{
  openModal();
  
}
  const user= [{
    id:1, image: p1, title:"Friends Reunion" , description: "Hi Guys, Wassap", button:"join",
},
{
  id:1, image: p2, title:"Friends Reunion" , description: "Hi Guys, Wassap", button:"join",
},
{
  id:1, image: p3, title:"Friends Reunion" , description: "Hi Guys, Wassap", button:"join",
},
{
  id:1, image: p4, title:"Friends Reunion" , description: "Hi Guys, Wassap", button:"join",
},
{
  id:1, image: p2, title:"Friends Reunion" , description: "Hi Guys, Wassap", button:"join",
},
{
  id:1, image: p3, title:"Friends Reunion" , description: "Hi Guys, Wassap", button:"join",
},
{
  id:1, image: p4, title:"Friends Reunion" , description: "Hi Guys, Wassap", button:"join",
},

]
  return (
  <div>
      
   <div className=' items-center '>
   <div className='w-[427px] mt-10 items-center'>
   <div className='flex justify-between  my-5'>
            <h1 className='text-xl font-popins text-customBlack font-bold'>Group List</h1>
            <button type="button" className="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-btn-color rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={HandleOpenModal}>


Group List
  
</button>
        </div>
   <div className='rounded-2xl mt-2 w-[427px]    shadow-xl h-[347px] overflow-y-auto  scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300' >
       
       <div className='grid-cols-1 divide-y '>
{user?.map((item)=>(
 <div className='flex items-center  justify-between px-8 py-5  '>
 <div className='w-[70px] h-[70px] cursor-pointer'>
    <picture>
      <img src={item.image} alt={p1} className='w-full h-full object-cover rounded-full  shadow-lg' />
    </picture>
  </div>
  <div className=' w-[60%] flex flex-col items-center justify-center  text-wrap'>
    <h1 className='text-lg font-popins text-customBlack font-bold'>{item.title}</h1>
    <p className=' text-[14px] font-popins opacity-70 text-customBlack font-normal '>{item.description}</p>
  </div>
  <div>
    <button className='text-xl font-popins  font-semibold text-white px-5 py-2 bg-btn-color rounded-lg'>Join</button>
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
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
        <div>
          <div className=''>
            <button className='flex text-white justify-center items-center  w-[34px] h-[34px]  text-sm rounded-full bg-red-600' onClick={()=> closeModal()}><ImCross />
</button>
          </div>
          <div >
            <h1 className='text-black-600 font-bold font-Nunito text-3xl flex justify-center p-8'>Group Information</h1>
            <form action="#">
             <div className='flex flex-col gap-y-3'>
             <label htmlFor="GroupName"> Group Name <span className='text-red-500 align-text-top'>*</span></label>
              <input className='p-3 border-[1px] border-gray-200 ' type="text" id='Groupname' name='groupname' placeholder='Enter your group name'/>
             </div>
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

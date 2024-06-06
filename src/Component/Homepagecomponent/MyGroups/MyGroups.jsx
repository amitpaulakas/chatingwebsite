import React from 'react'
import Search from '../../HomeComponet/HomeComponent/HomepageCommonComponent/Search';
import { FaEllipsisVertical } from "react-icons/fa6";
import p1 from "../../../assets/1p.gif"
import p2 from "../../../assets/2p.gif"
import p3 from "../../../assets/3p.gif"
import p4 from "../../../assets/4p.gif"

const Friends = () => {
  const mygroups= [{
    id:1, image: p1, title:"Raghav" , description: "Dinner?", button:"Today, 8:56pm",active:false,
},
{
  id:2, image: p2, title:"Swathi" , description: "Sure!", button:"Today, 2:31pm",active:false,
},
{
  id:3, image: p3, title:"Kiran" , description: "Hi.....", button:"Yesterday, 6:22pm",active:true,
},
{
  id:4, image: p4, title:"Tejeshwini C" , description: "I will call him today.", button:"Today, 12:22pm",active:false,
},
// {
//   id:5, image: p2, title:"Friends Reunion" , description: "Hi Guys, Wassap", button:"join",active:true,
// },
// {
//   id:6, image: p3, title:"Friends Reunion" , description: "Hi Guys, Wassap", button:"join",active:true,
// },
// {
//   id:7, image: p4, title:"Friends Reunion" , description: "Hi Guys, Wassap", button:"join",active:true,
// },

]
  
  return (
    <div className='self-end '>
         <div className=' items-center '>
   <div className='w-[427px] mt-10 items-center'>
   <div className='flex justify-between   my-5'>
            <h1 className=' mr-25 text-xl font-popins text-customBlack font-bold'>My Groups</h1>
            <span>
<FaEllipsisVertical className=' text-2xl text-btn-color'/>
            </span>
        </div>
 
    <div  className='rounded-2xl mt-2 w-[427px]    shadow-xl h-[147px] overflow-y-auto  scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300' >
       
    <div className='grid-cols-1 divide-y '>

{mygroups?.map((item)=>(
    <div key={item.id} className='flex items-center  justify-between px-8 py-5  '>
    <div className='w-[70px] h-[70px] cursor-pointer relative '>
     <picture>
       <img src={item.image} alt={item.image} className='w-full h-full object-cover rounded-full  shadow-lg' />
     </picture>
    {item.active && (
         <span class="absolute right-0 bottom-1 flex h-3 w-3">
         <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
         <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
         </span>
    )}
    </div>
    <div className=' w-[40%] flex flex-col items-start justify-center  text-wrap'>
     <h1 className='text-xl font-popins text-customBlack font-bold'>
          {item.title ?  item.title: "Unkhown Name"} 
        </h1>
     <p className=' text-[18px] font-popins opacity-70 text-customBlack font-normal '>{item.description ?  item.description: "text Missing"} </p>
    </div>
    <div>
     <div className='text-sm font-popins  font-semibold text-black-500 opacity-75 px-5 py-2  rounded-lg'>Today 8.00pm</div>
    </div>
    </div>
    
)) }
   

    
    </div>
    
 </div>
 
   </div>
   </div>
    </div>
  )
}

export default Friends

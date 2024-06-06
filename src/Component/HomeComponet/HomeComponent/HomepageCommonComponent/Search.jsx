import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
const Search = ({className}) => {
  return (
    <div className=''>
         <div className={` relative ${className}`}>
      <input className={`${className} py-3 pl-12  border-2 shadow-xl rounded-xl`} type="text" placeholder='Search' name='Search' id='Search' />
      <span className='absolute top-1/2 left-3 -translate-y-1/2'>
        <FaSearch className='text-2xl'/>
      </span>
      <span className='absolute top-1/2  right-3 -translate-y-1/2'>
        <FaEllipsisVertical className='text-2xl'/>
      </span>
      </div>
    </div>
  )
}

export default Search

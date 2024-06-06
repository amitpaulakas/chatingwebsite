import React from 'react'

const input = () => {
  return (
    <div>
      <div className='my-10'>
   <label htmlFor="email" className='font-semibold text-sm text-customBlack opasity-50 font-Nunito'>Email Address</label>
    <input type="e-mail" placeholder='name@gmail.com' id="email" name='email'  autoComplete='off'  className='w-full  py-[22px] rounded-lg px-4 border-2  border-red-200 display: block'/>
   </div>
    </div>
  )
}

export default input

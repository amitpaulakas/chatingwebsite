import React from 'react'
import RightPicture from "../../../../assets/Login.jpg"

const LoginRight = () => {
  return (
    <div className='w-[50%]'>
      <picture>
        <img className='w-full  '  src={RightPicture} alt={RightPicture} />
      </picture>
    </div>
  )
}

export default LoginRight

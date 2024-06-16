import React from 'react'
import LoginLeft from './LoginComponent/LoginLeft'
import LoginRight from './LoginComponent/LoginRight'

const LogIn = () => {
  return (
    <div className='flex h-[100vh] overflow-hidden'>
      <LoginLeft/>
      <LoginRight  className="w-45%" />

    </div>
  )
}

export default LogIn

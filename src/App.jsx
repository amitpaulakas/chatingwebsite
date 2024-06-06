import React from 'react'
import SignUp from "./Pages/SignUp"
import Home from "./Pages/Home"
import LoginPage from './Pages/LoginPage';
import Rejistration from './Component/Rejistration/Rejistration';
import EmailVerified from './Component/HomeComponet/EmailVerified';
import ChatPage from './Pages/ChatPage';
import NotificationpAge from './Pages/NotificationpAge';
import SettingPage from './Pages/SettingPage';
import ChatHonePage from './Pages/ChatHonePage';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer, } from 'react-toastify';


const router =  createBrowserRouter(
  createRoutesFromElements(
   < Route>
   <Route path='/singup' element={<SignUp/>}/>
   <Route path='/chating-app/' element={<SignUp/>}/>
   <Route path='/singup' element={<SignUp/>}/>
   <Route path='/' element={<SignUp/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/home' element={<Home/>}>
    <Route  path='/home' element={<ChatHonePage/>}/>
    <Route index path='chathome' element={<ChatHonePage/>}/>
    <Route path='message' element={<ChatPage/>}/>
    <Route path='notification' element={<NotificationpAge/>}/>
    <Route path='settings' element={<SettingPage/>}/>
    </Route>
    <Route path='/Email-Verified' element={<EmailVerified/>}/>
  
    {/* <Route path='/Regestration' element={<Rejistration/>}/> */}
    <Route path='/*' element={ <h1>this is error page</h1> }/>
   </Route> 
  )
)
const App = () => {
  return (
    <div>
     <div>
     <ToastContainer />
     <div>
     <RouterProvider router={router}></RouterProvider>
     </div>
     </div>
    </div>
  )
}

export default App

import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import { getAuth,GoogleAuthProvider ,signInWithPopup,  signInWithEmailAndPassword } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { getDatabase, push, ref, set } from "firebase/database";
import moment from 'moment';

const LoginLeft = () => {
    const navigate = useNavigate()
    const [Eye , setEye] = useState(false);
    const auth = getAuth();
    const db = getDatabase();
    const time = moment().format("MM/DD/YYYY, h:mm:ss a");
    const provider = new GoogleAuthProvider();
    const [Loading , setLoading] = useState(false);
    const [inputValue , setinputValue]= useState({
        email:"",
        Password:"",

    });
   const [error, setError]= useState({
    emailError: "",
    PasswordError: "",

   })
    const handleSubmit = (event)=> {
        event.preventDefault()
    }
    console.log(time);
//HandleWithGoogle funtionality
const HandleWithGoogle = async() => {
try{
    const result = await signInWithPopup(auth,provider);
    const credential = GoogleAuthProvider.credentialFromResult(result); const user = result.user;
    if (user){
        console.log("update Profile");
        console.log(user.reloadUserInfo);
        const {localId, email, displayName, photoUrl}= user.reloadUserInfo;
        const dbRef =  ref(db, 'users/');
        set(push(dbRef), {
            username: displayName,
            email,
            uid: localId,
            profile_picture:photoUrl,
            createAtDate:time,
            
          }).then(()=>{
            console.log(" data Uploaded done");
            navigate("/home/chathome");
          }).catch((error) => {
            console.log("error from update profile",error);
          });
    //    completed google realtime authentication
    
    }
}catch (error){
    console.log(error.message);
}
};
//state input 
//HandleInputField functionality implement
const HandleInputField =(e)=>{
    setinputValue({
        ...inputValue,
        [e.target.id]: e.target.value,
    })
    
}
//regex for checking password
const EmailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3}$/;
const securityReges = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
//HandleSignUp funtion implementation
const HandlaSingup = () =>{
if (!inputValue.email){
    setError({
...error,
emailError:"email Missing, Type Your Email"
    })
}else if(!EmailRegex.test(inputValue.email)){
    setError({
        ...error,
        emailError:"type your valid email"
            })
}else if(!inputValue.Password){
    setError({
        ...error,
        PasswordError:"Please Type your password"
            })
}else if (!securityReges.test(inputValue.Password)){
    setError({
        ...error,
        PasswordError:"❗Atlist type 8 characters , uppercase &1lowercase ,character1 number"
            })
}else{ 
    setLoading(true)
    console.log("everything is ok");
    setinputValue({
        email:"",
        Password:"",
    })
    setError({
        ...error,
        PasswordError:"",
        emailError:"",
            })
           
            signInWithEmailAndPassword(auth,inputValue.email,inputValue.Password).then((userinfo)=>{
                console.log(userinfo);
                localStorage.setItem("UserToken", userinfo._tokenResponse.idToken)
                navigate("/home/chathome")
                
            }).catch((error)=>{
console.log("error.message ", error);
            }).finally(()=>{
                console.log("hello");
                setLoading(false)
               
            })
  
}
}



  return (
    <div className='flex justify-center iteams-center items-center h-[100vh] w-[55%]'>
      <div className='w-[55%]'>
      <h1 className='text-Blue1 mb-3 font-bold text-4xl font-Nunito' >Login to your account!</h1>
        <div className='flex justify-center  border-2 border-gray-500 py-5 px-3 w-[200px] cursor-pointer hover:bg-yellow-300' onClick={HandleWithGoogle}>
            <div className='flex gap-x-3  items-center font-Nunito'>
            <FaGoogle/>
            <p className='text-[#03014c] font-semibold text-[14px] font-OpenSans'>Login with Google</p>
            </div>
        </div>
        <form  onClick={handleSubmit}>
   <div className='my-10'>
   <label htmlFor="email" className='font-semibold  text-sm text-customBlack opasity-50 font-Nunito'>Email Address</label>
    <input type="email" value={inputValue.email}  placeholder='name@gmail.com' id="email" name='email'  autoComplete='off'  
   
    className='w-full  py-[22px] rounded-lg px-4 border-b-2  border-red-200 display: block' onChange={HandleInputField}/>
   {error.emailError && (
        <span className='text-red-500 font-Nunito font-normal text-md mt-3 ml-1 block'>{error.emailError}</span>
    )}
    
   </div>
 
   <div className='my-10 relative '>
   <label htmlFor="Password"  className='font-semibold text-sm text-customBlack opasity-50 font-Nunito'>Password</label>
    <input type={Eye? "text" : "password" } value={inputValue.Password} placeholder='Type your password' id="Password" name='Password'  autoComplete='off'
    
    className='w-full  py-[22px] rounded-lg px-4 border-b-2  border-red-200 display: block' onChange={HandleInputField}/>
    {error.PasswordError && (
        <span className='text-red-500 font-Nunito font-normal text-md mt-3 ml-1 block'>{error.PasswordError}</span>
    )}
     <div className='absolute top-1/2 right-8 translate-y-[50%]' onClick={()=> setEye(!Eye)}>
        {Eye ?<FiEyeOff/>  : <FaRegEye />}

    </div>
     
    <div className='absolute top-1/2 right-8 translate-y-[50%]'>
       
    </div>
   </div>
   <button type='submit' className='w-full py-5 rounded-lg bg-btn-color text-white font-normal font-Nunito'
     onClick={HandlaSingup}>
   
  
   {Loading && <div className=" absolute left-[21%] animate-spin h-5 w-5 mr-3 z-10  rounded-full border-t-4 border-b-4 border-yellow-400" viewBox="0 0 24 24">
    
    </div> }
    
    Login to continue</button>
</form>
<div className='text-center my-5'>
    <p className='text-[#03014c] font-OpenSans'>Don't have any Account {" "}<span className='text-[#ea6c00] text-[13px] font-bold  font-OpenSans aligh  hover:underline decoration-indigo-500'> {" "}<Link to={"/SingUp"}>Sign Up</Link></span> </p>
</div>
      </div>
      <div>



 
      </div>
    </div>
  )
}

export default LoginLeft

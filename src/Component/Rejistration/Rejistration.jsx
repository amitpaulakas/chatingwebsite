import React, { useState } from 'react'
import { getAuth,updateProfile, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import { Link ,useNavigate} from "react-router-dom";
import rejistrationImg from "../../assets/rejistrarion.png"
import { FiEyeOff } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { getDatabase, push, ref, set } from "firebase/database";
import moment from 'moment';


const rejistration = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const db = getDatabase();
    const [Email , setEmail] = useState("");
    const [FullName , setFullName] = useState("");
    const [PassWord , setPassWord] = useState("");
    const [Eye , setEye] = useState(false);
    const [Loading , setLoading] = useState(false);

    // error state
    const [EmailError , setEmailError] = useState('');
    const [FullNameError , setFullNameError] = useState('');
    const [PasswordError , setPasswordError] = useState('');
   
    const handleSubmit = (event)=> {
        event.preventDefault()
    }
    
    const EmailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3}$/
    const securityReges = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
    
    // HandlaSingup funtionality 

    const HandlaSingup =  ()=>{
        if(!Email){
            setEmailError("please gives a email");
            
        } 
        else if (!EmailRegex.test(Email)){
            
            setEmailError("Email credential Missing or wrong");
        }
        else if (!FullName) {
            setFullNameError("Please enter your name")
            setEmailError('')
            
        }
        else if (!PassWord){
            setPasswordError("please enter your password")
            setFullNameError('')
        }
        else if (!securityReges.test(PassWord)){
            setPasswordError("❗Atlist type 8 characters , uppercase &1lowercase ,character1 number")
            setEmailError('')
            setFullNameError('')
        }
        else{
            setLoading(true);
            setPasswordError("");
            setFullNameError("");
            setEmailError("");
            console.log("everything is ok");
            setPassWord("")
            setFullName("")
            setEmail("")
            createUserWithEmailAndPassword(auth, Email,PassWord).then((userCredential)=>{
console.log(userCredential); 
setLoading(false);
sendEmailVerification(auth.currentUser).then(()=>{
    console.log("cheak");

    toast('🦄 Check your Mailbox!', {
        position: "top-left",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });

        updateProfile(auth.currentUser, {
            displayName: FullName, photoURL: null, 
          }).then((userInfo) => {
            console.log("update Profile");
            const dbRef =  ref(db, 'users/')
            set(push(dbRef), {
                username: auth.currentUser.displayName,
                email: auth.currentUser.email,
                uid: auth.currentUser.uid,
                profile_picture:"",
                createAtDate:moment().format("MM/DD/YYYY, h:mm:ss a"),
                // createAtDate: new Date().toLocaleDateString(),
                // createAtTime: new Date().toLocaleTimeString(),
                
              }).then(()=>{
                console.log(" data Uploaded done");
              })
           
           
          }).catch((error) => {
            console.log("error from update profile");
          });
})

            }
            ).catch((error)=>{
                if(error.message.includes("auth/email-already-in-use")){
                    toast.error(` Already Register This Email, Try another Email`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        style:{width:"30vw"}
                        });
                }else{
                    console.log(error.message);
                }
                console.log(error.message);
                
            }).finally(()=>{
                setTimeout(()=>{
                    navigate("/login")
                } ,2000)

            })
        }
       
    }


//    HandleEye fuctionality
const HandleEye = ( )=>{
    setEye(!Eye)
}
   
    // // handleinput fullname funtionality implementation
    // const Handlefullname = (event) =>{
    //     setFullName(event.target.value);
    // }
    //  // handleinput fullname funtionality implementation
    //  const HandlePassWord = (event) =>{
    //     setPassWord(event.target.value);
    // }
  return (
    <>
     <div className='flex justify-between items-center'>
     <ToastContainer />
     <div className='w-1/2  h-fullheight  flex justify-center items-center'>
<div>
<div>
<h1 className='text-Blue1 mb-3 font-bold text-4xl font-Nunito' >Get started with easily register</h1>
<p className='text-customBlack font-normal text-xl opacity-50 font-Nunito'>Free register and you can enjoy it</p>

<form onSubmit={handleSubmit}>
   <div className='my-10'>
   <label htmlFor="email" className='font-semibold text-sm text-customBlack opasity-50 font-Nunito'>Email Address</label>
    <input type="email" value={Email} placeholder='name@gmail.com' id="email" name='email'  autoComplete='off'  
    onChange={(event)=>{
        setEmail(event.target.value);
    }}
    className='w-full  py-[22px] rounded-lg px-4 border-2  border-red-200 display: block'/>
    {EmailError && (
        <span className='text-red-500 font-Nunito font-normal text-md mt-3 ml-1 block'>{EmailError}</span>
    )}
    
   </div>
   <div className='my-10'>
   <label htmlFor="Ful-name" className='font-semibold text-sm text-customBlack opasity-50 font-Nunito'>Ful-name</label>
    <input type="text" placeholder='Ful name' id="Ful-name" name='Ful-name' value={FullName} autoComplete='off' 
    onChange={(event)=>{
        setFullName(event.target.value);
    }}
      className='w-full  py-[22px] rounded-lg px-4 border-2  border-red-200 display: block'/>
       {FullNameError && (
        <span className='text-red-500 font-Nunito font-normal text-md mt-3 ml-1 block'>{FullNameError}</span>
    )}
   </div>
   <div className='my-10 relative '>
   <label htmlFor="Password"  className='font-semibold text-sm text-customBlack opasity-50 font-Nunito'>Password</label>
    <input type={Eye ? "text" : "password"} value={PassWord} placeholder='Type your password' id="Password" name='Password'  autoComplete='off'
    onChange={(event)=>{
        setPassWord(event.target.value);
    }}
    className='w-full  py-[22px] rounded-lg px-4 border-2  border-red-200 display: block'/>
     {PasswordError && (
        <span className='text-red-500 font-Nunito font-normal text-md mt-3 ml-1 block'>{PasswordError}</span>
    )}
    <div className='absolute top-1/2 right-8 translate-y-[50%]' onClick={HandleEye}>
        {Eye ?<FiEyeOff/>  : <FaRegEye />}

    </div>
   </div>
   <button type='submit' className='w-full py-5 rounded-full bg-btn-color text-white font-normal font-Nunito'
   onClick={HandlaSingup}>
   {Loading && <div className=" absolute left-[21%] animate-spin h-5 w-5 mr-3 z-10  rounded-full border-t-4 border-b-4 border-yellow-400" viewBox="0 0 24 24">
    
    </div> }
  

    Sign up</button>
</form>
<div className='text-center my-5'>
    <p className='text-[#03014c] font-OpenSans'>Already  have an account ? {" "}<span className='text-[#ea6c00] text-[13px] font-bold  font-OpenSans aligh  hover:underline decoration-indigo-500'> {" "}<Link to={'/login'}>Sign In</Link></span> </p>
</div>


</div>
</div>
     </div>
      <div className='w-1/2 bg-red-400 h-fullheight'>
        <picture>
            <img className='min-w-full h-screen ' src={rejistrationImg} alt={rejistrationImg} />
        </picture>
      </div>
      
     </div>
    </>
  )
}

export default rejistration

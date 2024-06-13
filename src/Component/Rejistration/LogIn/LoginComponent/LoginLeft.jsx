import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { FaGoogle } from 'react-icons/fa';
import { FiEyeOff } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';
import moment from 'moment';

const LoginLeft = () => {
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
  });
  const [userData, setUserData] = useState(null); // New state to hold user data
  const auth = getAuth();
  const db = getDatabase();
  const provider = new GoogleAuthProvider();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEmailLogin();
  };

  const handleEmailLogin = async () => {
    const { email, password } = inputValue;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from the database
      const userRef = ref(db, 'users/' + user.uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setUserData(snapshot.val());
        navigate('/home/chathome', { state: { userData: snapshot.val() } });
      } else {
        setError({ ...error, emailError: 'User data not found in the database' });
      }
    } catch (error) {
      setError({ ...error, emailError: error.message });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = ref(db, 'users/' + user.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // If user data exists in the database, navigate to the homepage with existing data
        setUserData(snapshot.val());
        navigate('/home/chathome', { state: { userData: snapshot.val() } });
      } else {
        // If user data does not exist, add user data to the database
        const newUserData = {
          username: user.displayName,
          email: user.email,
          uid: user.uid,
          profile_picture: user.photoURL,
          createAtDate:moment().format("MM/DD/YYYY, h:mm:ss a"),
        };
        await set(userRef, newUserData);
        setUserData(newUserData);
        navigate('/home/chathome', { state: { userData: newUserData } });
      }
    } catch (error) {
      setError({ ...error, emailError: error.message });
    }
  };

  const handleInputField = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className='flex justify-center items-center h-[100vh] w-[55%]'>
      <div className='w-[55%]'>
        <h1 className='text-Blue1 mb-3 font-bold text-4xl font-Nunito'>Login to your account!</h1>
        <div className='flex justify-center border-2 border-gray-500 py-5 px-3 w-[200px] cursor-pointer hover:bg-yellow-300' onClick={handleGoogleLogin}>
          <div className='flex gap-x-3 items-center font-Nunito'>
            <FaGoogle />
            <p className='text-[#03014c] font-semibold text-[14px] font-OpenSans'>Login with Google</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='my-10'>
            <label htmlFor="email" className='font-semibold text-sm text-customBlack opacity-50 font-Nunito'>Email Address</label>
            <input type="email" value={inputValue.email} placeholder='name@gmail.com' id="email" name='email' autoComplete='off'
              className='w-full py-[22px] rounded-lg px-4 border-b-2 border-red-200 display: block' onChange={handleInputField} />
            {error.emailError && (
              <span className='text-red-500 font-Nunito font-normal text-md mt-3 ml-1 block'>{error.emailError}</span>
            )}
          </div>

          <div className='my-10 relative '>
            <label htmlFor="password" className='font-semibold text-sm text-customBlack opacity-50 font-Nunito'>Password</label>
            <input type={eye ? 'text' : 'password'} value={inputValue.password} placeholder='Type your password' id="password" name='password' autoComplete='off'
              className='w-full py-[22px] rounded-lg px-4 border-b-2 border-red-200 display: block' onChange={handleInputField} />
            {error.passwordError && (
              <span className='text-red-500 font-Nunito font-normal text-md mt-3 ml-1 block'>{error.passwordError}</span>
            )}
            <div className='absolute top-1/2 right-8 translate-y-[50%]' onClick={() => setEye(!eye)}>
              {eye ? <FiEyeOff /> : <FaRegEye />}
            </div>
          </div>
          <button type='submit' className='w-full py-5 rounded-lg bg-btn-color text-white font-normal font-Nunito'>
            {loading && <div className="absolute left-[21%] animate-spin h-5 w-5 mr-3 z-10 rounded-full border-t-4 border-b-4 border-yellow-400"></div>}
            Login to continue
          </button>
        </form>
        <div className='text-center my-5'>
          <p className='text-[#03014c] font-OpenSans'>Don't have any Account {" "}<span className='text-[#ea6c00] text-[13px] font-bold font-OpenSans hover:underline decoration-indigo-500'><Link to={"/SignUp"}>Sign Up</Link></span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginLeft;

import { Bounce, toast } from "react-toastify";

function fireToast(msg = "message missing",position= "top-right",timeToclose= 5000,){
    toast.info(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
}

//error toast 

function fireToasterror(msg = "message missing",position= "top-right",timeToclose= 5000,){
    toast.info(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
}
export {fireToast,fireToasterror};
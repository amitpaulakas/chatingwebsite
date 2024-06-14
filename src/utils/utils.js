import { Bounce, toast } from "react-toastify";

function fireToastSucess(msg = "message missing",position= "top-right",timeToclose= 5000,){
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

function fireToastError(msg = "message missing",position= "top-right",timeToclose= 5000,){
    toast.error(msg, {
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
export {fireToastSucess,fireToastError};
import { toast } from "react-toastify";

export const successToast = (msg: string,closeTime:number|false|undefined) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: closeTime,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
}
    
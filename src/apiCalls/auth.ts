import axiosInstance from '../axiosInstance';
import { UserType } from '../types/user';

export const login = async (user : UserType) => {
    try{
        const res = await axiosInstance.post("/auth/login", user);

        if(res.data.isAdmin){
            localStorage.setItem("user", JSON.stringify(res.data));
            console.log(res.data)
        }else{
            console.log("You dont have enough priviliges to access this.")
        }
    }
    catch(error){
        console.log(error)
    }
}

export const logout = async () => {
    try{
        localStorage.removeItem("user");
    }
    catch(error){
        console.log("Error Loggin out, ", error);
    }
}
import axiosInstance from '../axiosInstance';

export const getUsers = async () => {
    try{
        const res = await axiosInstance.get("/user");
        return res.data
    }
    catch(error){
        console.log(error)
    }
}

export const deleteUser = async (id : string) => {
    try{
        await axiosInstance.delete(`/user/${id}`);
        console.log("User deleted successfully");
    }
    catch(error){
        console.log("Error deleting user ", error);
    }
}
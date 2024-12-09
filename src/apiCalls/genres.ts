import axiosInstance from '../axiosInstance';
import { GenreType } from '../types/genre';

export const getGenres = async () => {
    try{
        const res = await axiosInstance.get("/genre");
        return res.data
    }
    catch(error){
        console.log(error)
    }
}

export const createGenre = async (genre : GenreType) => {
    try{
        const res = await axiosInstance.post("/genre", genre);
        console.log(res.data);
        return res.data
    }
    catch(error){
        console.log("Error Creating Genre ", error);
    }
}

export const deleteGenre = async (id : string) => {
    try{
        await axiosInstance.delete(`/genre/${id}`);
    }
    catch(error){
        console.log(error);
    }
}
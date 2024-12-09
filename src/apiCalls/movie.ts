import axiosInstance from "../axiosInstance"
import { MovieType } from "../types/movie";

export const getMovies = async () => {
    try{
        const res = await axiosInstance.get("/movie/");
        console.log("Movies data ", res.data);
        return res.data;
    }
    catch(error){
        console.log("Error getting movies ", error);
        return [];
    }
}

export const getMovie = async (id : string) => {
    try{
        const res = await axiosInstance.get(`/movie/find/${id}`);
        console.log("Movie data ", res.data);
        return res.data;
    }
    catch(error){
        console.log("Error getting movies ", error);
        return {};
    }
}

export const createMovie = async (movie : MovieType) => {
    try{
        const res = await axiosInstance.post(`/movie/`, movie);
        
        console.log("Created movie success ", res.data);
    }
    catch(error){
        console.log("Error creating movie ", error);
    }
}

export const updateMovie = async (movie : MovieType) => {
    try{
        const res = await axiosInstance.put(`/movie/${movie._id}`, movie);
        console.log("Update Movie success ", res.data);
    }
    catch(error){
        console.log("Error updating movie ", error);
    }
}

export const deleteMovie = async (id : string) => {
    try{
        await axiosInstance.delete(`/movie/${id}`);
        console.log("Movie deleted");
    }
    catch(error){
        console.log("Error deleting movie ", error);
    }
}
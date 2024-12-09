import axiosInstance from "../axiosInstance"
import { ListType } from "../types/list";

export const getLists = async () => {
    try {
        const res = await axiosInstance.get("/lists/");
        return res.data;
    }
    catch (error) {
        console.log("Error getting lists ", error);
    }
}

export const getList = async (id: string) => {
    try {
        const res = await axiosInstance.get(`/lists/${id}`);
        return res.data;
    }
    catch (error) {
        console.log("Error getting lists ", error);
    }
}

export const createList = async (list: ListType) => {
    try {
        const res = await axiosInstance.post(`/lists/`, list);
        console.log("Created Lists ", res.data);
    }
    catch (error) {
        console.log("Error creating list ", error);
    }
}

export const updateList = async (list: ListType) => {
    try {
        const res = await axiosInstance.put(`/lists/${list._id}`, list);
        console.log(res.data);
    }
    catch (error) {
        console.log("Error updating Lists ", error);
    }
}

export const deleteList = async (id: string) => {
    try {
        await axiosInstance.delete(`/lists/${id}`);
    }
    catch (error) {
        console.log("Error Deleting Lists ", error);
    }
}
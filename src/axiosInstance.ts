import axios from "axios"

const baseURL = 
    process.env.NODE_ENV === "production"
        ? "https://movix-backend.vercel.app/api"
        : "http://localhost:8000/api"

const axiosInstance = axios.create({
    baseURL: baseURL
})

const user = localStorage.getItem("user");
const token = user ? JSON.parse(user).accessToken : null;

if (token) {
    axiosInstance.defaults.headers.common['token'] = `Bearer ${token}`;
}

export default axiosInstance;
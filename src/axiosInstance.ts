import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api"
})

const user = localStorage.getItem("user");
const token = user ? JSON.parse(user).accessToken : null;

if (token) {
    axiosInstance.defaults.headers.common['token'] = `Bearer ${token}`;
}

export default axiosInstance;
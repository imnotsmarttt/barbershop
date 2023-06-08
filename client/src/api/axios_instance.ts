import axios from "axios";
import {API_URL} from "../config";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
})

export const axiosInstanceAccessAuth = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
    },
    withCredentials: true,
})

export const axiosInstanceRefreshAuth = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('refreshToken')}`
    },
})

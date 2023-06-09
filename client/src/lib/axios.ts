import axios, {AxiosError} from "axios";
import {API_URL} from "../config";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true
})

export const getError = (error: Error | AxiosError): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data.message
    }
    return 'Помилка'
}

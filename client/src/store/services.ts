import axios, {AxiosError} from 'axios'

export const getAxiosError = (error: Error | AxiosError): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data.message
    }
    return 'Помилка'
}
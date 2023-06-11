import {AdminServicesFetchResult, AdminServicesStateType} from "types/store/admin-services";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance, getError} from "../../lib/axios";
import {AxiosError} from "axios";

const initialState: AdminServicesStateType = {
    serviceList: [],
    itemCount: 0,
    pageSize: 0,

    fetching: 'succeeded',
    error: ''
}

const adminServicesSlice = createSlice({
    name: 'adminServices',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchServiceList.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(fetchServiceList.fulfilled, (state, action) => {
                state.serviceList = action.payload.serviceList
                state.itemCount = action.payload.itemCount
                state.pageSize = action.payload.pageSize
                state.fetching = 'succeeded'
            })
            .addCase(fetchServiceList.rejected, (state, action) => {
                state.serviceList = []
                state.itemCount = 0
                state.pageSize = 0
                state.error = action.payload ? action.payload : "Помилка"
                state.fetching = 'succeeded'
            })
    }
})

export default adminServicesSlice.reducer

export const fetchServiceList = createAsyncThunk<AdminServicesFetchResult,
    { query: string },
    { rejectValue: string }>(
    'adminServices/fetch',
    async (payload, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }

            const response = await axiosInstance.get(`admin/services${payload.query}`, config)
            return response.data as AdminServicesFetchResult
        } catch (e) {
            const error = e as AxiosError || Error
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)
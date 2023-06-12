import {AdminServicesFetchResult, AdminServicesStateType} from "types/store/admin-services";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {axiosInstance, getError} from "../../lib/axios";
import {AxiosError} from "axios";
import {DeleteModalStateType} from "../../types/store/admin";

const initialState: AdminServicesStateType = {
    serviceList: [],
    itemCount: 0,
    pageSize: 0,

    deleteModal: {
        isActive: false,
        id: null,
    },
    fetching: 'succeeded',
    error: ''
}

const adminServicesSlice = createSlice({
    name: 'adminServices',
    initialState,
    reducers: {
        toggleServicesDeleteModal(state, action: PayloadAction<{ id?: number }>) {
            state.deleteModal.isActive = !state.deleteModal.isActive
            state.deleteModal.id = action.payload.id || null
        }
    },
    extraReducers: builder => {
        builder
            // fetch
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
            // delete
            .addCase(deleteService.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.serviceList = state.serviceList.filter(service => service.id !== action.payload.id)
                state.itemCount -= 1
                state.fetching = 'succeeded'
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.error = action.payload ? action.payload : "Помилка"
                state.fetching = 'succeeded'
            })
    }
})

export default adminServicesSlice.reducer

// actions
export const {toggleServicesDeleteModal} = adminServicesSlice.actions

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

export const deleteService = createAsyncThunk<{ id: number },
    { id: number },
    { rejectValue: string }>(
    'adminServices/delete',
    async (payload, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }

            await axiosInstance.delete(`admin/services/${payload.id}`, config)
            return { id: payload.id }
        } catch (e) {
            const error = e as AxiosError || Error
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)
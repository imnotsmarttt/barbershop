import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AdminEmployeeFetchResultType, AdminEmployeeStateType} from "types/store/admin-employee";
import {axiosInstance, getError} from "lib/axios";
import {AxiosError} from "axios";

const initialState: AdminEmployeeStateType = {
    employeeList: [],
    itemCount: 0,
    pageSize: 0,

    fetching: 'succeeded',
    error: ''
}

const adminEmployeeSlice = createSlice({
    name: 'adminEmployee',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchEmployeeList.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(fetchEmployeeList.fulfilled, (state, action) => {
                state.employeeList = action.payload.employeeList
                state.itemCount = action.payload.itemCount
                state.pageSize = action.payload.pageSize
                state.fetching = 'succeeded'
            })
            .addCase(fetchEmployeeList.rejected, (state, action) => {
                state.employeeList = []
                state.itemCount = 0
                state.pageSize = 0
                state.error = action.payload ? action.payload : "Помилка"
                state.fetching = 'succeeded'
            })
    }
})

export default adminEmployeeSlice.reducer

//actions
export const fetchEmployeeList = createAsyncThunk<AdminEmployeeFetchResultType,
    { query: string },
    { rejectValue: string }>(
    'adminEmployee/fetch',
    async (payload, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
            const response = await axiosInstance.get('admin/employee', config)
            return response.data as AdminEmployeeFetchResultType
        } catch (e) {
            const error = e as AxiosError || Error
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)
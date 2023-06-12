import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AdminEmployeeFetchResultType, AdminEmployeeStateType} from "types/store/admin-employee";
import {axiosInstance, getError} from "lib/axios";
import {AxiosError} from "axios";

const initialState: AdminEmployeeStateType = {
    employeeList: [],
    itemCount: 0,
    pageSize: 0,

    deleteModal: {
        isActive: false,
        id: null // deleted item id
    },
    fetching: 'succeeded',
    error: ''
}

const adminEmployeeSlice = createSlice({
    name: 'adminEmployee',
    initialState,
    reducers: {
        toggleEmployeeDeleteModal(state, action: PayloadAction<{ id?: number }>) {
            state.deleteModal.isActive = !state.deleteModal.isActive
            state.deleteModal.id = action.payload.id || null
        }
    },
    extraReducers: builder => {
        builder
            // fetch
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
            // delete
            .addCase(deleteEmployee.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                console.log(action.payload)
                state.employeeList = state.employeeList.filter(employee => employee.id !== action.payload.id)
                state.itemCount -= 1
                state.fetching = 'succeeded'

            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.error = action.payload ? action.payload : "Помилка"
                state.fetching = 'succeeded'
            })
    }
})

export default adminEmployeeSlice.reducer

//actions
export const {toggleEmployeeDeleteModal} = adminEmployeeSlice.actions

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
            const response = await axiosInstance.get(`admin/employee?${payload.query}`, config)
            return response.data as AdminEmployeeFetchResultType
        } catch (e) {
            const error = e as AxiosError || Error
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)

export const deleteEmployee = createAsyncThunk<{ id: number },
    { id: number },
    { rejectValue: string }>(
    'adminEmployee/delete',
    async (payload, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
            await axiosInstance.delete(`admin/employee/${payload.id}`, config)
            return {id: payload.id}
        } catch (e) {
            const error = e as AxiosError || Error
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    AdminBranchStateType,
    AdminEmployeeStateType,
    AdminServicesStateType,
    AdminStateType,
    AdminVisitsStateType
} from "types/store/admin";
import {axiosInstance, getError} from "lib/axios";
import {AxiosError} from "axios";


const initialState: AdminStateType = {
    visits: {
        visitList: [],
        visitCount: 0,
        pageSize: 0
    },
    services: {
        serviceList: [],
        itemCount: 0,
        pageSize: 0,
    },
    employee: {
        employeeList: [],
        itemCount: 0,
        pageSize: 0,
    },
    branch: {
        branchList: [],
        itemCount: 0,
        pageSize: 0,
    },
    fetching: 'succeeded',
    error: ''
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearVisit(state) {
            state.visits.visitList = []
            state.visits.visitCount = 0
            state.visits.pageSize = 0
        }
    },
    extraReducers: builder => {
        builder
            // visits
            .addCase(fetchVisitList.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(fetchVisitList.fulfilled, (state, action) => {
                state.visits.visitList = action.payload.visitList
                state.visits.visitCount = action.payload.visitCount
                state.visits.pageSize = action.payload.pageSize
                state.fetching = 'succeeded'
            })
            .addCase(fetchVisitList.rejected, (state, action) => {
                state.visits.visitList = []
                state.visits.visitCount = 0
                state.visits.pageSize = 0
                state.error = action.payload ? action.payload : "Помилка"
                state.fetching = 'succeeded'
            })
            // services
            .addCase(fetchServiceList.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(fetchServiceList.fulfilled, (state, action) => {
                state.services.serviceList = action.payload.serviceList
                state.services.itemCount = action.payload.itemCount
                state.services.pageSize = action.payload.pageSize
                state.fetching = 'succeeded'
            })
            .addCase(fetchServiceList.rejected, (state, action) => {
                state.services.serviceList = []
                state.services.itemCount = 0
                state.services.pageSize = 0
                state.error = action.payload ? action.payload : "Помилка"
                state.fetching = 'succeeded'
            })
            // employee
            .addCase(fetchEmployeeList.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(fetchEmployeeList.fulfilled, (state, action) => {
                state.employee.employeeList = action.payload.employeeList
                state.employee.itemCount = action.payload.itemCount
                state.employee.pageSize = action.payload.pageSize
                state.fetching = 'succeeded'
            })
            .addCase(fetchEmployeeList.rejected, (state, action) => {
                state.employee.employeeList = []
                state.employee.itemCount = 0
                state.employee.pageSize = 0
                state.error = action.payload ? action.payload : "Помилка"
                state.fetching = 'succeeded'
            })
            // branch
            .addCase(fetchBranchList.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(fetchBranchList.fulfilled, (state, action) => {
                state.branch.branchList = action.payload.branchList
                state.branch.itemCount = action.payload.itemCount
                state.branch.pageSize = action.payload.pageSize
                state.fetching = 'succeeded'
            })
            .addCase(fetchBranchList.rejected, (state, action) => {
                state.branch.branchList = []
                state.branch.itemCount = 0
                state.branch.pageSize = 0
                state.error = action.payload ? action.payload : "Помилка"
                state.fetching = 'succeeded'
            })
    }
})

export default adminSlice.reducer

// actions

// VISITS
export const fetchVisitList = createAsyncThunk<AdminVisitsStateType,
    { query: string }, { rejectValue: string }>(
    'admin/fetchVisitList',
    async (payload, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
            const response = await axiosInstance.get(`admin/visits?${payload.query}`, config)
            return {...response.data} as AdminVisitsStateType
        } catch (e) {
            const error = e as AxiosError || Error
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)

// SERVICES
export const fetchServiceList = createAsyncThunk<AdminServicesStateType,
    { query: string },
    { rejectValue: string }>(
    'admin/fetchServiceList',
    async (payload, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }

            const response = await axiosInstance.get(`admin/services${payload.query}`, config)
            return response.data as AdminServicesStateType
        } catch (e) {
            const error = e as AxiosError || Error
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)

// EMPLOYEE
export const fetchEmployeeList = createAsyncThunk<AdminEmployeeStateType,
    { query: string },
    { rejectValue: string }>(
    'admin/fetchEmployeeList',
    async (payload, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
            const response = await axiosInstance.get('admin/employee', config)
            return response.data as AdminEmployeeStateType
        } catch (e) {
            const error = e as AxiosError || Error
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)

// SLICE
export const fetchBranchList = createAsyncThunk<AdminBranchStateType,
    { query: string },
    { rejectValue: string }>(
    'admin/fetchBranchList',
    async (payload, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
            const response = await axiosInstance.get('admin/branch', config)
            return response.data as AdminBranchStateType
        } catch (e) {
            const error = e as AxiosError || Error
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)
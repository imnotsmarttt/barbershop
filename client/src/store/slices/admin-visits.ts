import {AdminVisitsFetchResultType, AdminVisitsStateType} from "types/store/admin-visits";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance, getError} from "lib/axios";
import {AxiosError} from "axios";

const initialState: AdminVisitsStateType = {
    visitList: [],
    visitCount: 0,
    pageSize: 0,
    fetching: 'succeeded',
    error: ''
}

const adminVisitsSlice = createSlice({
    name: 'adminVisits',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchVisitList.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(fetchVisitList.fulfilled, (state, action) => {
                state.visitList = action.payload.visitList
                state.visitCount = action.payload.visitCount
                state.pageSize = action.payload.pageSize
                state.fetching = 'succeeded'
            })
            .addCase(fetchVisitList.rejected, (state, action) => {
                state.visitList = []
                state.visitCount = 0
                state.pageSize = 0
                state.error = action.payload ? action.payload : "Помилка"
                state.fetching = 'succeeded'
            })
    }
})

export default adminVisitsSlice.reducer

// actions
export const fetchVisitList = createAsyncThunk<AdminVisitsFetchResultType,
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
            return {...response.data} as AdminVisitsFetchResultType
        } catch (e) {
            const error = e as AxiosError || Error
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AdminStateType, AdminVisitsStateType} from "../../types/store/admin-state-types";
import {getAxiosError} from "../services";
import axios, {AxiosError} from "axios";
import {API_URL} from "../../config";


const initialState: AdminStateType = {
    visits: {
        visitList: [],
        visitCount: 0,
        pageSize: 0
    },
    fetching: 'succeeded',
    error: ''
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
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
    }
})

export default adminSlice.reducer

// actions
export const fetchVisitList = createAsyncThunk<
    AdminVisitsStateType,
    {query: string}, { rejectValue: string }>(
    'admin/fetchVisitList',
    async (payload, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
            const response = await axios.get(`${API_URL}admin/visits?${payload.query}`, config)
            return {...response.data} as AdminVisitsStateType
        } catch (e) {
            const error = e as Error | AxiosError
            return thunkAPI.rejectWithValue(getAxiosError(error))
        }
    }
)
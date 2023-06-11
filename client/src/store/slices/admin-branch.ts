import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AdminBranchFetchResultType, AdminBranchStateType} from "types/store/admin-branch";
import {axiosInstance, getError} from "lib/axios";
import {AxiosError} from "axios";

const initialState: AdminBranchStateType = {
    branchList: [],
    itemCount: 0,
    pageSize: 0,

    fetching: 'succeeded',
    error: ''
}

const adminBranchSlice = createSlice({
    name: 'adminBranch',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchBranchList.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(fetchBranchList.fulfilled, (state, action) => {
                state.branchList = action.payload.branchList
                state.itemCount = action.payload.itemCount
                state.pageSize = action.payload.pageSize
                state.fetching = 'succeeded'
            })
            .addCase(fetchBranchList.rejected, (state, action) => {
                state.branchList = []
                state.itemCount = 0
                state.pageSize = 0
                state.error = action.payload ? action.payload : "Помилка"
                state.fetching = 'succeeded'
            })
    }
})

export default adminBranchSlice.reducer
// actions
export const fetchBranchList = createAsyncThunk<AdminBranchFetchResultType,
    { query: string },
    { rejectValue: string }>(
    'adminBranch/fetch',
    async (payload, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
            const response = await axiosInstance.get('admin/branch', config)
            return response.data as AdminBranchFetchResultType
        } catch (e) {
            const error = e as AxiosError || Error
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)
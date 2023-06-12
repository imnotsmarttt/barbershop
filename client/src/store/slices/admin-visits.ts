import {AdminVisitsFetchResultType, AdminVisitsStateType} from "types/store/admin-visits";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {axiosInstance, getError} from "lib/axios";
import {AxiosError} from "axios";

const initialState: AdminVisitsStateType = {
    visitList: [],
    visitCount: 0,
    pageSize: 0,

    deleteModal: {
        isActive: false,
        id: null // deleted item id
    },
    fetching: 'succeeded',
    error: ''
}

const adminVisitsSlice = createSlice({
    name: 'adminVisits',
    initialState,
    reducers: {
        toggleVisitsDeleteModal(state, action: PayloadAction<{ id?: number }>) {
            state.deleteModal.isActive = !state.deleteModal.isActive
            state.deleteModal.id = action.payload.id || null
        }
    },
    extraReducers: builder => {
        builder
            // fetch
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
            // delete
            .addCase(deleteVisit.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(deleteVisit.fulfilled, (state, action) => {
                state.visitList = state.visitList.filter(visit => visit.id !== action.payload.id)
                state.visitCount -= 1
                state.fetching = 'succeeded'
            })
            .addCase(deleteVisit.rejected, (state, action) => {
                state.error = action.payload ? action.payload : "Помилка"
                state.fetching = 'succeeded'
            })
    }
})

export default adminVisitsSlice.reducer

// actions
export const {toggleVisitsDeleteModal} = adminVisitsSlice.actions

export const fetchVisitList = createAsyncThunk<AdminVisitsFetchResultType,
    { query: string }, { rejectValue: string }>(
    'adminVisits/fetch',
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

export const deleteVisit = createAsyncThunk<{ id: number },
    { id: number },
    { rejectValue: string }>(
    'adminVisits/delete',
    async (payload, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
            await axiosInstance.delete(`admin/visits/${payload.id}`, config)
            return { id: payload.id }
        } catch (e) {
            const error = e as AxiosError || Error
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "../../types/auth-types";
import axios, {AxiosError} from 'axios'
import {API_URL} from "../../config";
import {getAxiosError} from "../services";

interface AuthStateType {
    isAuth: boolean
    accessToken: string | null,
    refreshToken: string | null,
    user: UserType | {},
    fetching: 'pending' | 'succeeded',
    error: string
}

interface AuthSuccessActionType {
    accessToken: string,
    refreshToken: string,
    user: UserType
}


const initialState: AuthStateType = {
    isAuth: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    fetching: 'succeeded',
    error: ''
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleFetching(state) {
            if (state.fetching === 'succeeded') {
                state.fetching = 'pending'
            }
        },
        logout(state) {
            state.fetching = 'pending'
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')

            state.isAuth = false
            state.accessToken = null
            state.refreshToken = null
            state.user = {}
            state.fetching = 'succeeded'

        },
        setError(state, action) {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder
            // login
            .addCase(login.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(login.fulfilled, (state, action) => {
                const {accessToken, refreshToken, user} = action.payload
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
                localStorage.setItem('user', JSON.stringify(user))

                state.isAuth = true
                state.accessToken = accessToken
                state.refreshToken = refreshToken
                state.user = user
                state.fetching = 'succeeded'

            })
            .addCase(login.rejected, (state, action) => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
                console.log(action.payload)
                state.isAuth = false
                state.error = action.payload ? action.payload : 'Помилка'
                state.accessToken = null
                state.refreshToken = null
                state.user = {}
                state.fetching = 'succeeded'

            })
            // register
            .addCase(registerThunk.pending, (state) => {
                state.error = ''
                state.fetching = 'pending'
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                if (state.fetching === 'pending') {
                    const {accessToken, refreshToken, user} = action.payload
                    localStorage.setItem('accessToken', accessToken)
                    localStorage.setItem('refreshToken', refreshToken)
                    localStorage.setItem('user', JSON.stringify(user))

                    state.isAuth = true
                    state.accessToken = accessToken
                    state.refreshToken = refreshToken
                    state.user = user
                    state.fetching = 'succeeded'
                }
            })
            .addCase(registerThunk.rejected, (state, action) => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')

                state.isAuth = false
                state.error = action.payload ? action.payload : 'Помилка'
                state.accessToken = null
                state.refreshToken = null
                state.user = {}
                state.fetching = 'succeeded'
            })
    }
})

export default authSlice.reducer

// selectors

// actions
export const {logout, toggleFetching, setError} = authSlice.actions

export const login = createAsyncThunk<AuthSuccessActionType,
    { username: string, password: string },
    { rejectValue: string }>(
    'auth/login',
    async (payload, thunkAPI) => {
        try {
            const data = {
                username: payload.username,
                password: payload.password
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await axios.post(`${API_URL}auth/login`, data, config)
            return response.data as AuthSuccessActionType
        } catch (e) {
            const error = e as Error | AxiosError
            return thunkAPI.rejectWithValue(getAxiosError(error))
        }
    }
)

export const registerThunk = createAsyncThunk<AuthSuccessActionType,
    { username: string, password: string, password2: string },
    { rejectValue: string }>(
    'auth/register',
    async (payload, thunkAPI) => {
        try {
            const data = {
                username: payload.username,
                password: payload.password,
                password2: payload.password2
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await axios.post(`${API_URL}auth/register`, data, config)
            return response.data as AuthSuccessActionType
        } catch (e) {
            const error = e as Error | AxiosError
            return thunkAPI.rejectWithValue(getAxiosError(error))
        }
    }
)


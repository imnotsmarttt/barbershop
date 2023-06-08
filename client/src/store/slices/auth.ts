import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserType} from "../../types/auth-types";
import {getError} from "../services";
import {axiosInstance} from "../../api/axios_instance";
import {AxiosError} from "axios";

interface AuthStateType {
    isAuth: boolean
    accessToken: string | null,
    refreshToken: string | null,
    user: UserType | null,
    fetching: 'pending' | 'succeeded',
    error: string
}

export interface AuthSuccessActionType {
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
            state.user = null
            state.fetching = 'succeeded'

        },
        refreshTokens(state, action) {
            console.log(action.payload)
            const {accessToken, refreshToken, user} = action.payload
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            localStorage.setItem('user', JSON.stringify(user))

            state.isAuth = true
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.user = user
            state.fetching = 'succeeded'
        },
        setError(state, action) {
            state.error = action.payload.error
        },
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

                state.isAuth = false
                state.error = action.payload ? action.payload : 'Помилка'
                state.accessToken = null
                state.refreshToken = null
                state.user = null
                state.fetching = 'succeeded'

            })
            // refresh tokens
            .addCase(refreshTokensThunk.fulfilled, (state, action) => {
                const {accessToken, refreshToken, user} = action.payload
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
                localStorage.setItem('user', JSON.stringify(user))

                state.isAuth = true
                state.accessToken = accessToken
                state.refreshToken = refreshToken
                state.user = user
            })
            .addCase(refreshTokensThunk.rejected, (state) => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')

                state.isAuth = false
                state.accessToken = null
                state.refreshToken = null
                state.user = null
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
                state.user = null
                state.fetching = 'succeeded'
            })
            // checkAuth
            .addCase(checkAuth.rejected, (state) => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')

                state.isAuth = false
                state.accessToken = null
                state.refreshToken = null
                state.user = null
            })
    }
})

export default authSlice.reducer

// selectors

// actions
export const {logout, toggleFetching, setError, refreshTokens} = authSlice.actions

export const login = createAsyncThunk<AuthSuccessActionType,
    { username: string, password: string },
    { rejectValue: string }>(
    'auth/login',
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`auth/login`, {
                username: payload.username,
                password: payload.password
            })
            return response.data as AuthSuccessActionType
        } catch (e) {
            const error = e as Error | AxiosError
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)

export const registerThunk = createAsyncThunk<AuthSuccessActionType,
    { username: string, password: string, password2: string },
    { rejectValue: string }>(
    'auth/register',
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`auth/register`, {
                username: payload.username,
                password: payload.password,
                password2: payload.password2
            })
            return response.data as AuthSuccessActionType
        } catch (e) {
            const error = e as Error | AxiosError
            return thunkAPI.rejectWithValue(getError(error))
        }
    }
)

export const refreshTokensThunk = createAsyncThunk<AuthSuccessActionType>(
    'auth/refreshTokens',
    async () => {
        const response = await axiosInstance.get('auth/refresh', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('refreshToken')}`
            }
        })
        return response.data
    }
)

export const checkAuth = createAsyncThunk<AuthSuccessActionType>(
    'auth/checkAuth',
    async () => {
        const response = await axiosInstance.get('auth/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data as AuthSuccessActionType
    }
)


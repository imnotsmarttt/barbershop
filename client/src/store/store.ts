import { configureStore } from '@reduxjs/toolkit'

import AuthReducer from './slices/auth'

const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
})

// @ts-ignore
window.store = store

export default store

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch


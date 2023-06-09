import { configureStore } from '@reduxjs/toolkit'

import AuthReducer from './slices/auth'
import AdminReducer from './slices/admin'

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        admin: AdminReducer
    }
})

// @ts-ignore
window.store = store

export default store

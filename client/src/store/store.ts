import {combineReducers, configureStore} from '@reduxjs/toolkit'

import AuthReducer from './slices/auth'
import AdminVisitsReducer from './slices/admin-visits'
import AdminServicesReducer from './slices/admin-services'
import AdminEmployeeReducer from './slices/admin-employee'
import AdminBranchReducer from './slices/admin-branch'

const adminReducers = combineReducers({
    visits: AdminVisitsReducer,
    services: AdminServicesReducer,
    employee: AdminEmployeeReducer,
    branch: AdminBranchReducer
})


const store = configureStore({
    reducer: {
        auth: AuthReducer,
        admin: adminReducers
    }
})

// @ts-ignore
window.store = store

export default store

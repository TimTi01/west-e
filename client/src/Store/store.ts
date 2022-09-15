import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { employeesApi } from "../services/employeesApi"

const rootReducer = combineReducers({
    [employeesApi.reducerPath]: employeesApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV === 'development',
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(
              employeesApi.middleware
            )
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
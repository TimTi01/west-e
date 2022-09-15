import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { educationsApi } from "../services/educationsApi"
import { employeesApi } from "../services/employeesApi"
import { postsApi } from "../services/postsApi"

const rootReducer = combineReducers({
    [employeesApi.reducerPath]: employeesApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [educationsApi.reducerPath]: educationsApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV === 'development',
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(
              employeesApi.middleware,
              postsApi.middleware,
              educationsApi.middleware
            )
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { userApi } from "./services/userApi"
import { parcelApi } from "./services/parcelApi"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import userReducer from "./features/userSlice"
import { loginApi } from "./services/loginApi"
import coordenadaReducer from "./features/coordenadaSlice"
import parcelReducer from "./features/parcelSlice"
import errorReducer from "./features/errorSlice"
import { contactApi } from "./services/contactApi"

const rootReducer = combineReducers({
  user: userReducer,
  coordenada: coordenadaReducer,
  parcelas: parcelReducer,
  error: errorReducer,
  [userApi.reducerPath]: userApi.reducer,
  [parcelApi.reducerPath]: parcelApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  // Agrega más reducers aquí
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, parcelApi.middleware, contactApi.middleware])
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

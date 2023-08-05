/* eslint-disable prettier/prettier */
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"
import { AuthReducer, setAuthKey, setField } from "./slice/auth"
import { GlobalReducer, setGlobalKey } from "./slice/global"

const reducer = combineReducers({
  auth: AuthReducer,
  global: GlobalReducer,
})

export const store = configureStore({
  reducer,
  devTools: import.meta.env.PROD === false,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat()
  },
})

export { setAuthKey, setField, setGlobalKey }

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

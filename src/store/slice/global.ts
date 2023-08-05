/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { State } from "../../model/application/state"
import { Global } from "../../model/application/payload"

const initialState: State.Global = {
  menuCollapsed: false,
}

const GlobalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalKey: (state, action: PayloadAction<Global>) => {
      const key: keyof State.Global = action.payload.key
      state = {
        ...state,
        [key]: action.payload.value,
      }
      return state
    },
  },
})

export const { setGlobalKey } = GlobalSlice.actions

export const GlobalReducer = GlobalSlice.reducer

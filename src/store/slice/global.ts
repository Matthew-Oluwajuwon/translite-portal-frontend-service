/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { State } from "../../model/application/state"
import { Global } from "../../model/application/payload"
import { MENU_KEYS } from "../../common/constants"

const initialState: State.Global = {
  menuCollapsed: false,
  selectedKey: MENU_KEYS.DASHBOARD,
  expand: false,
  showLogoutModal: false,
  openMenuDrawer: false,
  openKey: MENU_KEYS.CONFIGURATIONS,
  terminal: {
    isSingleCreation: false,
    showCreateModal: false
  }
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
    setAllGlobalKey: (state, action: PayloadAction<State.Global>) => {
      state = action.payload as any;
      return state;
    }
  },
})

export const { setGlobalKey, setAllGlobalKey } = GlobalSlice.actions

export const GlobalReducer = GlobalSlice.reducer

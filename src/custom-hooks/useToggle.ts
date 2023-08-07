/* eslint-disable prettier/prettier */
import { useCallback } from "react"
import { State } from "../model/application/state"
import { AppDispatch, setGlobalKey } from "../store"

const useToggle = (state: State.Global, dispatch: AppDispatch) => {
  const toggleMenu = useCallback(() => {
    dispatch(
      setGlobalKey({
        key: "menuCollapsed",
        value: !state.menuCollapsed,
      }),
    )
  }, [dispatch, state.menuCollapsed])
  return {
    toggleMenu,
  }
}

export default useToggle

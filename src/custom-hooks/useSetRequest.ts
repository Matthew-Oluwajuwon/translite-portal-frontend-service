/* eslint-disable prettier/prettier */
import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setAllGlobalKey } from "../store"

const useSetRequest = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })

  const setFieldChange = useCallback(
    (key: any, value: any) => {
      dispatch(
        setAllGlobalKey({
          ...state,
          request: {
            ...state.request,
            [key]: value,
          },
        }),
      )
    },
    [dispatch, state],
  )

  return {
    setFieldChange,
  }
}

export default useSetRequest

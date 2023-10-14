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

  const setFormRequest = useCallback(
    (
      value: any,
      key: keyof any,
      options: any = [],
      key2: string | undefined = undefined,
      removeValuekey?: string | undefined,
    ) => {
      dispatch(
        setAllGlobalKey({
          ...state,
          request: {
            ...state?.request,
            [key]: value,
            [key2?.length ? (key2 as string) : (undefined as any)]:
              options.filter((x: any) => x.id === value)[0]?.id,

            [removeValuekey as string]: undefined,
          },
        }),
      )
    },
    [dispatch, state],
  )

  return {
    setFieldChange,
    setFormRequest,
  }
}

export default useSetRequest

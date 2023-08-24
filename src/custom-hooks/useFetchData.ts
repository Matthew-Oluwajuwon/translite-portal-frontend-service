/* eslint-disable prettier/prettier */

import { ApiResponse } from "model/client/response"
import { useCallback, useEffect } from "react"
import { setAllGlobalKey, useGetDataQuery } from "../store"
import { useAppDispatch, useAppSelector } from "../store/hooks"

const useFetchData = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  const { data, isLoading, isError } = useGetDataQuery(state)

  const handleGetDataResponse = useCallback(() => {
    if (data && !isLoading && !isError) {
      const response: ApiResponse.API = data.data
      dispatch(
        setAllGlobalKey({
          ...state, 
          response,
          searchResponse: response,
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch, isError, isLoading])

  useEffect(() => {
    handleGetDataResponse()
  }, [handleGetDataResponse])
  

  return {
    data,
    isLoading,
  }
}

export default useFetchData

/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useLayoutEffect, useState } from "react"
import { apiEndpoints } from "../store/apiEndpoints"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import dayjs from "dayjs"
import { setAllGlobalKey, useGetDataQuery, useSendDataMutation } from "../store"
import useSetRequest from "./useSetRequest"
import { FORM_METHODS } from "@common/constants"

const useGetDashboardData = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })

  const { setFieldChange } = useSetRequest()
  const [sendData, { data, isLoading }] = useSendDataMutation()
  const [skip, setSkip] = useState(true)
  
  useLayoutEffect(() => {
      const getUrl =
        apiEndpoints.transaction.dashboardDay +
        (state.request?.day
          ? dayjs(state.request?.day).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"))

    const updatedState = {
      ...state,
      postUrl: apiEndpoints.transaction.getTransactions,
      formMethod: FORM_METHODS.POST,
      action: "READ",
      page: 1,
      getUrl,
    }
    
    if (state.getUrl) {
        setSkip(false)
    }

    dispatch(setAllGlobalKey(updatedState as any))
    // Only call sendData when getUrl changes or when other relevant dependencies change
    if (getUrl !== state.getUrl) {
      sendData(updatedState)
    }
  }, [dispatch, state.request?.day, sendData, state.getUrl])
  
  const { data: getDataResponse, isLoading: getDataLoading } = useGetDataQuery(state, {skip})

  const handleDateChange = useCallback(
    (e: any) => {
      setFieldChange("day", e)
    },
    [setFieldChange],
  )

  return {
    handleDateChange,
    data,
    isLoading,
    getDataLoading,
    getDataResponse,
  }
}

export default useGetDashboardData

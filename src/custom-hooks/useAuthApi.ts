/* eslint-disable prettier/prettier */
import { useCallback, useEffect } from "react"
import { useLoginMutation } from "../store/index"
import Notify from "@common/components/notification"
import { ApiResponse } from "model/client/response"
import { useNavigate } from "react-router-dom"
import { ROUTE } from "@common/constants"

const useAuthApi = () => {
  const [authApi, { data, isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const handleAuthResponse = useCallback(() => {
    if (data && !isLoading) {
      const response: ApiResponse.API = data
      if (response && response.responseCode) {
        Notify("error", response?.failureReason)
      } else {
        localStorage.setItem("*****", data.token)
        Notify("success", "Successful")
        navigate(ROUTE.DASHBOARD, {
          replace: true,
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading])

  useEffect(() => {
    handleAuthResponse()
  }, [handleAuthResponse])

  return {
    authApi,
    isLoading,
    data,
  }
}

export default useAuthApi

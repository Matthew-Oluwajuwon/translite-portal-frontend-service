/* eslint-disable prettier/prettier */
import { useAppSelector } from "./../store/hooks"
import { useLoginMutation } from "../store/index"
import Notify from "@common/components/notification"
import { ApiResponse } from "../model/client/response"
import { useNavigate } from "react-router-dom"
import { ROUTE } from "@common/constants"
import { apiEndpoints } from "../store/apiEndpoints"
import { useCallback } from "react"
import useToken from "./useToken"

const useAuthApi = () => {
  const state = useAppSelector((state) => {
    return state.auth
  })
  const [authApi, { isLoading }] = useLoginMutation()

  const navigate = useNavigate()

  const { userToken } = useToken()

  const getAdminInfo = useCallback(async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_APP_API_BASE_URL + apiEndpoints.auth.getAdminUser,
        {
          headers: {
            Authorization: `Bearer ${userToken()}`,
          },
        },
      )
      const data = await response.json()

      if (response.status === 401) {
        Notify("error", data.failureReason)
        navigate(ROUTE.INDEX, {
          replace: true,
        })
      } else {
        Notify("success", "Successful")
        localStorage.setItem("***", JSON.stringify(data.data))
        navigate(ROUTE.DASHBOARD, {
          replace: true,
        })
      }
    } catch (error) {
      console.log("error", error)
    }
  }, [navigate, userToken])

  const handleLogin = useCallback(async () => {
    try {
      const result = await authApi(state)
      if (result) {
        if ("data" in result) {
          const response: ApiResponse.API = result

          if (response.data.token) {
            localStorage.setItem("*****", response.data?.token)
            try {
              getAdminInfo()
            } catch (error) {
              Notify("error", response?.failureReason)
            }
          } else {
            Notify("error", response?.failureReason)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [authApi, getAdminInfo, state])

  return {
    isLoading,
    handleLogin,
  }
}

export default useAuthApi

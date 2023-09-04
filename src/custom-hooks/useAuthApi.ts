/* eslint-disable prettier/prettier */
import { useAppSelector } from "./../store/hooks"
import { useLoginMutation } from "../store/index"
import Notify from "@common/components/notification"
import { ApiResponse } from "../model/client/response"
import { useNavigate } from "react-router-dom"
import { ROUTE } from "@common/constants"
import { apiEndpoints } from "../store/apiEndpoints"
import { useCallback, useState } from "react"
import useToken from "./useToken"
import { Encryption } from "@common/utils/encryption"

const useAuthApi = () => {
  const state = useAppSelector((state) => {
    return state.auth
  })
  const [authApi, { isLoading }] = useLoginMutation()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { userToken } = useToken()

  const getAdminInfo = useCallback(async () => {
    setLoading(true)
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
      } else {
        if (data.responseCode !== "00") {
          Notify("error", data.failureReason)
          setLoading(false)
        } 
         if (data.responseCode === "97") {
         return navigate(ROUTE.RESET_PASSWORD, {
          state: {
            oldPassword: state.request?.password
          }
         })
        } else {
          navigate(ROUTE.INDEX, {
            replace: true,
          })
          Notify("success", "Successful")
          localStorage.setItem("***", Encryption.encrypt(JSON.stringify(data.data)))
          setLoading(false)
          navigate(ROUTE.DASHBOARD, {
            replace: true,
          })
        }
      }
    } catch (error) {
      console.log("error", error)
    }
  }, [navigate, state.request?.password, userToken])

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
              Notify("error", response.data?.failureReason)
            }
          } else {
            Notify("error", response.data?.failureReason)
          }
        }
      }
    } catch (error) {
      Notify("error", error)
      console.log(error)
    }
  }, [authApi, getAdminInfo, state])

  return {
    isLoading: isLoading || loading,
    handleLogin,
  }
}

export default useAuthApi

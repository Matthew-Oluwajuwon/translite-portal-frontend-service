/* eslint-disable prettier/prettier */
import { ROUTE } from "@common/constants"
import { ApiResponse } from "../model/client/response"
import { useLayoutEffect, useState } from "react"
import { Encryption } from "@common/utils/encryption"

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<ApiResponse.UserInfo>(new ApiResponse.UserInfo())
  useLayoutEffect(() => {
    if (JSON.parse(JSON.parse(
      Encryption.decrypt(localStorage.getItem("***") as string)))) {
      const loginResponse: ApiResponse.UserInfo = JSON.parse(JSON.parse(
        Encryption.decrypt(localStorage.getItem("***") as string)))
      setUserInfo(loginResponse)
    } else {
      window.location.href = ROUTE.INDEX
    }
  }, [])
  
  return [userInfo]
}

export default useUserInfo

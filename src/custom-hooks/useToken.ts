/* eslint-disable prettier/prettier */

import { Encryption } from "@common/utils/encryption"

const useToken = () => {
  const userToken = () => {
    if (
      localStorage.getItem("*****") &&
      localStorage.getItem("*****")?.length
    ) {
      return JSON.parse(
        JSON.parse(Encryption.decrypt(localStorage.getItem("*****") as string)),
      )
    }
    return Promise.reject(new Error("No token in the storage"))
  }

  return { userToken }
}

export default useToken

/* eslint-disable prettier/prettier */

const useToken = () => {
  const userToken = () => {
    if (
      localStorage.getItem("*****") &&
      localStorage.getItem("*****")?.length
    ) {
      return localStorage.getItem("*****")
    }
    return Promise.reject(new Error("No token in the storage"))
  }

  return { userToken }
}

export default useToken

/* eslint-disable prettier/prettier */

const useToken = () => {
  const userToken = () => {
    if (
      localStorage.getItem("*****") &&
      localStorage.getItem("*****")?.length
    ) {
      return localStorage.getItem("*****")
    }
    return false
  }

  return { userToken }
}

export default useToken

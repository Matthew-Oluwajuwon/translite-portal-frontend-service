/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const userToken = () => {
  if (localStorage.getItem("*****") && localStorage.getItem("*****")?.length) {
    return localStorage.getItem("*****")
  }
  return false
}

const apiController = createApi({
  reducerPath: "apiController",
  tagTypes: ["GetData"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${userToken()}`)

      return headers
    },
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (data) => {
        return {
            url: data && data.getUrl
        }
      },
      providesTags: ["GetData"],
    }),
    sendData: builder.mutation({
      query: (data: any) => {
        return {
          url: data.postUrl,
          method: data.formMethod,
          body: data.request,
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "GetData", id: arg.id },
      ],
    }),
  }),
})

export const { useSendDataMutation, useGetDataQuery } = apiController
export default apiController

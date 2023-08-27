/* eslint-disable prettier/prettier */
import { ROUTE } from "@common/constants"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const userToken = () => {
  if (localStorage.getItem("*****") && localStorage.getItem("*****")?.length) {
    return localStorage.getItem("*****")
  }
  return Promise.reject(new Error("No token in the storage"))
}
export const baseUrl = import.meta.env.VITE_APP_API_BASE_URL

type BaseQueryType = ReturnType<typeof fetchBaseQuery>

export const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType =
  (baseQuery) => async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
      localStorage.clear()
      window.location.href = ROUTE.INDEX
    }
    return result
  }

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${userToken()}`)
    return headers
  },
})

const apiController = createApi({
  reducerPath: "apiController",
  tagTypes: ["GetData"],
  baseQuery: baseQueryWithReauth(baseQuery),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (data) => {
        return {
          url: data.getUrl,
        }
      },
      providesTags: ["GetData"],
    }),
    sendData: builder.mutation({
      query: (data: any) => {
        return {
          url: data.postUrl,
          method: data.formMethod,
          body:
            data?.action === "READ"
              ? {
                  size: 100,
                  page: data.page,
                }
              : data.request,
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "GetData", id: arg.id },
      ],
    }),
  }),
})

export const { useSendDataMutation, useGetDataQuery } =
  apiController
export default apiController

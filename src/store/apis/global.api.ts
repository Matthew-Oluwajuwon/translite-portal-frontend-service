/* eslint-disable prettier/prettier */
import { FORM_METHODS, ROUTE } from "@common/constants"
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

const globalApi = createApi({
  reducerPath: "globalApi",
  tagTypes: ["GetData"],
  baseQuery: baseQueryWithReauth(baseQuery),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (data) => {
        return {
          url: data.getUrl,
        }
      },
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response.status,
      providesTags: (result, error, id) => [{ type: "GetData", id }],
    }),
    getDataByPostMethod: builder.mutation({
      query: (data: any) => {
        return {
          url: data.postUrl,
          method: FORM_METHODS.POST,
          body: {
            ...data.request,
            page: data.page,
            size: 100,
          },
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "GetData", id: arg.id },
      ],
    }),
    postData: builder.mutation({
      query: (data) => {
        return {
          url: data.postUrl,
          method: FORM_METHODS.POST,
          body: data.request,
        }
      },
    }),
  }),
})

export const {
  useGetDataQuery,
  useGetDataByPostMethodMutation,
  usePostDataMutation,
  useLazyGetDataQuery
} = globalApi
export default globalApi

/* eslint-disable prettier/prettier */
import { FORM_METHODS, ROUTE } from "@common/constants"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { State } from "../../model/application/state"

const userToken = () => {
  if (localStorage.getItem("*****") && localStorage.getItem("*****")?.length) {
    return localStorage.getItem("*****")
  }
  localStorage.clear()
  window.location.href = ROUTE.INDEX
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

export const globalApi = createApi({
  reducerPath: "globalApi",
  baseQuery: baseQueryWithReauth(baseQuery),
  tagTypes: ["GetData"],
  endpoints: (builder) => ({
    getData: builder.query({
      query: (data) => {
        return {
          url: `${data.getUrl}`,
        };
      },
      providesTags: ['GetData'],
    }),
    getUserInfo: builder.mutation({
      query: (data) => {
        return {
          url: data.postUrl,
          method: FORM_METHODS.POST,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data: State.Authentication) => {
        return {
          url: `${data.postUrl}`,
          method: FORM_METHODS.POST,
          body: data.request
        }
      }
    }),
    getDataByPostMethodSecured: builder.mutation({
      query: (data) => {

        return {
          url: data.getPostUrl,
          method: FORM_METHODS.POST,
          body: {
            ...data.request,
            page: data.page,
            size: 10,
          },
        };
      },
    }),
    postData: builder.mutation({
      query: (data) => {
        return {
          url: data.postUrl,
          method: FORM_METHODS.POST,
          body: data.request,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "GetData", id: arg.id },
      ],
    }),
    updateData: builder.mutation({
      query: (data) => {
        return {
          url: data.updateUrl,
          method: FORM_METHODS.POST,
          body: data.request,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "GetData", id: arg.id },
      ],
    }),
    deleteData: builder.mutation({
      query: (data) => {
        return {
          url: data.deleteUrl,
          method: FORM_METHODS.POST,
          body: data.request,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "GetData", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetUserInfoMutation,
  useGetDataByPostMethodSecuredMutation,
  usePostDataMutation,
  useUpdateDataMutation,
  useDeleteDataMutation,
  useGetDataQuery,
  useLazyGetDataQuery,
  useResetPasswordMutation
} = globalApi;

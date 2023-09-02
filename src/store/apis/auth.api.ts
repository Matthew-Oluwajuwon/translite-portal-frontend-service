/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { State } from "../../model/application/state"
import { FORM_METHODS } from "@common/constants"

const loginApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: State.Authentication) => {
        return {
          url: data.postUrl,
          method: data.formMethod,
          body: data.request,
        }
      },
    }),
    resetPassword: builder.mutation({
      query: (data: State.Authentication) => {
        return {
          url: `${data.postUrl}${data.token}&password=${data.request?.password}`,
          method: FORM_METHODS.POST
        }
      }
    })
  }),
})

export const { useLoginMutation, useResetPasswordMutation } = loginApi
export default loginApi

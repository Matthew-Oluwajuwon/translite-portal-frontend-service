/* eslint-disable prettier/prettier */
import { FORM_METHODS } from "@common/constants"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { State } from "model/application/state"

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    auth: builder.mutation({
      query: (data: State.Authentication) => {
        return {
          url: data.postUrl,
          method: FORM_METHODS.POST,
          body: data.request,
        }
      },
    }),
  }),
})

export const { useAuthMutation } = authApi
export default authApi

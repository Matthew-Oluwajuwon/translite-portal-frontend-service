/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { State } from "../../model/application/state"

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
  }),
})

export const { useLoginMutation } = loginApi
export default loginApi

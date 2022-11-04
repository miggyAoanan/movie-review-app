
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL, USERS_URL } from '../API'

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/users"
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url: "/login",
                    method: "post",
                    body,
                }
            }
        })
    })
})

export const { useLoginUserMutation } = authApi;
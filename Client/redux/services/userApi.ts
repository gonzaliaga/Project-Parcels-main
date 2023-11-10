import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Parcela } from "./parcelApi"

export interface User {
  _id: string
  name: string
  lastname: string
  phone: number
  date: string
  email: string
  image: string
  password: string
  provider?: string
  accessToken?: string
  isAdmin: boolean
  isCompany: boolean
  wishes?: Parcela[]
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], { name: string }>({
      query: ({ name }) => ({
        url: `users?name=${name}`,
        method: "GET"
      })
    }),
    deleteUser: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/usersDelete/${id}`,
        method: "PUT"
      })
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `updateUser/${id}`,
        method: "PUT",
        body: data
      })
    }),
    addToWishlist: builder.mutation<
      Parcela,
      { id: string; data: Partial<Parcela> }
    >({
      query: ({ id, data }) => ({
        url: `wishlist/${id}`,
        method: "PUT",
        body: { data }
      })
    }),
    removeFromWishlist: builder.mutation<void, { id: string; data: string }>({
      query: ({ id, data }) => ({
        url: `thewishlist/${id}`,
        method: "PUT",
        body: { data }
      })
    })
  })
})

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation
} = userApi

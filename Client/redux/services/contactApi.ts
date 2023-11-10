import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Contactanos {
    _id: string
    firstName: string
    lastName: string
    email: string
    phone: number | string
    reason: string
    message: string
    managed: boolean
}


export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_URL
    }),
    endpoints: (builder) => ({
        createMessage: builder.mutation<Contactanos, Partial<Contactanos>>({
            query: (messageData) => ({
                url: "message",
                method: "POST",
                body: messageData
            })
        }),
        getMessage: builder.query<Contactanos[], string>({
            query: () => ({
                url: "message",
                method:"GET",
            })
        }),
        updateMessage: builder.mutation<Contactanos, { id: string, data: {managed: boolean} }>({
            query: ({id, data}) => ({
                url: `Message/${id}`,
                method: "PUT",
                body: data,
            })
        }),
        deleteMessage: builder.mutation<Contactanos, { id: string }>({
            query: ({id}) => ({
                url: `deleteMessage/${id}`,
                method: "PUT",
            })
        })
    })
})


export const {
    useCreateMessageMutation,
    useGetMessageQuery,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
} = contactApi

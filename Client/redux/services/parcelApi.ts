import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export interface Parcela {
  _id: string
  name: string
  price: number | string | null
  lote: number | null
  area: number | null
  location: string
  image: string[]
  deleted: boolean
  parcelaData: string[]
  description: string
  user: string
  views: number
  status: string
}

export const parcelApi = createApi({
  reducerPath: "parcelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL
  }),
  endpoints: (builder) => ({
    getParcelas: builder.query<Parcela[], string>({
      query: (nombre) => `parcelas?nombre=${nombre}`
    }),
    getParcelaById: builder.query<Parcela, { id: string }>({
      query: ({ id }) => `parcelas/${id}`
    }),
    createParcela: builder.mutation<Parcela, Partial<Parcela>>({
      query: (parcelaData) => ({
        url: "parcela",
        method: "POST",
        body: parcelaData
      })
    }),
    updateParcela: builder.mutation<
      Parcela,
      { id: string; data: Partial<Parcela> }
    >({
      query: ({ id, data }) => ({
        url: `updateParcela/${id}`,
        method: "PUT",
        body: data
      })
    }),
    deleteParcela: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `deleteParcela/${id}`,
        method: "PUT"
      })
    }),
    desableParcela: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `desableParcela/${id}`,
        method: "PUT"
      })
    }),
    updateViews: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/updateViews/${id}`,
        method: "PUT"
      })
    })
  })
})
// export const useGetParcelasQuery = parcelApi.endpoints.getParcelas.useQuery
export const {
  useCreateParcelaMutation,
  useDeleteParcelaMutation,
  useGetParcelaByIdQuery,
  useGetParcelasQuery,
  useUpdateParcelaMutation,
  useDesableParcelaMutation,
  useUpdateViewsMutation
} = parcelApi

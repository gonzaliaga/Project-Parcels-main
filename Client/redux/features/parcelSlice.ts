import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Parcela {
  _id: string
  name: string
  price: number | string | null
  lote?: number | null
  area?: number | null
  location?: string
  image: string[]
  deleted?: boolean
  parcelaData?: string[]
  description: string
  user: string
  status: string
}
interface ParcelasState {
  allParcelas: Parcela[]
  parcelas: Parcela[]
  parcelaData: Parcela
  priceRange: {
    minPrice: number
    maxPrice: number
  }
}

const initialState: ParcelasState = {
  allParcelas: [],
  parcelas: [],
  priceRange: {
    minPrice: 0,
    maxPrice: 100000,
  },
  parcelaData: {
    _id : "",
    user: "",
    name: "",
    price: 0,
    description: "",
    image: [],
    status: ""
  }
}

const parcelasSlice = createSlice({
  name: "parcelas",
  initialState,
  reducers: {
    setParcelas: (state, action: PayloadAction<Parcela[]>) => {
      state.allParcelas = action.payload
      state.parcelas = action.payload
    },
    setParcelaData: (state, action: PayloadAction<Parcela>) => {
      state.parcelaData = action.payload
    },
    sortParcelas: (state, action: PayloadAction<string>) => {
      const orderBy = action.payload
      let sortedParcels: Parcela[]

      if (orderBy === "asc") {
        sortedParcels = [...state.parcelas].sort(
          (a, b) => Number(a.price) - Number(b.price)
        )

        return {
          ...state,
          parcelas: sortedParcels
        }
      } else if (orderBy === "desc") {
        sortedParcels = [...state.parcelas].sort(
          (a, b) => Number(b.price) - Number(a.price)
        )

        return {
          ...state,
          parcelas: sortedParcels
        }
      }
    },
    updatePriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.priceRange.minPrice = action.payload.min;
      state.priceRange.maxPrice = action.payload.max

    },
    filterPrice : (state, action: PayloadAction<{ min: number; max: number }>) => {
        if (state.priceRange) {
          let filteredPriceParcels = state.allParcelas.filter(
           (parcela) => Number(parcela.price) >= state.priceRange.minPrice && Number(parcela.price) <= state.priceRange.maxPrice
           )

         return {
           ...state,
           parcelas: filteredPriceParcels
         }
       }
    },
    filterParcelas: (state, action: PayloadAction<string>) => {
      const filtroSuperficie = action.payload
      let filteredParcels: Parcela[]

      if (filtroSuperficie === "5000") {
        filteredParcels = state.allParcelas.filter(
          (parcela) => (parcela.area ?? 0) <= 5000
        )

        return {
          ...state,
          parcelas: filteredParcels
        }
      } else if (filtroSuperficie === "5500") {
        filteredParcels = state.allParcelas.filter(
          (parcela) => (parcela.area ?? 0) > 5000 && (parcela.area ?? 0) <= 5500
        )

        return {
          ...state,
          parcelas: filteredParcels
        }
      } else if (filtroSuperficie === "10000") {
        filteredParcels = state.allParcelas.filter(
          (parcela) =>
            (parcela.area ?? 0) > 5500 && (parcela.area ?? 0) <= 10000
        )

        return {
          ...state,
          parcelas: filteredParcels
        }
      } else if (filtroSuperficie === "10000+") {
        filteredParcels = state.allParcelas.filter(
          (parcela) => (parcela.area ?? 0) > 10000
        )

        return {
          ...state,
          parcelas: filteredParcels
        }
      }
    }
  }
})

export const { setParcelas, sortParcelas, filterParcelas, updatePriceRange, filterPrice, setParcelaData } = parcelasSlice.actions

export default parcelasSlice.reducer

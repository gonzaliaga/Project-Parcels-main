import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import state from "sweetalert/typings/modules/state"

type initialState = {
  position: string
  image: string[]
  newImage: string
}

const initialState: initialState = {
  position: "",
  image: [],
  newImage: ""
}

const coordenadaSlice = createSlice({
  name: "coordenada",
  initialState,
  reducers: {
    setCoordenadaPosition: (state, action: PayloadAction<string>) => {
      state.position = action.payload
    },
    setImageCloud: (state, action: PayloadAction<string[]>) => {
      state.image = action.payload
    },
    setNewImageCloud: (state, action: PayloadAction<string>) => {
      state.newImage = action.payload
    }
  }
})

export const { setCoordenadaPosition, setImageCloud, setNewImageCloud } =
  coordenadaSlice.actions

export default coordenadaSlice.reducer

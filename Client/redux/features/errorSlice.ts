import { createSlice } from "@reduxjs/toolkit"

interface ErrorState {
  error: boolean
}

const errorSlice = createSlice({
  name: "error",
  initialState: {
    error: false
  } as ErrorState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})
export const { setError } = errorSlice.actions

export default errorSlice.reducer

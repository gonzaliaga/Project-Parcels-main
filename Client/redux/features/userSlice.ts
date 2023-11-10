import { createSlice } from "@reduxjs/toolkit"

interface UserState {
  users: any[]
  userData: {
    email: string
    password: string
    name: string
    lastname: string
    image: string
    date: string
    phone: number
  } | null
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    userData: null
  } as UserState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    setUsersData: (state, action) => {
      state.users = action.payload
    }
  }
})

export const { setUserData, setUsersData } = userSlice.actions

export default userSlice.reducer

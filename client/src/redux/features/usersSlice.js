const { createSlice } = require("@reduxjs/toolkit");

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    auxUsers: []
  },
  reducers: {
    allUsers: (state, actions) => {
      state.users = actions.payload
      state.auxUsers = actions.payload
    }
  }
})
export const { allUsers } = usersSlice.actions
export default usersSlice.reducer

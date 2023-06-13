import { createSlice } from '@reduxjs/toolkit'



export const HomeSlice = createSlice({
  name: 'home',
  initialState:{
    url:{},
    genres:{}
  },
  reducers: {
    getApiConfiguration:(state,action)=>{
        state.url=action.payload
    },
    getgenres:(state,action)=>{
        state.genres=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {getApiConfiguration, getgenres} = HomeSlice.actions

export default HomeSlice.reducer
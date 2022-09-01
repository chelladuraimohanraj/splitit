import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Authslice"
import tripReducer from './Tripslice'

export default configureStore({
  reducer: {
    authdata:authReducer,
    tripdata:tripReducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})
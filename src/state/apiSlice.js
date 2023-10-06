import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:8000',
    baseUrl: 'https://collectionafrica-elearning.onrender.com',
    credentials:'include',
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes:['User', 'Students', 'Courses', 'Quizes'],
    endpoints:(builder) =>({
        
    })
})
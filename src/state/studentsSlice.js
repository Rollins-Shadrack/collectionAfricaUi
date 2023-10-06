import {apiSlice} from './apiSlice'

export const studentApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        login: builder.mutation({
            query:(data) =>({
                url:'users/auth/',
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query:(data) => ({
                url: 'users/register/',
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query:()=>({
                url:'users/logout/',
                method:'POST',
            })
        }),
        verifyAccount: builder.query({
            query: (id) => `users/verify/${id}`,
            providesTags: ['Students'],
          }),
        getSpecificStudent: builder.query({
        query: () => `users/profile/`,
        providesTags: ['Students'],
        }),
        addImage: builder.mutation({
        query: (data) =>({
            url:'users/image/',
            method:'POST',
            body: data,
        })
        }),
        updateUser: builder.mutation({
            query: (data) =>({
                url:'users/profile/',
                method: 'PUT',
                body: data
            })
        }),
        handlePayment: builder.mutation({
            query: (data) =>({
                url:'users/payment/',
                method: 'POST',
                body: data
            })
        }),
        getAllUsers: builder.query({
            query: () => `users/users/`,
            providesTags: ['Students'],
        }),
        deleteUser: builder.mutation({
            query: (data) =>({
                url:'users/delete_user/',
                method: 'POST',
                body: data
            })
        }),
        studentPerformance: builder.mutation({
            query: (data) =>({
                url:'users/quiz/',
                method: 'POST',
                body: data
            })
        }),
    })
})


export const {useLoginMutation, useRegisterMutation, useVerifyAccountQuery, useLogoutMutation, useDeleteUserMutation,
    useAddImageMutation, useUpdateUserMutation, useGetSpecificStudentQuery, useHandlePaymentMutation, useGetAllUsersQuery, useStudentPerformanceMutation
} = studentApiSlice
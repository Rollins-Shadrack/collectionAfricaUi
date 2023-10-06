import {apiSlice} from './apiSlice'

export const adminApiSlice = apiSlice.injectEndpoints({
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
        addSlideByLink: builder.mutation({
            query:(data) => ({
                url: 'admin/upload-by-link/',
                method: 'POST',
                body: data
            })
        }),
        uploadVideo: builder.mutation({
            query:(data) => ({
                url: 'admin/upload-video/',
                method: 'POST',
                body: data
            })
        }),
        newCourse: builder.mutation({
            query:(data) => ({
                url: 'admin/course/',
                method: 'POST',
                body: data
            })
        }),
        deleteCourse: builder.mutation({
            query:(data) => ({
                url: 'admin/delete_course/',
                method: 'POST',
                body: data
            })
        }),
        getCourses: builder.query({
            query: () => 'admin/course/',
            providesTags: ['Courses'],
          }),
        getSingleCourse: builder.query({
            query: (id) => `admin/course/${id}`,
            providesTags: ['Courses'],
        }),
        updateCourse: builder.mutation({
            query: (data) =>({
                url:'admin/course',
                method: 'PUT',
                body: data
            }), 
        }),
        setQuiz: builder.mutation({
            query: (data) =>({
                url:'admin/quiz',
                method: 'POST',
                body: data
            }), 
        }),
        getQuizes: builder.query({
            query: (id) => `admin/quiz`,
            providesTags: ['Quizes'],
        }),
        replyComment: builder.mutation({
            query: (data) =>({
                url:'admin/comment',
                method: 'POST',
                body: data
            }), 
        }),
        uploadSlide: builder.mutation({
            query: (data) =>({
                url:'admin/upload-slide/',
                method: 'POST',
                body: data
            }), 
        }),
        uploadVideo: builder.mutation({
            query: (data) =>({
                url:'admin/upload-video/',
                method: 'POST',
                body: data
            }), 
        }),
    })
})

export const {useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useAddSlideByLinkMutation,
    useUploadSlideMutation,
    useUploadVideoMutation,
    useNewCourseMutation,
    useDeleteCourseMutation,
    useGetCoursesQuery,
    useGetSingleCourseQuery,
    useUpdateCourseMutation,
    useGetQuizesQuery,
    useReplyCommentMutation,
useSetQuizMutation} = adminApiSlice
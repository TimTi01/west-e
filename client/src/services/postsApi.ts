import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import { Post, PostReq } from "../models/Post"

export const postsApi = createApi({
    reducerPath: 'postsApi',
    tagTypes: ['Posts'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/post'}),
    endpoints: (build) => ({
        fetchAllPosts: build.query<Post, PostReq>({
            query: ({limit, page, post_name}) => ({
                url: `/getAll`,
                params: {
                    limit: limit,
                    page: page,
                    post_name: post_name
                }
            }),
            providesTags: ['Posts']
        }),
        createPost: build.mutation({
            query: ({post_name}) => {
                return {
                    url: `/create`,
                    body: {
                        post_name
                    },
                    method: "POST",
                }
            },
        }),
    })
})

export const {useFetchAllPostsQuery, useCreatePostMutation} = postsApi 
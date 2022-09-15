import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import { Education, EducationReq } from "../models/Education"

export const educationsApi = createApi({
    reducerPath: 'educationsApi',
    tagTypes: ['Educations'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/education'}),
    endpoints: (build) => ({
        fetchAllEducations: build.query<Education, EducationReq>({
            query: ({limit, page, education_name}) => ({
                url: `/getAll`,
                params: {
                    limit: limit,
                    page: page,
                    education_name: education_name
                }
            }),
            providesTags: ['Educations']
        }),
        createEducation: build.mutation({
            query: ({education_name}) => {
                return {
                    url: `/create`,
                    body: {
                        education_name
                    },
                    method: "POST",
                }
            },
        }),
    })
})

export const {useFetchAllEducationsQuery, useCreateEducationMutation} = educationsApi 
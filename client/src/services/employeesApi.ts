import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import { Employee, EmployeeEdit, EmployeeReq } from "../models/Employee"

export const employeesApi = createApi({
    reducerPath: 'employeesApi',
    tagTypes: ['Employees'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/employee'}),
    endpoints: (build) => ({
        fetchAllEmployees: build.query<Employee, EmployeeReq>({
            query: ({limit, page, full_name}) => ({
                url: `/getAll`,
                params: {
                    limit: limit,
                    page: page,
                    full_name: full_name
                }
            }),
            providesTags: ['Employees']
        }),
        createEmployee: build.mutation({
            query: ({full_name, postId, educationId}) => {
                return {
                    url: `/create`,
                    body: {
                        full_name,
                        postId,
                        educationId
                    },
                    method: "POST",
                }
            },
            invalidatesTags: ['Employees']
        }),
        deteleEmployee: build.mutation({
            query: (id) => {
                return {
                    url: `/delete/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['Employees']
        }),
        updateEmployee: build.mutation<EmployeeEdit, EmployeeEdit>({
            query: ({id, full_name, postId, educationId}) => {
                return {
                    url: `/update/${id}`,
                    method: "PUT",
                    body: {
                        full_name,
                        postId,
                        educationId
                    }
                }
            },
            invalidatesTags: ['Employees']
        }),
    })
})

export const {
    useFetchAllEmployeesQuery, 
    useCreateEmployeeMutation,
    useDeteleEmployeeMutation,
    useUpdateEmployeeMutation
} = employeesApi 
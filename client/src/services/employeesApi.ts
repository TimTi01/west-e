import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import { Employee, EmployeeReq } from "../models/Employee"

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
            query: ({full_name}) => {
                return {
                    url: `/create`,
                    body: {
                        full_name
                    },
                    method: "POST",
                }
            },
        }),
    })
})

export const {useFetchAllEmployeesQuery, useCreateEmployeeMutation} = employeesApi 
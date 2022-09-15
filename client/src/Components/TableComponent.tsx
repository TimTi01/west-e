import React, {FC} from 'react'
import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table } from '@mui/material'
import { useFetchAllEmployeesQuery } from '../services/employeesApi'

export const TableComponent:FC = () => {
    const {data: employees} = useFetchAllEmployeesQuery({})

    console.log('employees; ', employees)

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ФИО</TableCell>
                        <TableCell align="left">Должность</TableCell>
                        <TableCell align="left">Образование</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        employees?.rows.map((employee) => (
                            <TableRow key={employee.id}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">
                                    {employee.full_name}
                                </TableCell>
                                <TableCell align="left">
                                    {employee.post.post_name}
                                </TableCell>
                                <TableCell align="left">
                                    {employee.education.education_name}
                                </TableCell>
                            </TableRow>   
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

import React, {FC} from 'react'
import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table, Checkbox } from '@mui/material'
import { useFetchAllEmployeesQuery } from '../services/employeesApi'

interface TableComponentProps {
    isChekedId: number,
    setIsCheckedId: (val: number) => void
}

export const TableComponent:FC<TableComponentProps> = ({isChekedId, setIsCheckedId}) => {
    const {data: employees} = useFetchAllEmployeesQuery({})

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell align="left">ФИО</TableCell>
                        <TableCell align="left">Должность</TableCell>
                        <TableCell align="left">Образование</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        employees?.count !== 0 
                            ? employees?.rows.map((employee) => (
                                <TableRow key={employee.id}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <Checkbox
                                            color="primary"
                                            checked={isChekedId === employee.id}
                                            onClick={() => setIsCheckedId(employee.id)}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        {employee.full_name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {employee.post?.post_name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {employee.education?.education_name}
                                    </TableCell>
                                </TableRow>   
                              ))
                            :   <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell 
                                        colSpan={4}
                                        align='center'
                                        sx={{color: '#2e7d32'}}
                                    >
                                        ДОБАВЬТЕ СОТРУДНИКА!
                                    </TableCell>
                                </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

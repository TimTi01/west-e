import React, { FC, useState } from 'react'
import { Dialog, DialogTitle, Divider, DialogContent, Grid, ButtonGroup, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, TextField, IconButton, DialogActions, Tooltip } from '@mui/material'
import { useCreateEducationMutation, useDeteleEducationMutation, useFetchAllEducationsQuery } from '../services/educationsApi'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface EducationDialogProps {
    openEducationDialog: boolean,
    setOpenEducationDialog: (val: boolean) => void
}

export const EducationDialog:FC<EducationDialogProps> = ({openEducationDialog, setOpenEducationDialog}) => {
    const {data: educations} = useFetchAllEducationsQuery({})
    const [createEducation] = useCreateEducationMutation()
    const [deleteEducation] = useDeteleEducationMutation()
    const [hiddenTextField, setHiddenTextField] = useState<boolean>(false)
    const [educationCheckId, setEducationCheckId] = useState<number>(0)
    const [educationTitle, setEducationTitle] = useState<string>('')

    const handleChangeEducationTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEducationTitle(event.target.value);
    };
    
    return (
        <Dialog
            open={openEducationDialog}
            onClose={() => setOpenEducationDialog(false)}
            aria-labelledby="post-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="post-dialog-title" 
                         sx={{background: 'aliceblue'}}
            >
                {"Образование(Удаление и редактирование)"}
            </DialogTitle>
            <Divider />
            <DialogContent sx={{background: 'aliceblue'}}>
                <Grid container
                    direction='column'
                    spacing={1}
                >
                    <Grid item>
                        <ButtonGroup>
                            <Button color='success'
                                    size='small'
                                    onClick={() => setHiddenTextField(!hiddenTextField)}
                            >
                                Добавить
                            </Button>
                            <Button color='error'
                                    size='small'
                                    onClick={() => deleteEducation(educationCheckId)}
                            >
                                Удалить
                            </Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell/>
                                        <TableCell align="left">№</TableCell>
                                        <TableCell align="left">Должность</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        educations?.rows.map((education) => (
                                            <TableRow key={education.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>
                                                    <Checkbox
                                                        color="primary"
                                                        checked={educationCheckId === education.id}
                                                        onClick={() => setEducationCheckId(education.id)}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    {education.id}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {education.education_name}
                                                </TableCell>
                                            </TableRow>   
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                {
                    hiddenTextField
                        ? <Grid item 
                                container
                                mt={1}
                            >
                                <Grid item>
                                    <TextField 
                                        id="postAdd"
                                        label="Введите название образования" 
                                        variant="outlined"
                                        value={educationTitle}
                                        onChange={handleChangeEducationTitle}
                                        size='small'
                                    /> 
                                </Grid>
                                <Grid item>
                                    <ButtonGroup>
                                        <Tooltip title="Добавить образование">
                                            <IconButton onClick={() => createEducation({education_name: educationTitle})}>
                                                <CheckIcon color='success'/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Удалить название образования">
                                            <IconButton onClick={() => setEducationTitle('')}>
                                                <ClearIcon color='error'/>
                                            </IconButton>
                                        </Tooltip>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        : <></>
                }
            </DialogContent>
            <DialogActions sx={{background: 'aliceblue'}}>
                <Button onClick={() => setOpenEducationDialog(false)} 
                        autoFocus
                        variant='outlined'
                >
                    Ок
                </Button>
                <Button onClick={() => setOpenEducationDialog(false)}
                        variant='outlined'
                >
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>
    )
}

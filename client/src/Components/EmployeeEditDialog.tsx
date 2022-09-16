import React, {FC, useState} from 'react'
import { Dialog, DialogTitle, DialogContent, Grid, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Button, SelectChangeEvent } from '@mui/material'
import { useFetchAllPostsQuery } from '../services/postsApi'
import { useFetchAllEducationsQuery } from '../services/educationsApi'
import { useUpdateEmployeeMutation } from '../services/employeesApi'

interface EmployeeEditDialogProps {
    isChekedId: number,
    openEditDialog: boolean,
    setOpenEditDialog: (val: boolean) => void
}

export const EmployeeEditDialog:FC<EmployeeEditDialogProps> = ({isChekedId, openEditDialog, setOpenEditDialog}) => {
    const {data: posts} = useFetchAllPostsQuery({})
    const {data: educations} = useFetchAllEducationsQuery({})
    const [updateEmployee] = useUpdateEmployeeMutation()
    const [fullName, setFullName] = useState<string>('');
    const [post, setPost] = useState<string>('');
    const [education, setEducation] = useState<string>('');

    const handleChangeFullName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };

    const handleChangePost = (event: SelectChangeEvent) => {
        setPost(event.target.value as string);
    };

    const handleChangeEducation = (event: SelectChangeEvent) => {
        setEducation(event.target.value as string);
    };

    const handleEditAndClose = () => {
        updateEmployee({
                      id: isChekedId,
                      full_name: fullName,
                      postId: Number(post),
                      educationId: Number(education)
                    });
        
        setOpenEditDialog(false);
    };
    
    return (
        <Dialog
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Редактировать сотрудника"}
            </DialogTitle>
            <DialogContent>
                <Grid container
                    direction='column'
                >
                    <Grid item>
                        <TextField 
                            id="textfield_fullName" 
                            label="ФИО" 
                            variant="outlined"
                            value={fullName}
                            onChange={handleChangeFullName}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                        <InputLabel id="post-select-label">Должность</InputLabel>
                            <Select
                                labelId="post-select-label"
                                id="post-select"
                                value={post}
                                label="Post"
                                onChange={handleChangePost}
                            >
                                {
                                    posts?.rows.map((post) => (
                                        <MenuItem key={post.id} 
                                                    value={post.id}
                                        >
                                            {post.post_name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                        <InputLabel id="education-select-label">Образование</InputLabel>
                            <Select
                                labelId="education-select-label"
                                id="education-select"
                                value={education}
                                label="Education"
                                onChange={handleChangeEducation}
                            >
                                {
                                    educations?.rows.map((education) => (
                                        <MenuItem key={education.id} 
                                                    value={education.id}
                                        >
                                            {education.education_name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditAndClose} autoFocus>
                    Ок
                </Button>
                <Button onClick={() => setOpenEditDialog(false)}>
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>
    )
}

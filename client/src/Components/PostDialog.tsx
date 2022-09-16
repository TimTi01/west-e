import React, { FC, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Grid, ButtonGroup, IconButton, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, DialogActions, Button, Checkbox, Divider, TextField, Tooltip } from '@mui/material'
import { useCreatePostMutation, useDetelePostMutation, useFetchAllPostsQuery } from '../services/postsApi';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface PostDialogProps {
    openPostDialog: boolean,
    setOpenPostDialog: (val: boolean) => void
}

export const PostDialog:FC<PostDialogProps> = ({openPostDialog, setOpenPostDialog}) => {
    const {data: posts} = useFetchAllPostsQuery({})
    const [createPost] = useCreatePostMutation()
    const [deletePost] = useDetelePostMutation()
    const [postCheckId, setPostCheckId] = useState<number>(0)
    const [hiddenTextField, setHiddenTextField] = useState<boolean>(false)
    const [postTitle, setPostTitle] = useState<string>('')

    const handleChangePostTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostTitle(event.target.value);
    };

    return (
        <Dialog
            open={openPostDialog}
            onClose={() => setOpenPostDialog(false)}
            aria-labelledby="post-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="post-dialog-title">
                {"Должности(Удаление и редактирование)"}
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container
                    direction='column'
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
                                    onClick={() => deletePost(postCheckId)}
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
                                        posts?.rows.map((post) => (
                                            <TableRow key={post.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>
                                                    <Checkbox
                                                        color="primary"
                                                        checked={postCheckId === post.id}
                                                        onClick={() => setPostCheckId(post.id)}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    {post.id}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {post.post_name}
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
                                        label="Введите название должности" 
                                        variant="outlined"
                                        value={postTitle}
                                        onChange={handleChangePostTitle}
                                        size='small'
                                    /> 
                                </Grid>
                                <Grid item>
                                    <ButtonGroup>
                                        <Tooltip title="Добавить должность">
                                            <IconButton onClick={() => createPost({post_name: postTitle})}>
                                                <CheckIcon color='success'/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Удалить название должности">
                                            <IconButton onClick={() => setPostTitle('')}>
                                                <ClearIcon color='error'/>
                                            </IconButton>
                                        </Tooltip>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        : <></>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenPostDialog(false)} autoFocus>
                    Ок
                </Button>
                <Button onClick={() => setOpenPostDialog(false)}>
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>
    )
}

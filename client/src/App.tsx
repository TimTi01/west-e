import { Button, ButtonGroup, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { TableComponent } from './Components/TableComponent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateIcon from '@mui/icons-material/Create';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from 'react';
import { useFetchAllPostsQuery } from './services/postsApi';
import { useFetchAllEducationsQuery } from './services/educationsApi';

function App() {
  const {data: posts} = useFetchAllPostsQuery({})
  const {data: educations} = useFetchAllEducationsQuery({})
  const [fullName, setFullName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [openPostDialog, setOpenPostDialog] = useState<boolean>(false);
  const [post, setPost] = useState<string>('');
  const [education, setEducation] = useState<string>('');

  console.log('educations: ', educations);

  const handleChangePost = (event: SelectChangeEvent) => {
    setPost(event.target.value as string);
  };

  const handleChangeEducation = (event: SelectChangeEvent) => {
    setEducation(event.target.value as string);
  };

  const handleChangeFullName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenPostDialog = () => {
    setOpenPostDialog(true);
  };
  const handleClosePostDialog = () => {
    setOpenPostDialog(false);
  };

  const handleSaveAndClose = () => {
    console.log({
                  fullName: fullName,
                  post: post,
                  education: education
                });
    
    setOpen(false);
  };
  
  return (
    <Container maxWidth='xl' sx={{height: '100vh'}}>
      <Grid 
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        height='100vh'
      >
        <Grid item>
          <ButtonGroup>
            <IconButton onClick={handleClickOpen}>
              <AddCircleOutlineIcon color='success'/>
            </IconButton>
            <IconButton>
              <CreateIcon color='warning'/>
            </IconButton>
            <IconButton>
              <HighlightOffIcon color='error'/>
            </IconButton>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <ButtonGroup>
            <Button variant="outlined">Сотрудники</Button>
            <Button variant="outlined"
                    onClick={handleOpenPostDialog}
            >
              Должности
            </Button>
            <Button variant="outlined">Образование</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <TableComponent/>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Редактирование сотрудника"}
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
          <Button onClick={handleSaveAndClose} autoFocus>
            Ок
          </Button>
          <Button onClick={handleClose}>Отмена</Button>
        </DialogActions>
      </Dialog>

      {/* Post dialog */}
      <Dialog
        open={openPostDialog}
        onClose={handleClosePostDialog}
        aria-labelledby="post-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="post-dialog-title">
          {"Редактирование сотрудника"}
        </DialogTitle>
        <DialogContent>
            <Grid container
                  direction='column'
            >
              <Grid item>
                  <ButtonGroup>
                    <IconButton>
                      <AddCircleOutlineIcon color='success'/>
                    </IconButton>
                    <IconButton>
                      <HighlightOffIcon color='error'/>
                    </IconButton>
                  </ButtonGroup>
              </Grid>
              <Grid item>
              <TableContainer component={Paper}>
                  <Table>
                      <TableHead>
                          <TableRow>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveAndClose} autoFocus>
            Ок
          </Button>
          <Button onClick={handleClose}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;

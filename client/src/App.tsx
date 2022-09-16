import { Button, ButtonGroup, Container, Grid, IconButton, Tooltip } from '@mui/material';
import { TableComponent } from './Components/TableComponent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateIcon from '@mui/icons-material/Create';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from 'react';
import { PostDialog } from './Components/PostDialog';
import { EmployeeAddDialog } from './Components/EmployeeAddDialog';
import { useDeteleEmployeeMutation } from './services/employeesApi';
import { EmployeeEditDialog } from './Components/EmployeeEditDialog';
import { EducationDialog } from './Components/EducationDialog';

function App() {
  const [isChekedId, setIsCheckedId] = useState<number>(0)
  const [deleteEmployee] = useDeteleEmployeeMutation()
  const [open, setOpen] = useState<boolean>(false);
  const [openPostDialog, setOpenPostDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openEducationDialog, setOpenEducationDialog] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpenPostDialog = () => {
    setOpenPostDialog(true);
  };

  const handleOpenEducationDialog = () => {
    setOpenEducationDialog(true);
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
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
            <Tooltip title="Добавить сотрудника">
              <IconButton onClick={handleClickOpen}>
                <AddCircleOutlineIcon color='success'/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Редактировать сотрудника">
              <IconButton onClick={handleOpenEditDialog}>
                <CreateIcon color='warning'/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить сотрудника">
              <IconButton onClick={() => deleteEmployee(isChekedId)}>
                <HighlightOffIcon color='error'/>
              </IconButton>
            </Tooltip>
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
            <Button variant="outlined"
                    onClick={handleOpenEducationDialog}
            >
              Образование
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <TableComponent 
            isChekedId={isChekedId}
            setIsCheckedId={setIsCheckedId}
          />
        </Grid>
      </Grid>

      <EmployeeAddDialog 
        open={open} 
        setOpen={setOpen}
      />

      <EmployeeEditDialog
        isChekedId={isChekedId}
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog} 
      />

      <EducationDialog
        openEducationDialog={openEducationDialog}
        setOpenEducationDialog={setOpenEducationDialog}
      />

      <PostDialog
        openPostDialog={openPostDialog}
        setOpenPostDialog={setOpenPostDialog}
      />
    </Container>
  );
}

export default App;

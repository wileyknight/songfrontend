import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import Divider from '@material-ui/core/Divider';
import AddCsv from './AddCsv';
import AddSong from './AddSong';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
    },
  }),
);

const colDiv = (window.innerWidth - 260) / 2;

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'Song Title', headerName: 'Title', width: colDiv },
  { field: 'Artist', headerName: 'Artist', width: colDiv },
  {
    field: 'Length',
    headerName: 'Length',
    width: 80,
  },
  {
    field: 'Date Released',
    headerName: 'Release Date',
    type: 'date',
    width: 120,
  },
];

const MusicGrid: React.FC<{}> = () => {
  const classes = useStyles();

  const [serverData, setServerData] = useState<any>();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData = async () => {
    const baseURL = `http://localhost:5000/api/songs`;

    await fetch(baseURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        const js = await res.json();
        setServerData(js);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Technical Assessment - Music Catalog
          </Typography>
          <Button variant="contained" color="default" onClick={handleClickOpen}>
            Add a song
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Individual</DialogTitle>
        <DialogContent>
          <AddSong update={() => getData()} close={() => handleClose()} />
        </DialogContent>
        <Divider variant="middle" />
        <DialogTitle id="form-dialog-title">Add File</DialogTitle>
        <DialogContent>
          <AddCsv update={() => getData()} close={() => handleClose()} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {serverData ? (
        <DataGrid rows={serverData} columns={columns} pageSize={5} />
      ) : null}
    </div>
  );
};

export default MusicGrid;

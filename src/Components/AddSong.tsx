import React, { useState, FormEvent, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface IProps {
  update: () => void;
  close: () => void;
}

type Songs = {
  title: string;
  artist: string;
  leng: string;
  released: string;
};

const defaultSong = {
  title: '',
  artist: '',
  leng: '',
  released: '',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

const AddSong: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();

  const [song, setSong] = useState<Songs>(defaultSong);

  const saveSong = async (e: FormEvent) => {
    e.preventDefault();

    const baseURL = 'http://localhost:5000/api/songs/';

    const data = JSON.stringify({
      'Song Title': song.title,
      Author: song.artist,
      Length: song.leng,
      Released: song.released,
    });

    await fetch(baseURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((res) => {
        setSong(defaultSong);
        props.update();
        props.close();
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    if (Object.keys(song).includes(key)) {
      setSong({ [key]: e.target.value } as Pick<Songs, keyof Songs>);
    }
  };

  return (
    <form className={classes.root} autoComplete="off">
      <TextField
        id="outlined-basic"
        name="title"
        label="Title"
        variant="outlined"
        onChange={handleChange}
        value={song.title}
      />
      <TextField
        id="outlined-basic"
        name="artist"
        label="Artist"
        variant="outlined"
        onChange={handleChange}
        value={song.artist}
      />
      <TextField
        id="outlined-basic"
        name="length"
        label="Length"
        variant="outlined"
        onChange={handleChange}
        value={song.leng}
      />
      <TextField
        id="outlined-basic"
        name="released"
        label="Release Date"
        variant="outlined"
        onChange={handleChange}
        value={song.released}
      />
      <Button onClick={saveSong} variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default AddSong;

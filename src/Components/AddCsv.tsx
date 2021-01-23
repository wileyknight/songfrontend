import React, { useState, FormEvent, ChangeEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudUpload from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    button: {
      marginLeft: 20,
    },
  }),
);

interface IProps {
  update: () => void;
  close: () => void;
}

const AddCsv: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();

  const [uploadedFile, setUploadedFile] = useState<any>();

  const sendFile = async (e: FormEvent) => {
    e.preventDefault();

    const baseURL = 'http://localhost:5000/api/songs/csv';

    if (uploadedFile) {
      const data = new FormData();
      data.append('file', uploadedFile);

      await fetch(baseURL, {
        method: 'POST',
        body: data,
      })
        .then((res) => {
          props.update();
          setUploadedFile(null);
          props.close();
        })
        .catch((err) => {
          console.log('error', err);
        });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className={classes.root}>
      <input
        accept="csv/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={handleChange}
      />
      <form>
        <label htmlFor="contained-button-file">
          <Typography variant="h5" gutterBottom>
            {uploadedFile ? uploadedFile.name : null}
          </Typography>

          <Button variant="contained" color="primary" component="span">
            Browse
          </Button>
        </label>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<CloudUpload />}
          onClick={sendFile}
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default AddCsv;

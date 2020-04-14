import React, { useState, useEffect }from 'react';
// import 'rbx/index.css';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import { blue } from '@material-ui/core/colors';

const folder_color = blue[200];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Folder = ({ name, state }) => {
  const classes = useStyles();
	console.log("Folder");

  return (<Button variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<FolderIcon />}
                  onClick={ () => state.setPath(state.path + "/" + name) } >
       { name }
  </Button>)

};

// const Folder = ({ name }) => {
// 	console.log("Folder");
//   return (<Button  >
//        { name }
//   </Button>)

// };

export default Folder;
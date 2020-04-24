import React, { useState, useEffect }from 'react';
// import 'rbx/index.css';
import { Button, Grid, Paper, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import { blue } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';

const folder_color = blue[200];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    width: "150px",
    height: "120px",
    backgroundColor: "#bbdefb",
    borderTopLeftRadius: "0px"
  },
  topleftbox: {
    width: "80px",
    height: "30px",
    backgroundColor: "#bbdefb",
    position: "relative",
    top: "0px",
    right: "0px",
    borderTopRightRadius: "3px",
    borderTopLeftRadius: "3px",
  },
  name: {
    display: "block",
    textAlign: "center",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
    paddingTop: "15px"
  }
}));

const Folder = ({ item, state, selectedState }) => {
  const classes = useStyles();

  const handleSelection = () => {
    var found = false;
    var id;
    console.log(selectedState.selected);
    for (id of selectedState.selected.selectedItems) {
      if (id == item.id) {
        found = true;
        //remove object from selected
        var filterArr = [];
        if (selectedState.selected.selectedItems.length != 1) {
          filterArr = selectedState.selected.selectedItems.filter(id => id != item.id);
        }
        selectedState.setSelected({ selectedItems : filterArr});
        break;
      }
    }
    if (!found) {
        var newArr = selectedState.selected.selectedItems
        newArr.push(item.id);
        selectedState.setSelected({ selectedItems : newArr});
    }
  }

  return (
  <Grid item key={item.id}>
    <Box>
    <Paper
      elevation={0}
      className={classes.topleftbox}
      square 
      >
        <Checkbox color="default"
            onChange={handleSelection}>
        </Checkbox>
      </Paper>
    <Paper 
      elevation={0}
      className={classes.paper}
      onClick={ () => state.setPath(state.path + "/" + item.name) }
      >
        <Box className={classes.name}>
        { item.name }
        </Box>
    </Paper>
    </Box>
  </Grid>)

};

// const Folder = ({ name }) => {
// 	console.log("Folder");
//   return (<Button  >
//        { name }
//   </Button>)

// };

export default Folder;
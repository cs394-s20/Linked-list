import React, { useState, useEffect }from 'react';
// import 'rbx/index.css';
import { Button } from '@material-ui/core';
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

  return (<Button variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={
                  <Button onClick={ () => state.setPath(state.path + "/" + item.name) }>
                    <FolderIcon />
                  </Button>}>
       <Checkbox color="default" checked={false}
          onChange={handleSelection}>
       </Checkbox>
       { item.name }
  </Button>)

};

// const Folder = ({ name }) => {
// 	console.log("Folder");
//   return (<Button  >
//        { name }
//   </Button>)

// };

export default Folder;
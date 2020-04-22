import React from 'react';
import 'rbx/index.css';
import { Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Link = ({ item, state }) => {
  const classes = useStyles();

  const handleSelection = () => {
    var found = false;
    var id;
    console.log(state.selected);
    for (id of state.selected.selectedItems) {
      if (id == item.id) {
        found = true;
        //remove object from selected
        var filterArr = [];
        if (state.selected.selectedItems.length != 1) {
          filterArr = state.selected.selectedItems.filter(id => id != item.id);
        }
        state.setSelected({ selectedItems : filterArr});
        break;
      }
    }
    if (!found) {
        var newArr = state.selected.selectedItems
        console.log(item);
        newArr.push(item.id);
        state.setSelected({ selectedItems : newArr});
    }
    
  };


  return (
  <Button 
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={
                <Button onClick={ () => window.open(item.url, "_blank") }> 
                  <OpenInNewIcon /> 
                </Button>}
              //onClick={ () => window.open(url, "_blank") }
  >
    <Checkbox color="default" 
      onChange={handleSelection}>
    </Checkbox>
    { item.name }
  </Button>)
};

export default Link;
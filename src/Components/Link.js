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
    for (id of state.selected) {
      if (id == item.id) {
        console.log("FOUND");
        found = true;
        //remove object from selected
        state.setSelected(state.selected.filter(id => id != item.id));
        break;
      }
    }
    if (!found) {
        console.log("NOT FOUND");
        console.log("THIS IS THE SELECTED ARRAY");
        console.log(state.selected);
        state.setSelected(state.selected.push(item.name));
        console.log(state.selected);
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
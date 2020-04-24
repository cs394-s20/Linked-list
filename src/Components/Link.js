import React from 'react';
import 'rbx/index.css';
import { Button, Grid, Paper, Box } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    width: "150px",
    height: "150px",
    borderColor: "#F50257",
    borderWidth: "4px"
  },
  name: {
    display: "block",
    textAlign: "center",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
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
  <Grid item key={item.id}>
    <Paper elevation={2} 
           variant="outlined"
           color="secondary"
           className={classes.paper}
                // startIcon={
                //   <Button onClick={ () => window.open(item.url, "_blank") }> 
                //     <OpenInNewIcon /> 
                //   </Button>}
                // onClick={ () => window.open(url, "_blank") }
    >
    <Checkbox color="default" 
      onChange={handleSelection}
      display="block"
      >
    </Checkbox>
    <Box className={classes.name}>
    { item.name }
    </Box>
  </Paper>
  </Grid>)
};

export default Link;
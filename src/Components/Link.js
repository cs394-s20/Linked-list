import React from 'react';
import 'rbx/index.css';
import { Button, Grid, Paper, Box } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Checkbox from '@material-ui/core/Checkbox';
import ItemTypes from './ItemTypes';
import { useDrag } from 'react-dnd';
import firebase from 'firebase/app';
import 'firebase/database';

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

const changePath = (item, newPath, userState) => {

	const userUID = userState.user.uid;

	console.log(newPath);
	console.log(item);

	// Write the new post's data simultaneously in the posts list and the user's post list.
	firebase.database().ref("users/" + userUID + "/" + item.id + "/path").set(newPath);

	console.log("changepath called");

}

const Link = ({ item, state, userState }) => {
  const classes = useStyles();


  const [{isDragging}, drag] = useDrag({
    item: {type: ItemTypes.BOX },

    end(itemBox, monitor) {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
      	changePath(item, dropResult.newPath, userState);
      }
    },
		collect: monitor => ({
		isDragging: !!monitor.isDragging(),
		}),
  })

  const handleSelection = () => {
    var id = inSelected()
    if (id != undefined) {
        //remove object from selected
        var filterArr = [];
        if (state.selected.selectedItems.length != 1) {
          filterArr = state.selected.selectedItems.filter(id => id != item.id);
        }
        state.setSelected({ selectedItems : filterArr});
    }
    else {
        var newArr = state.selected.selectedItems
        newArr.push(item.id);
        state.setSelected({ selectedItems : newArr});
    }
    console.log(state.selected.selectedItems);
  }

    const inSelected = () => {
      var id;
      for (id of state.selected.selectedItems) {
        if (id == item.id) {
          return id;
        }
      }
      return undefined;
    }

  return (
  <div ref={drag}>
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
	      display="block"
	      checked = {inSelected() != undefined}
	      onChange={handleSelection}>
	    </Checkbox>
	    <Box className={classes.name}>
	    { item.name }
	    </Box>
	  </Paper>
	  </Grid>
  </div>)
};

export default Link;
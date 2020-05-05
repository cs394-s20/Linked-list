import React from 'react';
import 'rbx/index.css';
import { Grid, Paper, Box, Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Checkbox from '@material-ui/core/Checkbox';
import ItemTypes from './ItemTypes';
import { useDrag } from 'react-dnd';
import firebase from 'firebase/app';
import 'firebase/database';
import EditIcon from '@material-ui/icons/Edit';
import OpenModal from "./AddLink.js";
import EditLink from "./EditLink";
const changePath = (item, newPath, userState) => {
  if (newPath != ""){
    const userUID = userState.user.uid;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    firebase.database().ref("users/" + userUID + "/" + item.id + "/path").set(newPath);
  
    console.log("changepath called");
  }
}

const Link = ({ item, state, userState }) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    paper: {
      width: "150px",
      height: "150px",
      borderColor: item.color,
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
        console.log("id is undefined")
        var newArr = state.selected.selectedItems
        newArr.push(item.id);
        state.setSelected({ selectedItems : newArr});
        console.log(newArr)
        console.log(state.selected.selectedItems)
    }
    console.log(state.selected.selectedItems);
  }

  const inSelected = () => {
    var id;
    console.log(state.selected.selectedItems)
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
      <Box className={classes.name} fontWeight="bold">
        { item.name }
	    </Box>
      <Box className={classes.name} fontSize="70%" fontStyle="italic">
        {item.note}
      </Box>
      <Button className="edit-button">
        <EditIcon onClick={() => document.getElementById("edit-link").style.display="block"} />
      </Button>
	  </Paper>
	  </Grid>
    <div id="edit-link" style={{ display: "None"}}>
      <EditLink item={item} state={state} userState={userState} />
    </div>
  </div>
  )
};

export default Link;
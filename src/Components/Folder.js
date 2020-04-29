import React from 'react';
// import 'rbx/index.css';
import { Grid, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import ItemTypes from './ItemTypes';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';
import firebase from 'firebase/app';
import 'firebase/database';

const folder_color = blue[200];



const changePath = (moveFolder, newPath, userState, allItems) => {

	const userUID = userState.user.uid;

	var currItems = allItems.filter(myItem => myItem.path.includes(moveFolder.path + "/" + moveFolder.name));

	for(var currItem of currItems){

		var idx = currItem.path.indexOf(moveFolder.name);


		var str = currItem.path.substring(idx, currItem.path.length);

		var newStr = newPath + "/" + str;

		firebase.database().ref("users/" + userUID + "/" + currItem.id + "/path").set(newStr);

	}


	firebase.database().ref("users/" + userUID + "/" + moveFolder.id + "/path").set(newPath);

	console.log("changepath called");

}

const Folder = ({ item, state, selectedState, userState, itemList}) => {
  const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    width: "150px",
    height: "120px",
    backgroundColor: item.color,
    borderTopLeftRadius: "0px"
  },
  topleftbox: {
    width: "80px",
    height: "30px",
    backgroundColor: item.color,
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
  },
  note: {
    display: "block",
    textAlign: "center",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
  }
}));
  const classes = useStyles();


	const [{isDragging}, drag] = useDrag({
	    item: {type: ItemTypes.BOX },

	    end(itemBox, monitor) {
	      const dropResult = monitor.getDropResult()
	      if (item && dropResult) {
	      	changePath(item, dropResult.newPath, userState, itemList);
	      }
	    },
			collect: monitor => ({
			isDragging: !!monitor.isDragging(),
			}),
	  })

  const newPath = item.path + "/" + item.name;

  const [, drop] = useDrop({
	  accept: ItemTypes.BOX,
	  drop: () => ({
		name: `${newPath}`,
      	newPath,
	}),

	collect: monitor => ({
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	})
	})

  const handleSelection = () => {
    var id = inSelected()
    if (id != undefined) {
        //remove object from selected
        var filterArr = [];
        if (selectedState.selected.selectedItems.length != 1) {
          filterArr = selectedState.selected.selectedItems.filter(id => id != item.id);
        }
        selectedState.setSelected({ selectedItems : filterArr});
    }
    else {
        var newArr = selectedState.selected.selectedItems
        newArr.push(item.id);
        selectedState.setSelected({ selectedItems : newArr});
    }
    
  }

  const inSelected = () => {
      var id;
      for (id of selectedState.selected.selectedItems) {
        if (id == item.id) {
          return id;
        }
      }
      return undefined;
    }

  console.log(item.color);
  console.log(item);
  
  return (
  	<div ref={drag}>
  	<div ref={drop}>
	  <Grid item key={item.id}>
	    <Box>
	    <Paper
	      elevation={0}
	      className={classes.topleftbox}
	      square 
	      >
	        <Checkbox color="default"
	            checked = {inSelected() != undefined}
	            onChange={handleSelection}>
	        </Checkbox>
	      </Paper>
	    <Paper 
	      elevation={0}
	      className={classes.paper}
	      onClick={ () => state.setPath(state.path + "/" + item.name) }
	      >
	        <Box className={classes.name} fontWeight="bold">
	        { item.name }
	        </Box>
          <Box className={classes.note} fontSize="70%" fontStyle="italic">
            {item.note}
          </Box>
	    </Paper>
	    </Box>
	  </Grid>
  </div>
  </div>)

};



export default Folder;
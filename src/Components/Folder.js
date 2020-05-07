import React from 'react';
import { Grid, Paper, Box, Button, Modal, TextField, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import ItemTypes from './ItemTypes';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';
import firebase from 'firebase/app';
import 'firebase/database';
import EditIcon from '@material-ui/icons/Edit';

const folder_color = blue[200];

const changePath = (moveFolder, newPath, userState, allItems) => {
  if (newPath != ""){
    const userUID = userState.user.uid;
    var currItems = allItems.filter(myItem => myItem.path.includes(moveFolder.path + "/" + moveFolder.name));
    for(var currItem of currItems){
      var idx = currItem.path.indexOf(moveFolder.name);
      var str = currItem.path.substring(idx, currItem.path.length);
      var newStr = newPath + "/" + str;
      firebase.database().ref("users/" + userUID + "/" + currItem.id + "/path").set(newStr);
    }
    firebase.database().ref("users/" + userUID + "/" + moveFolder.id + "/path").set(newPath);
  }
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



const Folder = ({ item, state, selectedState, userState, itemList}) => {
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [colorState, setColor] = React.useState("#DCDFE7");

  const handleColor = (color) => {
    setColor(color);
  };

  const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
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
  },
  ModalPaper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
    folderColor: {
      backgroundColor: colorState,
    },
}));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const editJSON = ({ item, userState }, colorState) => {
    const userUID = userState.user.uid;
    const thisItemKey = item.id;
    const newName = document.getElementById('editFolderName').value;
    var newItem = {
        "name": newName,
        "type": "folder",
        "path": item.path,
        "note": document.getElementById('editFolderNote').value,
        "id": thisItemKey,
        "color": colorState
    };

    var currItems = itemList.filter(myItem => myItem.path.includes(item.path + "/" + item.name));
    for(var currItem of currItems){

      var newPath = currItem.path.replace(item.name, newName);
      firebase.database().ref("users/" + userUID + "/" + currItem.id + "/path").set(newPath);
    }

    // Write the new post's data simultaneously in the posts list and the user's post list.
    firebase.database().ref("users/" + userUID + "/" + thisItemKey).set(newItem);

    handleClose();
}

  const body = (
    <div style={modalStyle} className={classes.ModalPaper}>
      <h2 id="simple-modal-title">Edit Folder</h2>
      <TextField id="editFolderName" label="Folder Title" defaultValue={item.name} />
      <TextField id="editFolderNote" label="Note" defaultValue={item.note} helperText="optional note (50 char limit)" inputProps={{ maxLength: 50, }}/>
      <ButtonGroup style={{paddingTop:"10px", paddingBottom:"10px"}} >
          <Button id="red-btn" onClick ={() => handleColor("#e64343")}/>
          <Button id="yellow-btn" onClick ={() => handleColor("#f2e874")}/>
          <Button id="green-btn" onClick ={() => handleColor("#24960e")}/>
          <Button id="aqua-btn" onClick ={() => handleColor("#43e6b5")}/>
          <Button id="blue-btn" onClick ={() => handleColor("#3C72DE")}/>
          <Button id="purple-btn" onClick ={() => handleColor("#7b1da3")}/>
          <Button id="pink-btn" onClick ={() => handleColor("#D23CDE")}/>
      </ButtonGroup>
      <ButtonGroup>
        <Button onClick = {handleClose}>Cancel</Button>
        <Button className = {classes.folderColor} onClick = { () => editJSON({item, userState}, colorState)}>Save</Button>
      </ButtonGroup>
    </div>
  );

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
  
  return (
  	<div ref={drag}>
  	<div ref={drop}>
	  <Grid item key={item.id}>
	    <Box>
	    <Paper
	      elevation={0}
	      className={classes.topleftbox}
	      square >
	        <Checkbox color="default"
	            checked = {inSelected() != undefined}
	            onChange={handleSelection}>
	        </Checkbox>
          <Button style={{ minWidth:"0px"}} size={"small"} className="edit-button">
            <EditIcon fontSize={"small"} onClick={handleOpen}/>
          </Button>
	      </Paper>
	    <Paper 
	      elevation={0}
	      className={classes.paper} >
          <div onClick={ () => state.setPath(state.path + "/" + item.name) }>
            <Box className={classes.name} fontWeight="bold">
              { item.name }
            </Box>
            <Box className={classes.note} fontSize="70%" fontStyle="italic">
              {item.note}
            </Box>
          </div>
          
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          >
          {body}
        </Modal>
	    </Paper>

	    </Box>
	  </Grid>
  </div>
  </div>)

};



export default Folder;
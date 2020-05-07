import React from 'react';
import { Grid, Paper, Box, Button, Modal, Container, TextField, ButtonGroup } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ItemTypes from './ItemTypes';
import { useDrag } from 'react-dnd';
import firebase from 'firebase/app';
import 'firebase/database';
import EditIcon from '@material-ui/icons/Edit';
import OpenModal from "./AddLink.js";

const changePath = (item, newPath, userState) => {
  if (newPath != ""){
    const userUID = userState.user.uid;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    firebase.database().ref("users/" + userUID + "/" + item.id + "/path").set(newPath);
  
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

var folderColor = "#DCDFE7"

const handleColor = (color) => {
  folderColor = color;
};

const Link = ({ item, state, userState }) => {

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [colorState, setColor] = React.useState("#DCDFE7");

  const handleColor = (color) => {
    setColor(color);
  };

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
    ModalPaper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

    linkColor: {
      backgroundColor: colorState,
    }
  }));

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const editJSON = ({ item, userState }, folderColor) => {

    const userUID = userState.user.uid;
    const thisItemKey = item.id;
    var newItem = {
        "name": document.getElementById('editLinkName').value,
        "type": "link",
        "path": item.path,
        "url": document.getElementById('editLinkUrl').value,
        "note": document.getElementById('editLinkNote').value,
        "id": thisItemKey,
        "color": folderColor
    };
    // Write the new post's data simultaneously in the posts list and the user's post list.
    firebase.database().ref("users/" + userUID + "/" + thisItemKey).set(newItem);
    handleClose();
    return;
}

  const body = (
    <div style={modalStyle} className={classes.ModalPaper}>
      <h2 id="simple-modal-title">Add Link</h2>
      <TextField id="editLinkName" label="Link Title" defaultValue={item.name} />
      <TextField id="editLinkUrl" label="Link URL" defaultValue={item.url} helperText="must be full url, ex: https://www.google.com"/>
      <TextField id="editLinkNote" label="Note" defaultValue={item.note} helperText="optional note (50 char limit)" inputProps={{ maxLength: 50, }}/>
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
        <Button className = {classes.linkColor} onClick = { () => editJSON({item, userState}, colorState)}>Save</Button>
      </ButtonGroup>
    </div>
  );


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
	                	    >
	    <Checkbox color="default" 
	      display="block"
	      checked = {inSelected() != undefined}
	      onChange={handleSelection}>
	    </Checkbox>
      <Button style={{ minWidth:"0px", marginLeft:"60px"}} className="edit-button">
        <EditIcon fontSize={"small"} onClick={handleOpen}/>
      </Button>
      <Box className={classes.name} fontWeight="bold">
        <Typography style={{ wordWrap: "break-word" }}>
          { item.name }
        </Typography>
	    </Box>
      <Box className={classes.name} fontSize="70%" fontStyle="italic">
        {item.note}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
      >
        {body}
      </Modal>

	  </Paper>
	  </Grid>
  </div>
  )
};

export default Link;
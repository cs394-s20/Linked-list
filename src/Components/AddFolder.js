import React from 'react';
import '../App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'rbx/index.css';
import './colors.css';
//import { Button, Modal, Field, Label, Control, Input, Container } from 'rbx';
import { Modal, Container, Button, InputLabel, TextField, ButtonGroup} from '@material-ui/core';
import '../index.css';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const closeModal = () => {
  document.getElementById("folderModal").style.display="none";
  document.getElementById("add-folder").style.display="block";
  document.getElementById("add-link").style.display="block";
}

// const OpenModal = ( { state, userState }) => {
// //console.log(state.path);
//   var folderColor = "#DCDFE7"
//   return (
//     <div style={{color: "white !important"}}>
//         <Modal.Background />
//           <Modal.Content>
//           <Field>
//             <Label style={{color:"white !important"}}>Folder Title</Label>
//             <Control>
//               <Input id="folderTitle" type="text" placeholder="Classes" />
//             </Control>
//           </Field>
//           <Field>
//             <Label>Folder Note</Label>
//             <Control>
//               <Input id="folderNote" type="text" placeholder="optional note (50 char limit)" maxlength="50"/>
//             </Control>
//           </Field>
//           <Label style={{color:"white !important"}}>Folder Color</Label>
//             <Button.Group style={{paddingTop:"10px"}} >
//               <Button id="red-btn" onClick ={() => handleColor("#e64343")}/>
//               <Button id="yellow-btn" onClick ={() => handleColor("#f2e874")}/>
//               <Button id="green-btn" onClick ={() => handleColor("#24960e")}/>
//               <Button id="aqua-btn" onClick ={() => handleColor("#43e6b5")}/>
//               <Button id="blue-btn" onClick ={() => handleColor("#3C72DE")}/>
//               <Button id="purple-btn" onClick ={() => handleColor("#7b1da3")}/>
//               <Button id="pink-btn" onClick ={() => handleColor("#D23CDE")}/>
//             </Button.Group>
//           </Modal.Content>
//           <Button.Group style={{paddingTop:"10px"}} align="centered">
//             <Button onClick = { () => closeModal()}>Cancel</Button>
//             <Button color="danger" onClick = { () => updateJSON({state, userState}, folderColor)}>
//             Create Folder </Button>
//           </Button.Group>
//     </div>

//   )
// };



const AddFolder = ( { state, userState } ) => {
  var folderColor = "#DCDFE7"
  const handleColor = (color) => {
    folderColor = color;

  };


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
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const updateJSON = ( { state, userState }, color ) => {
    // Get a key for a new Post.
    
    // this might break things - decide which newItem key to use
    //var newItemKey = firebase.database().ref().child('items').push().key;
    
    //console.log(state.path);
    // Get a key for a new Post.
    const userUID = userState.user.uid;
    var newItemKey = firebase.database().ref("users").child(userUID).push().key;
    
    var item = {
      "name": document.getElementById('folderTitle').value,
      "type": "folder",
      "path": state.path,
      "note": document.getElementById("folderNote").value,
      "id": newItemKey,
      "color": color
    };
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    firebase.database().ref("users/" + userUID + "/" + newItemKey).set(item);
    handleClose();
    document.getElementById('folderTitle').value = "";
    return;
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add Folder</h2>
      <TextField id="folderTitle" label="Folder Title" />
      <TextField id="folderNote" label="Note" helperText="optional note (50 char limit)" inputProps={{ maxLength: 50, }}/>
      <h1>Folder Color</h1>
      <ButtonGroup style={{paddingTop:"10px"}} >
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
        <Button onClick = { () => updateJSON({state, userState}, folderColor)}>Add Folder</Button>
      </ButtonGroup>
    </div>
  );

  //console.log(state);
  const openForm = () => {
    document.getElementById("folderModal").style.display="block";
    document.getElementById("add-folder").style.display="None";
    document.getElementById("add-link").style.display="None";
  }

  return (
    // <Container>
    //   <div id="folderModal" style={{ display: "None" }}>
    //     <OpenModal state={ state } userState= { userState }></OpenModal>
    //   </div>
    //   <Button id="add-folder" onClick = { () =>  openForm()} >
    //     <AddIcon />
    //       Folder
    //   </Button>
    // </Container>
    <Container >

      <Button variant="contained" type="button" onClick={handleOpen}>
        Add Folder
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
      >
        {body}
      </Modal>
    </Container>
  )

};

export default AddFolder;
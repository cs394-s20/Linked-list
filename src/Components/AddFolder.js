import React from 'react';
import '../App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'rbx/index.css';
import { Button, Modal, Field, Label, Control, Input, Container } from 'rbx';
import '../index.css';
import { Fab } from '@material-ui/core';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

const closeModal = () => {
  document.getElementById("folderModal").style.display="none";
  document.getElementById("add-folder").style.display="block";
  document.getElementById("add-link").style.display="block";
}

const updateJSON = ( { state } ) => {
  // Get a key for a new Post.
  var newItemKey = firebase.database().ref().child('items').push().key;
  var item = {
    "name": document.getElementById('folderTitle').value,
    "type": "folder",
    "path": state.path,
    "id": newItemKey
  };
  //console.log(state.path);

  // Write the new post's data simultaneously in the posts list and the user's post list.
  firebase.database().ref("items/" + newItemKey).set(item);
  closeModal();
  document.getElementById('folderTitle').value = "";
  return;
}

const OpenModal = ( { state }) => {
//console.log(state.path);
  return (
    <div style={{color: "white !important"}}>
        <Modal.Background />
          <Modal.Content>
          <Field>
            <Label style={{color:"white !important"}}>Folder Title</Label>
            <Control>
              <Input id="folderTitle" type="text" placeholder="Classes" />
            </Control>
          </Field>
          </Modal.Content>
          <Button.Group style={{paddingTop:"10px"}} align="centered">
            <Button onClick = { () => closeModal()}>Cancel</Button>
            <Button color="danger" onClick = { () => updateJSON({state})}>Create Folder</Button>
          </Button.Group>
    </div>

  )
};

const AddFolder = ( { state } ) => {
  //console.log(state);
  const openForm = () => {
    document.getElementById("folderModal").style.display="block";
    document.getElementById("add-folder").style.display="None";
    document.getElementById("add-link").style.display="None";
  }

  return (
    <Container>
      <div id="folderModal" style={{ display: "None" }}>
        <OpenModal state={ state } ></OpenModal>
      </div>
      <Fab color="danger" id="add-folder" onClick = { () =>  openForm()} >
        <CreateNewFolderIcon/>
      </Fab>
    </Container>
  )

};

export default AddFolder;
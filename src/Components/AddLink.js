import React from 'react';
import '../App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'rbx/index.css';
import { Button, Modal, Field, Label, Control, Input, Container } from 'rbx';
import '../index.css';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


const closeModal = () => {
  document.getElementById("openModal").style.display="none";
  document.getElementById("add-link").style.display="block";
  document.getElementById("add-folder").style.display="block";
}

const updateJSON = ( { state } ) => {
  
  var newItemKey = firebase.database().ref().child('items').push().key;

  var item = {
    "name": document.getElementById('linkTitle').value,
    "type": "link",
    "path": state.path,
    "url": document.getElementById('linkUrl').value,
    "id": newItemKey
  };
  //console.log(state.path);
  // Get a key for a new Post.

  // Write the new post's data simultaneously in the posts list and the user's post list.
  firebase.database().ref("items/" + newItemKey).set(item);
  closeModal();
  document.getElementById('linkTitle').value = "";
  document.getElementById('linkUrl').value = "";
  return;
}

const OpenModal = ( { state }) => {
//console.log(state.path);
  return (
    <div style={{color: "white !important"}}>
        <Modal.Background />
          <Modal.Content>
          <Field>
            <Label style={{color:"white !important"}}>Link Title</Label>
            <Control>
              <Input id="linkTitle" type="text" placeholder="Google" />
            </Control>
          </Field>
          <Field>
            <Label>Link URL</Label>
            <Control>
              <Input id="linkUrl" type="text" placeholder="www.google.com" />
            </Control>
          </Field>
          </Modal.Content>
          <Button.Group style={{paddingTop:"10px"}} align="centered">
            <Button onClick = { () => closeModal()}>Cancel</Button>
            <Button color="link" onClick = { () => updateJSON({state})}>Add Link</Button>
          </Button.Group>
    </div>

  )
};

const AddLink = ( { state } ) => {
  //console.log(state);
  const openForm = () => {
    document.getElementById("openModal").style.display="block";
    document.getElementById("add-link").style.display="None";
    document.getElementById("add-folder").style.display="None";
  }

  return (
    <Container >
      <div id="openModal" style={{ display: "None" }}>
        <OpenModal state={ state } ></OpenModal>
      </div>
      <Fab color="link" id="add-link" onClick = { () =>  openForm()} >
        <AddIcon />
        Link
      </Fab>
    </Container>
  )

};

export default AddLink;
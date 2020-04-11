import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'rbx/index.css';
import { Button, Modal, Field, Label, Control, Input, Container } from 'rbx';
import './index.css';

const closeModal = () => {
  document.getElementById("openModal").style.display="none";
  document.getElementById("add-link").style.display="block";
}

const updateJSON = () => {
  var item = {
    "name": document.getElementById('linkTitle').value,
    "type": "link",
    "path": "/home/",
    "link-url": document.getElementById('linkUrl').value
  };
  // Get a key for a new Post.
  var newItemKey = firebase.database().ref().child('items').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  firebase.database().ref("items/" + newItemKey).set(item);
  closeModal();
  document.getElementById('linkTitle').value = "";
  document.getElementById('linkUrl').value = "";
  return;
}

const OpenModal = () => {
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
            <Button color="link" onClick = { () => updateJSON()}>Add Link</Button>
          </Button.Group>
    </div>

  )
};

const AddLink = ({}) => {
  
  const openForm = () => {
    document.getElementById("openModal").style.display="block";
    document.getElementById("add-link").style.display="None";
  }

  return (
    <Container>
      <div id="openModal" style={{ display: "None" }}>
        <OpenModal></OpenModal>
      </div>
      <Button color="link" id="add-link" onClick = { () =>  openForm()} >
        Add Link
      </Button>
    </Container>
  )

};

export default AddLink;
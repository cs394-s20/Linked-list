import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'rbx/index.css';
import { Button, Modal, Field, Label, Control, Input, Container } from 'rbx';
import './index.css';
import FbApp from './modules/firebase.js';

const db = FbApp.ref();

const closeModal = () => {
  document.getElementById("openModal").style.display="none";
  document.getElementById("add-link").style.display="block"
}
const OpenModal = () => {
  // const link = prompt('Enter link here')
  return (
    <div style={{color: "white !important"}}>
        <Modal.Background />
          <Modal.Content>
          <Field>
            <Label style={{color:"white !important"}}>Link Title</Label>
            <Control>
              <Input type="text" placeholder="Google" />
            </Control>
          </Field>
          <Field>
            <Label>Link URL</Label>
            <Control>
              <Input type="text" placeholder="www.google.com" />
            </Control>
          </Field>
          </Modal.Content>
          <Button.Group style={{paddingTop:"10px"}} align="centered">
            <Button onClick = { () => closeModal()}>Cancel</Button>
            <Button>Add Link</Button>
          </Button.Group>
    </div>

  )
};

const updateJSON = () => {
  var item = {
    name: "Google",
    type: "link",
    path: "/home/",
    linkurl: "www.google.com"
  };
  // Get a key for a new Post.
  var newItemKey = db.child('items').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/items/' + newItemKey] = item;

  return db.update(updates);
}

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
      <Button id="add-link" onClick = { () =>  updateJSON()} >
        Add Link
      </Button>
    </Container>
  )

};

export default AddLink;
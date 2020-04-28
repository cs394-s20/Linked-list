import React from 'react';
import '../App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'rbx/index.css';
import { Button, Modal, Field, Label, Control, Input, Container } from 'rbx';
import '../index.css';
import AddIcon from '@material-ui/icons/Add';
import './colors.css';


const closeModal = () => {
  document.getElementById("openModal").style.display="none";
  document.getElementById("add-link").style.display="block";
  document.getElementById("add-folder").style.display="block";
}

const updateJSON = ( { state, userState }, color ) => {
  
  //might break 
  //var newItemKey = firebase.database().ref().child('items').push().key;

  //console.log(state.path);
  // Get a key for a new Post.
  
  const userUID = userState.user.uid;
  var newItemKey = firebase.database().ref("users").child(userUID).push().key;
  
  var item = {
    "name": document.getElementById('linkTitle').value,
    "type": "link",
    "path": state.path,
    "url": document.getElementById('linkUrl').value,
    "id": newItemKey,
    "color": color
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  firebase.database().ref("users/" + userUID + "/" + newItemKey).set(item);
  closeModal();
  document.getElementById('linkTitle').value = "";
  document.getElementById('linkUrl').value = "";
  return;
}

const OpenModal = ( { state, userState }) => {
//console.log(state.path);
  var folderColor = "#DCDFE7"

  const handleColor = (color) => {
    folderColor = color;

  };
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
              <Input id="linkUrl" type="text" placeholder="must be full url, ex: https://www.google.com"                />
            </Control>
          </Field>
          <Label style={{color:"white !important"}}>Link Color</Label>
          <Button.Group style={{paddingTop:"10px"}} >
          <Button id="red-btn" onClick ={() => handleColor("#e64343")}/>
              <Button id="yellow-btn" onClick ={() => handleColor("#f2e874")}/>
              <Button id="green-btn" onClick ={() => handleColor("#24960e")}/>
              <Button id="aqua-btn" onClick ={() => handleColor("#43e6b5")}/>
              <Button id="blue-btn" onClick ={() => handleColor("#3C72DE")}/>
              <Button id="purple-btn" onClick ={() => handleColor("#7b1da3")}/>
              <Button id="pink-btn" onClick ={() => handleColor("#D23CDE")}/>
          </Button.Group>
          </Modal.Content>
          <Button.Group style={{paddingTop:"10px"}} align="centered">
            <Button onClick = { () => closeModal()}>Cancel</Button>
            <Button color="link" onClick = { () => updateJSON({state, userState}, folderColor)}>Add Link</Button>
          </Button.Group>
    </div>

  )
};

const AddLink = ( { state, userState } ) => {
  //console.log(state);
  const openForm = () => {
    document.getElementById("openModal").style.display="block";
    document.getElementById("add-link").style.display="None";
    document.getElementById("add-folder").style.display="None";
  }

  return (
    <Container >
      <div id="openModal" style={{ display: "None" }}>
        <OpenModal state={ state } userState= { userState } ></OpenModal>
      </div>
      <Button id="add-link" onClick = { () =>  openForm()} >
        <AddIcon />
        Link
      </Button>
    </Container>
  )

};

export default AddLink;
import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'rbx/index.css';
import { Button, Modal, Field, Label, Control, Input, Container } from 'rbx';
import './index.css';

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
            <Button onClick = { () => document.getElementById("openModal").style.display="none"}>Cancel</Button>
            <Button>Add Link</Button>
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
      <Button id="add-link" onClick = { () =>  openForm()} >
        Add Link
      </Button>
    </Container>
  )

};

export default AddLink;
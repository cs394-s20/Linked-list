import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'rbx/index.css';
import { Button, Modal, Field, Label, Control, Input, Container } from 'rbx';


const OpenModal = () => {
  // const link = prompt('Enter link here')
  return (
    <div className="ModalWrapper">
      <Modal.Background />
        <Modal.Content>
        <Field>
          <Label>Link Title</Label>
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
        <Modal.Close onClick = { () => document.getElementById("openModal").style.display="none"}/>
      
    </div>

  )
};


const AddLink = ({}) => {
  
  return (
    <Container>
      <div id="openModal" style={{ display: "None" }}>
        <OpenModal></OpenModal>
      </div>
      <Button onClick = { () => document.getElementById("openModal").style.display="block" } >
        Add Link
      </Button>
    </Container>
  )

};

export default AddLink;
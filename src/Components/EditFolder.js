import React from 'react';
import '../App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'rbx/index.css';
import { Button, Modal, Field, Label, Control, Input, Container } from 'rbx';
import '../index.css';
import AddIcon from '@material-ui/icons/Add';
import './colors.css';

const EditFolder = ({item, state, userState}) => {
    console.log(item);
    const editJSON = ({ item, userState }) => {
        const userUID = userState.user.uid;
        const thisItemKey = item.id;
        var newItem = {
            "name": document.getElementById('editFolderName').value,
            "type": "folder",
            "path": item.path,
            "note": document.getElementById('editFolderNote').value,
            "id": thisItemKey,
            "color": item.color
        };
        // Write the new post's data simultaneously in the posts list and the user's post list.
        firebase.database().ref("users/" + userUID + "/" + thisItemKey).set(newItem);
        closeModal();
    }
    var folderColor = "#DCDFE7"
    const closeModal = () => {
        document.getElementById("edit-folder").style.display="none";
        document.getElementById("add-link").style.display="block";
        document.getElementById("add-folder").style.display="block";
      }
    const handleColor = (color) => {
        item.color = color;
    };
    return (
        <Container>
            <div style={{color: "white !important"}}>
                <Modal.Background />
                <Modal.Content>
                <Field>
                    <Label style={{color:"white !important"}}>Folder Title</Label>
                    <Control>
                        <Input defaultValue = {item.name} id="editFolderName" type="text" placeholder="Classes" />
                    </Control>
                </Field>
                <Field>
                    <Label>Folder Note</Label>
                    <Control>
                        <Input defaultValue = {item.note} id="editFolderNote" type="text" placeholder="optional note (50 char limit)" maxlength="50"/>
                    </Control>
                </Field>
                <Label style={{color:"white !important"}}>Folder Color</Label>
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
                    <Button color="danger" onClick = { () => editJSON({item, userState})}>
                    Save</Button>
                </Button.Group>
            </div>
        </Container>
    )
};
export default EditFolder;
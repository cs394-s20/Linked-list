import React from 'react';
import '../App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'rbx/index.css';
import { Button, Modal, Field, Label, Control, Input, Container } from 'rbx';
import '../index.css';
import AddIcon from '@material-ui/icons/Add';
import './colors.css';
import { updateJSON } from './AddLink';
const EditLink = ({item, state, userState}) => {
    console.log(item);
    const editJSON = ({ item, userState }) => {

        const userUID = userState.user.uid;
        const thisItemKey = item.id;
        var newItem = {
            "name": document.getElementById('editLinkName').value,
            "type": "link",
            "path": item.path,
            "url": document.getElementById('editLinkUrl').value,
            "note": document.getElementById('editLinkNote').value,
            "id": thisItemKey,
            "color": item.color
        };
        // Write the new post's data simultaneously in the posts list and the user's post list.
        firebase.database().ref("users/" + userUID + "/" + thisItemKey).set(newItem);
        closeModal();
        return;
    }
    var folderColor = "#DCDFE7"
    const closeModal = () => {
        document.getElementById("edit-link").style.display="none";
        document.getElementById("add-link").style.display="block";
        document.getElementById("add-folder").style.display="block";
      }
    const handleColor = (color) => {
        item.color = color;
    };
    return (
        <Container>
            <div style={{ padding: "5px", color: "white !important"}}>
            <Modal.Background />
            <Modal.Content>
            <Field>
                <Label style={{color:"white !important"}}>Link Title</Label>
                <Control>
                <Input defaultValue={item.name} id="editLinkName" type="text" placeholder="Google" />
                </Control>
            </Field>
            <Field>
                <Label>Link URL</Label>
                <Control>
                <Input defaultValue={item.url} id="editLinkUrl" type="text" placeholder="must be full url, ex: https://www.google.com"                />
                </Control>
            </Field>
            <Field>
                <Label>Link Note</Label>
                <Control>
                <Input defaultValue={item.note} id="editLinkNote" type="text" placeholder="optional note (50 char limit)" maxlength="50"/>
                </Control>
            </Field>
            <Label style={{color:"white !important"}}>Link Color</Label>
            <Button.Group style={{paddingTop:"10px"}} >
            <Button id="red-btn" selected={item.color=="#e64343"} onClick ={() => handleColor("#e64343")}/>
                <Button id="yellow-btn" selected={item.color=="#f2e874"} onClick ={() => handleColor("#f2e874")}/>
                <Button id="green-btn" selected={item.color=="#24960e"} onClick ={() => handleColor("#24960e")}/>
                <Button id="aqua-btn" selected={item.color=="#43e6b5"} onClick ={() => handleColor("#43e6b5")}/>
                <Button id="blue-btn" outlined={false} onClick ={() => handleColor("#3C72DE")}/>
                <Button id="purple-btn" outlined={item.color=="#7b1da3"} onClick ={() => handleColor("#7b1da3")}/>
                <Button id="pink-btn" outlined={false} onClick ={() => handleColor("#D23CDE")}/>
            </Button.Group>
            </Modal.Content>
            <Button.Group style={{paddingTop:"10px"}} align="centered">
                <Button onClick = { () => closeModal()}>Cancel</Button>
                <Button color="link" onClick = { () => editJSON({item, userState})}>Save</Button>
            </Button.Group>
            </div>
        </Container>
    )
};
export default EditLink;
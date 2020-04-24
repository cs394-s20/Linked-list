import React from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';
import { Fab } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const atHome = path => {
    return path === "/home"
}

const newPath = path => {
    const index = path.lastIndexOf("/")
    return path.substring(0, index)
}

const BackButton = ({ name, state }) => {
    
    
  return (
  <Button
        display="inline"
        aria-label="add"
        onClick={ () => state.setPath(newPath(state.path))} 
        disabled = { atHome(state.path) } >
        <KeyboardBackspaceIcon />
  </Button>)

};

// const Folder = ({ name }) => {
// 	console.log("Folder");
//   return (<Button  >
//        { name }
//   </Button>)

// };

export default BackButton;
import React, { useState, useEffect }from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';

const atHome = path => {
    return path === "/home"
}

const newPath = path => {
    const index = path.lastIndexOf("/")
    return path.substring(0, index)
}

const BackButton = ({ name, state }) => {
    
    
  return (<Button onClick={ () => state.setPath(newPath(state.path))} disabled = { atHome(state.path) } >
       { "Back" }
  </Button>)

};

// const Folder = ({ name }) => {
// 	console.log("Folder");
//   return (<Button  >
//        { name }
//   </Button>)

// };

export default BackButton;
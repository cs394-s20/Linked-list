import React from 'react';
import { Button } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

const atHome = path => {
    return path === "/home"
}

const getNewPath = path => {
    const index = path.lastIndexOf("/")
    return path.substring(0, index)
}

const BackButton = ({ state }) => {

  const newPath = getNewPath(state.path);

  const [, drop] = useDrop({
      accept: ItemTypes.BOX,
      drop: () => ({
        name: `${newPath}`,
          newPath,
      }),
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      })
  })
    
  return (
    <div ref={drop}>
      <Button
        variant = "contained"
        display="inline"
        aria-label="add"
        onClick={ () => state.setPath(getNewPath(state.path))} 
        disabled = { atHome(state.path) } >
        <KeyboardBackspaceIcon />
      </Button>
    </div>)

};

export default BackButton;
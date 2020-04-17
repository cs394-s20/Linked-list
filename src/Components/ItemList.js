import React, { useState, useEffect }from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';
import  Folder from './Folder';
import  Link from './Link';

const classes = ["CS 394", "COMP_LIT 202", "PSYCH 221", "CS 212"];





// const useSelection = () => {
//   const [selected, setSelected] = useState([]);
//   const toggle = (x) => {
//     setSelected(selected.includes(x) ? selected.filter(y => y !== x) : [x].concat(selected))
//   };
//   return [ selected, toggle ];
// };


const chooseItem = (state,item) => {

  if(item.type === "Folder"){
    //console.log("if folder")
    return (<Folder name= {item.name} />)
  }else{
    return (<Link name= {item.name} url={item.url}/>)
  }
}



const ItemList = ({ state,itemState }) => {
    const [selected, setSelected] = useState({ selectedItems: []});
    
    var items = Object.values(itemState.data.items);
  
    var pathItems = items.filter(item => item.path === state.path);
   useEffect(() => {
      pathItems = items.filter(item => item.path === state.path);
   }, [state.path])
   
    return (
      <React.Fragment>
        <Button.Group>
          { 
            pathItems.map(item =>
             (item.type === "folder") ? (<Folder item= {item} state={state} />) :  (<Link item={item} state= { { selected, setSelected } }  /> ))
            
          }

        </Button.Group>
      </React.Fragment>
    );
};

export default ItemList;
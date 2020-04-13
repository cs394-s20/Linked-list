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

  //console.log("chooseItem");

  // if(item.type === "Folder"){
  //   console.log("if folder")
  //   return (<Folder name= {item.name} state={ {path:state.path, setPath:state.setPath} } />)
  // }else{
  //   return (<Link name= {item.name} url={item.url}/>)
  // }

  if(item.type === "Folder"){
    //console.log("if folder")
    return (<Folder name= {item.name} />)
  }else{
    return (<Link name= {item.name} url={item.url}/>)
  }
}

const ItemList = ({ state,itemState }) => {
  
 // const [selected, toggle] = useSelection();
  //console.log(itemState.data)

    var items = Object.values(itemState.data.items);
    //console.log(items);
  
    var pathItems = items.filter(item => item.path === state.path);
  // console.log("pathitems");
  // console.log(pathItems);
  // console.log(state);
  //console.log(pathItems);
   useEffect(() => {
     //console.log("useEffect happened")
      pathItems = items.filter(item => item.path === state.path);
   }, [state.path])
   
    return (
      <React.Fragment>
        <Button.Group>
          { 
            pathItems.map(item =>
            (item.type === "folder") ? (<Folder name= {item.name} state={state} />) :  (<Link name= {item.name} url={item.url}/>))
          }

        </Button.Group>
      </React.Fragment>
    );
};

export default ItemList;
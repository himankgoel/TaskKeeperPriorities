import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import EditIcon from '@material-ui/icons/Edit';


function Note(props) {

  const [note,setNote] = useState({
    id : props.id,
    title : props.title,
    content : props.content,
    priority : props.priority,
    date : props.date
  });
  
  const [beingEdited , setBeingEdited] = useState(false);


    function handleChange(event) {
      const { name, value } = event.target;
  
      setNote(prevNote => {
        return {
          ...prevNote,
          [name]: value
        };
      });
    }
  function handleClickDelete() {
    props.onDelete(props.id);
  }

  function handleClickEdit(){
    setBeingEdited(true);
  }

  function handleClickAway(){
    if(beingEdited){
    props.onEdit(note);
    setBeingEdited(false);
  }
    
  }
  
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
    <div className="note">
      {beingEdited ? <label>
          Priority :    <br></br>
          <select value={note.priority} name="priority" onChange={handleChange}>
            <option value="High">High</option>
            <option value="Low">Low</option> 
          </select>
          </label> : null}
     
      {beingEdited ? 
        <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />: <h1>{note.title}</h1>}
      {beingEdited ? <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
        /> : <p>{note.content}</p>}
      
      <button onClick={handleClickDelete}>
        <DeleteIcon />
      </button>
      <button type="button"onClick={handleClickEdit}>
        <EditIcon />
      </button>

      <div
        style={{ color: "grey", display: "inline-block", fontStyle: "italic" }}
      >
        {props.date}
      </div>

      <button
        style={props.priority === "High" ? { backgroundColor: "red" } : null}
      >
        {props.priority === "High" ? <PriorityHighIcon /> : <LowPriorityIcon />}
      </button>
        
    </div>
    </ClickAwayListener>
  );
}

export default Note;

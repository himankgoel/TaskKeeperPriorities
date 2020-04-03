import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import uuid from "uuid";


function CreateArea(props) {
  const [note, setNote] = useState({
    id: uuid(),
    title: "",
    content: "",
    date : new Date().toLocaleDateString(),
    priority : "High"
  });
  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      id: uuid(),
      title: "",
      content: "",
      date:new Date().toLocaleDateString(),
      priority:"High"
    });
    event.preventDefault();
  }

  function handleFocus() {
    setIsExpanded(true);
  }

  function handleClickAway(){
    if(isExpanded){
      setIsExpanded(false);
    }
  }

  return (
    <div>
      <ClickAwayListener onClickAway={handleClickAway}>
      <form className="create-note col-lg-6">
        {isExpanded && <label>
          Priority :    <br></br>
          <select value={note.priority} name="priority" onChange={handleChange}>
            <option value="High">High</option>
            <option value="Low">Low</option> 
          </select>
          </label>}
          {isExpanded && <hr></hr>}
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleFocus}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
        
        
        
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote} style={{backgroundColor : "#005082"}}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
      </ClickAwayListener>
    </div>
  );
}

export default CreateArea;

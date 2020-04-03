import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import io from "socket.io-client";


const socket = io("http://localhost:5000");

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) { 
    
    setNotes(prevNotes => {
      socket.emit("notes-change-add",newNote);
      return [...prevNotes, newNote]; 
    });
  }

  function onEdit(note){
    socket.emit("notes-change-edit",note);
  }

  function deleteNote(id) {
    setNotes(() => {
      socket.emit("notes-change-delete" , id);
      return notes.filter((noteItem) => {
        return noteItem.id !== id;
      });
    });
  }


  useEffect(() => {
    socket.on("initial-notes-remote", (notes) => {
      setNotes(notes);
    });
    socket.on("notes-change-remote",(notesRecieved) => {
      setNotes(notesRecieved);
    });
  },[notes]);

  
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem.title + noteItem.content + noteItem.priority}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            date={noteItem.date}
            priority={noteItem.priority}
            onDelete={deleteNote}
            onEdit={onEdit}
          />
        );
      })}
    </div>
  );
}

export default App;

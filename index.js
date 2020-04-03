const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 5000 || process.env.PORT;
const notes = [];



io.on('connection', function(socket){ 
  socket.emit("initial-notes-remote" , notes);  


  socket.on("notes-change-add",(note) => {
    notes.push(note);
    socket.broadcast.emit("notes-change-remote",notes);   
  });

   socket.on("notes-change-delete",(id) => {
     notes.forEach((note,index) => {
       if(note.id === id){
          notes.splice(index,1);
       }
     });
     socket.broadcast.emit("notes-change-remote",notes);
   });


   socket.on("notes-change-edit",(note) => {
     console.log("note",note);
     notes.forEach((noteItem,index) => {
       if(noteItem.id === note.id){
         notes.splice(index,1,note)
       }
     });
     console.log("notes",notes);
     socket.broadcast.emit("notes-change-remote",notes);
   });

});


if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
  app.get("*",(req,res) => {
      res.sendFile(path.resolve(__dirname,"client","build","index.html"));
  });
}

http.listen(PORT, function(){
  console.log('listening on ' + PORT);
});
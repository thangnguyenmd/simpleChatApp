const express = require("express");
const socket = require("socket.io")
const app = express();

//set the template engine ejs
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));

//routes
app.get("/", (req, res) => {
  res.render("index");
});

//routes
app.get("/ping", (req, res) => {
  res.send("pong");
});

//Listen on port 3000
server = app.listen(3000);
console.log("Server listen on port 3000");

//socket.io instantiation
const io = socket(server);

//listen on every connection
io.on("connection", (socket) => {
  var address = socket.request.connection.remoteAddress;
  console.log('New connection from ' + address.address + ':' + address.port);

  //default username
  socket.username = "Anonymous";

  //listen on change_username
  socket.on("change_username", (data) => {
    socket.username = data.username;
  });

  //listen on new_message
  socket.on("new_message", (data) => {
    //broadcast the new message
    io.sockets.emit("new_message", {
      message: data.message,
      username: socket.username,
    });
  });

  //listen on typing
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", { username: socket.username });
  });
});

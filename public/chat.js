$(function () {
  //make connection
  var socket = io.connect("http://14.231.255.163:3000/");

  //buttons and inputs
  var message = $("#message");
  var username = $("#username");
  var send_message = $("#send_message");
  var send_username = $("#send_username");
  var chatroom = $("#chatroom");
  var feedback = $("#feedback");

  //Emit message
  send_message.click(function () {
    socket.emit("new_message", { message: message.val() });
  });

  //Listen on new_message
  socket.on("new_message", (data) => {
    message.val("")
    chatroom.append(
      "<p class='message'>" + data.username + ": " + data.message + "</p>"
    );
  });

  //Emit a username
  send_username.click(function () {
    socket.emit("change_username", { username: username.val() });
  });

  //Emit typing
  message.bind("keypress", (e) => {
    if (e.which == 13) {
      socket.emit("new_message", { message: message.val() });
    }
    socket.emit("typing");
  });

  //Listen on typing
  socket.on("typing", (data) => {
    feedback.html(
      "<p><i>" + data.username + " is typing a message..." + "</i></p>"
    );
  });
});

const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var multer = require("multer");
var cors = require("cors");

//const path = require("path");
//need to delete file
const fs = require("fs");

//const client = require("socket.io").listen(5000).sockets;
var upload = multer({ dest: "uploads/" });
//const fs = require("fs");

//var upload = multer({ dest: "uploads /" });

//const users = require("./src/routes/api/users");
const AuthRoute = require("./src/routes/auth/authroute");
const AdminRoute = require("./src/routes/auth/admin");
const BookRoute = require("./src/routes/book/bookroutes");
const pro = require("./src/routes/uploadroute/profile");
const u = require("./src/routes/uploadroute/u");
const actor = require("./src/routes/author/author");
const borrow = require("./src/routes/Borrowroute/borrowroute");
const categ = require("./src/routes/category/Categoryroute");
//const chatUsercontroller = require("./src/controllers/chatUsersController");

//require the http module
//const http = require("http").Server(app);

// require the socket.io module
//const io = require("socket.io");
//integrating socketio
//socket = io(http);

var multer = require("multer");
const parser = require("./src/middlleware/routing");
const boorow_verif = require("./src/middlleware/BorrowMiddleware");

var upload = multer({ dest: "uploads/" });

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/db_first", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.use(cors());

app.use("/AuthRoute", AuthRoute);
app.use("/AdminRoute", AdminRoute);
app.use("/BookRoute", BookRoute);
app.use("/profiles", pro);
app.use("/test", u);
app.use("/borrow", borrow);
app.use("/categ", categ);

app.use(express.static(__dirname + "/uploads"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (data) => {
    console.log("Client joined", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () =>
  console.log(`Server up and running on port ${port} !`)
);

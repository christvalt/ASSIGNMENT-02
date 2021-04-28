const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
var cors = require("cors");

app.get('/', function (req, res) {
  res.send('Hello World!');
 });
app.use(cors());

const GetTrain = require("./routes/routes");
//const AdminRoute = require("./routes/routes");;

app.use("/routes", GetTrain);

app.use(express.static(__dirname + "/uploads"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 5000;

server.listen(port, () =>
  console.log(`Server up and running on port ${port} !`)
);

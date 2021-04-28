const express = require('express')
const app = express();
const http = require("http");

var cors = require("cors");
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use(cors());

//const AuthRoute = require("./routes/routes");
//const AdminRoute = require("./routes/routes");;

//app.use("/AuthRoute", AuthRoute);
//app.use("/AdminRoute", AdminRoute);

app.listen(port, () => {
  console.log(`Server up and running on port  ${port}!`)
});
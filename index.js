const express = require("express");
const dbConnection = require("./config/MongoDB");
require("dotenv").config();
const port = process.env.PORT;

const AuthRoutes = require("./routes/BookesRoutes");
const imageupload = require("./routes/SliderRoutes");
const app = express();


dbConnection;
app.use(express.json());

//routes
app.use("/",AuthRoutes,imageupload);

app.listen(port, () => {
  console.log(`server run on ${port}`);
});
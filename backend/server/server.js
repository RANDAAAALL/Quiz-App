const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { verifyToken } = require("../middleware/TokenController");

const app = express();
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// protect all the routes underneath of "/dashboard" 
app.use("/auth/dashboard", verifyToken);

// navigates to the "mainScreen"
// and retrieve the data's
app.get("/auth/dashboard/mainScreen", (req, res) => {
  res.status(200).json({
    "UserEmailFromServer": req?.user?.email,
    "message": "Authorized: Welcome to dashboard!"});
});

// app.get("/auth/dashboard/profileScreen", (req, res) => {
  
// });


app.listen(3000, () => console.log("Server running on port 3000"));
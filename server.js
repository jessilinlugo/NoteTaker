// Dependencies
const express = require('express');
const path = require('path');
const fs = require("fs");
const uuid = require("uuid");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//home route
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
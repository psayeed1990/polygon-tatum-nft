const express = require("express");
const app = express();

//dotenv config
require("dotenv").config();

app.get("/", (req, res) => {});

const PORT = process.env.PORT || 5000;
//start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

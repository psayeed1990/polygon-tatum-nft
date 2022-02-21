const express = require("express");
const mintNFT = require("./utils/mintNFT");
const app = express();
const cors = require("cors");
//enable cors
app.use(cors());

//dotenv config
require("dotenv").config();

//body parser
app.use(express.json());

//@POST  Mint NFT to the Smart Contract
app.post("/mint-nft", mintNFT);

const PORT = process.env.PORT || 5000;
//start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

const express = require("express");
const deployPolyNFTSmCon = require("./utils/deployPolyNFTSmCon");
const { default: mintNFT } = require("./utils/mintNFT");
const fileUpload = require("./utils/fileUpload");
const { uploadToIPFS } = require("./utils/uploadToIPFS");
const app = express();

//dotenv config
require("dotenv").config();

//body parser
app.use(express.json());

//@POST create NFT Smart Contract
//app.post("/create-smart-contract", deployPolyNFTSmCon);

//@POST ipfs upload
//app.post("/ipfs-upload", fileUpload, uploadToIPFS);

//@POST  Mint NFT to the Smart Contract
app.post("/mint-nft", mintNFT);

const PORT = process.env.PORT || 5000;
//start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

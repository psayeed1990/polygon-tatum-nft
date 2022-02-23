import express from "express";
import mintNFT from "./mintNFT.js";
const app = express();
import cors from "cors";
//enable cors
app.use(cors());

//dotenv config
import { config } from "dotenv";
config();

//body parser
app.use(express.json());

//@POST  Mint NFT to the Smart Contract
app.post("/mint-nft", mintNFT);

const PORT = process.env.PORT || 5000;
//start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

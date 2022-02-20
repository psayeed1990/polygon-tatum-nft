const { ipfsUpload } = require("@tatumio/tatum");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

const uploadToIPFS = async () => {
    //get uploaded file buffer from memory
    //const image = req.file.buffer;
    const image = await fs.readFile(path.join(__dirname, "qoddi.jpg"));

    //upload image file to IPFS
    const { ipfsHash } = await ipfsUpload(image, "image/png");

    //image link
    const tatumIPFSLink = `ipfs://${ipfsHash}`;

    const normalImageLink = `https://ipfs.io/ipfs/${ipfsHash}`;

    //create metadata.json
    const metadata = {
        name: "Logo",
        description: "Logo of qoddi.com",
        image: tatumIPFSLink,
    };

    //create metadata.json file in IPFS
    var buffer = Buffer.from(JSON.stringify(metadata));
    const metadataHash = await ipfsUpload(buffer, "metadata.json");

    //metadata link
    const metadataLink = `ipfs://${metadataHash.ipfsHash}`;

    console.log("Metadata link - ", metadataLink);
    console.log("Image Link - ", normalImageLink);
    //create NFT
    return metadataLink;
};

uploadToIPFS();

const { ipfsUpload } = require("@tatumio/tatum");

const uploadToIPFS = async (req, res) => {
    //get uploaded file buffer from memory
    const image = req.file.buffer;

    //upload image file to IPFS
    const ipfsHash = await ipfsUpload(image, "image/png");

    //image link
    const imageLink = `ipfs://${ipfsHash}`;

    //create metadata.json
    const metadata = {
        name: req.body.name,
        description: req.body.description,
        image: imageLink,
    };

    //create metadata.json file in IPFS
    var buffer = Buffer.from(JSON.stringify(metadata));
    const metadataHash = await ipfsUpload(buffer, "metadata.json");

    //metadata link
    const metadataLink = `ipfs://${metadataHash}`;

    //create NFT
    return res.json(metadataLink);
};

module.exports = uploadToIPFS;

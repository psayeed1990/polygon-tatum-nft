const fetch = require("node-fetch");

const mintNFT = async (req, res) => {
    const response = await fetch("https://api-eu1.tatum.io/v3/nft/mint", {
        method: "POST",
        headers: {
            "x-api-key": process.env.TATUM_API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chain: "MATIC",
            tokenId: "2", //token no of the asset
            to: req.body.account, //change to receipient address
            contractAddress: process.env.SMART_CONTRACT_ADDRESS, //the NFT smart contract
            url: process.env.METADATA_LINK, //metadata url with ipfs
            provenance: true,
            fromPrivateKey: process.env.PRIVATE_KEY, //gas fees paid from here, usually the one who is minting - user
        }),
    });

    const data = await response.json();

    console.log(data);

    return res.json(data);
};

module.exports = mintNFT;

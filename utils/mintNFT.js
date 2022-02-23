const fetch = require("node-fetch");
const uuid = require("uuid");

exports.mintNFT = async (req, res) => {
    //generate a random UUID v4
    const signkey = uuid.v4();

    //sign a pending transaction
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
            //fromPrivateKey: process.env.PRIVATE_KEY, //gas fees paid from here, usually the one who is minting - user
            signatureId: signkey,
        }),
    });

    //pending transaction parsed from response
    const mintedhang = await response.json();

    const transaction = await fetch(
        `https://api-eu1.tatum.io/v3/kms/${mintedhang.signatureId}`,
        {
            method: "GET",
            headers: {
                "x-api-key": process.env.TATUM_API_KEY,
            },
        }
    );

    const { serializedTransaction } = await transaction.json();

    const data = JSON.parse(serializedTransaction);

    //add account to the transaction
    data.from = req.body.account;

    //convert gas fees to hex
    data.gasPrice = data.gasPrice
        ? parseInt(data.gasPrice).toString(16)
        : undefined;

    console.log("serialized transaction", data);

    return res.json(data);
};

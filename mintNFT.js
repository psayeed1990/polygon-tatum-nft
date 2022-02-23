import axios from "axios";
import { v4 } from "uuid";

const mintNFT = async (req, res) => {
    //generate a random UUID v4
    const signkey = v4();

    //sign a pending transaction
    const response = await axios.post(
        "https://api-eu1.tatum.io/v3/nft/mint",
        {
            chain: "MATIC",
            tokenId: "2", //token no of the asset
            to: req.body.account, //change to receipient address
            contractAddress: process.env.SMART_CONTRACT_ADDRESS, //the NFT smart contract
            url: process.env.METADATA_LINK, //metadata url with ipfs
            //fromPrivateKey: process.env.PRIVATE_KEY, //gas fees paid from here, usually the one who is minting - user
            signatureId: signkey,
        },
        {
            headers: {
                "x-api-key": process.env.TATUM_API_KEY,
                "Content-Type": "application/json",
            },
        }
    );

    //pending transaction parsed from response
    const { signatureId } = response.data;

    const transaction = await axios.get(
        `https://api-eu1.tatum.io/v3/kms/${signatureId}`,
        {
            headers: {
                "x-api-key": process.env.TATUM_API_KEY,
            },
        }
    );

    console.log(transaction.data);
    const data = JSON.parse(transaction.data.serializedTransaction);
    console.log(data);

    //add account to the transaction
    data.from = req.body.account;

    //convert gas fees to hex
    data.gasPrice = data.gasPrice
        ? parseInt(data.gasPrice).toString(16)
        : undefined;

    console.log("serialized transaction", data);

    return res.json(data);
};

export default mintNFT;

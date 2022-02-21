const fetch = require("node-fetch");
require("dotenv").config();
const deployPolyNFTSmCon = async () => {
    const response = await fetch("https://api-eu1.tatum.io/v3/nft/deploy", {
        method: "POST",
        headers: {
            "x-api-key": process.env.TATUM_API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chain: "MATIC",
            name: "Qoddi NFT Token",
            publicMint: true,
            symbol: "QTC",
            provenance: true,
            feeCurrency: "MATIC",
            signatureId: process.env.SIGNATURE_ID,
        }),
    });
    const data = await response.json();
    console.log(data);
    return data;
};

deployPolyNFTSmCon();

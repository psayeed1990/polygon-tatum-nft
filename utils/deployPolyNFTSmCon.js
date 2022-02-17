const fetch = require("node-fetch");
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
            symbol: "ERC_SYMBOL",
            fromPrivateKey: process.env.PRIVATE_KEY,
            provenance: true,
            feeCurrency: "MATIC",
        }),
    });
    const data = await response.json();
    console.log(data);
    return data;
};

module.exports = deployPolyNFTSmCon;

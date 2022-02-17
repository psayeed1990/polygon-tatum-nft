const mintNFT = async (req, res) => {
    const response = await fetch("https://api-eu1.tatum.io/v3/nft/mint", {
        method: "POST",
        headers: {
            "x-api-key": process.env.TATUM_API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chain: "MATIC",
            symbol: "ERC_SYMBOL",
            fromPrivateKey: process.env.PRIVATE_KEY,
            to: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
            metadata: req.body.metadataLink,
            feeCurrency: "MATIC",
        }),
    });

    const data = await response.json();

    return res.json(data);
};

export default mintNFT;

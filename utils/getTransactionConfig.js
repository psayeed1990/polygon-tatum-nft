const fetch = require("node-fetch");

const getTransactionConfig = async (req, res) => {
    const response = await fetch(
        "https://api-eu1.tatum.io/v3/kms/" + process.env.SIGNATURE_ID,
        {
            method: "GET",
            headers: {
                "x-api-key": process.env.TATUM_API_KEY,
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();
    const txConfig = data.serializedTransaction;

    txConfig.from = req.body.walletAddress;
    return res.json(data);
};

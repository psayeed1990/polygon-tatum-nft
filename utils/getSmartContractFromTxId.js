const fetch = require("node-fetch");
require("dotenv").config();

const getNFTSmConAddFromTransId = async (transId) => {
    const response = await fetch(
        `https://api-eu1.tatum.io/v3/blockchain/sc/address/MATIC/${transId}`,
        {
            method: "GET",
            headers: {
                "x-api-key": process.env.TATUM_API_KEY,
            },
        }
    );

    const data = await response.json();
    console.log(data);
    return data;
};
getNFTSmConAddFromTransId(process.env.TRANSACTION_ID);

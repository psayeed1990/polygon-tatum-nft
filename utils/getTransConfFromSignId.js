const fetch = require("node-fetch");

require("dotenv").config();

const getSignatureConf = async (signId) => {
    const response = await fetch(
        `https://api-eu1.tatum.io/v3/kms/signature/${signId}`,
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

getSignatureConf("c3144d72-8963-44a2-843e-55d96e8d1cbc");

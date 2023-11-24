// /plugins/paypal/paypalFunctions.js

const fetch = require("node-fetch");

const generateAccessToken = async (base, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET) => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

const createOrder = async (base, cart, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET) => {
  // ... Rest of your createOrder function ...
};

const captureOrder = async (base, orderID, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET) => {
  // ... Rest of your captureOrder function ...
};

module.exports = {
  generateAccessToken,
  createOrder,
  captureOrder,
};

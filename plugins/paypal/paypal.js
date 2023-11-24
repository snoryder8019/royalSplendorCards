// /routes/paypal.js

const express = require("express");
const paypalFunctions = require("../plugins/paypal/paypalFunctions"); // Import the PayPal functions

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const { cart } = req.body;
    const base = "https://api-m.sandbox.paypal.com";
    const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

    const { jsonResponse, httpStatusCode } = await paypalFunctions.createOrder(
      base,
      cart,
      PAYPAL_CLIENT_ID,
      PAYPAL_CLIENT_SECRET
    );
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

router.post("/capture-order/:orderID", async (req, res) => {
  try {
    const { orderID } = req.params;
    const base = "https://api-m.sandbox.paypal.com";
    const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

    const { jsonResponse, httpStatusCode } = await paypalFunctions.captureOrder(
      base,
      orderID,
      PAYPAL_CLIENT_ID,
      PAYPAL_CLIENT_SECRET
    );
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to capture order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

module.exports = router;

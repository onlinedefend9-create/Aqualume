import express from "express";
import path from "path";

const PORT = 3000;

async function getPayPalAccessToken() {
  const clientId = process.env.VITE_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET_KEY;
  
  if (!clientId || !clientSecret) {
    throw new Error("PayPal live credentials (VITE_PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY) are not configured in environment variables.");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  return data.access_token;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // PayPal API Endpoints
  app.post("/api/orders", async (req, res) => {
    try {
      const { quantity = 1 } = req.body;
      const unitPrice = 35.00;
      const totalAmount = (unitPrice * quantity).toFixed(2);

      const accessToken = await getPayPalAccessToken();
      const response = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: totalAmount,
              },
              description: `WATTer LAMP™ Salt Water Powered Emergency Light (Quantity: ${quantity})`,
            },
          ],
        }),
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.post("/api/orders/:orderID/capture", async (req, res) => {
    const { orderID } = req.params;
    try {
      const accessToken = await getPayPalAccessToken();
      const response = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderID}/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Failed to capture order:", error);
      res.status(500).json({ error: "Failed to capture order" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

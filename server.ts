import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const PORT = 3000;

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `You are AquaLume's official virtual assistant, a brand specializing in smart water lighting and purification solutions.

## Identity
- Name: AquaLume Assistant
- Website: www.aqualum.online
- Tone: Friendly, expert, professional
- Language: Always reply in the user's language (French, Arabic, English, etc.)

## Your Role
Help customers with:
- Product discovery and recommendations
- Technical questions and installation guidance
- Orders, pricing and availability
- After-sales service and warranty claims
- Connecting with the human support team when needed

## Brand Values
"Pure Light. Pure Water."
- Innovation & smart technology
- Environmental responsibility  
- Premium quality

## Behavior Rules
- Ask 1-2 targeted questions to understand the customer's need before recommending
- Offer 2-3 options suited to their budget and use case
- Be honest if you don't know something — offer to escalate to a human agent
- Never promise specific prices or delivery times without confirmation
- End every conversation with a clear next step

## Response Format
- Keep answers short and clear (max 3-4 sentences per block)
- Use bullet points when listing products or options
- Use emojis sparingly 💧✨
- Always be warm and solution-focused`;

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

  // Chat API
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const chat = ai.chats.create({
        model: "gemini-3.1-flash-lite",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history || [],
      });

      const result = await chat.sendMessage({ message });
      res.json({ text: result.text });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat" });
    }
  });

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

import "dotenv/config";
import express from "express";
import { HindsightClient } from "@vectorize-io/hindsight-client";

const app = express();

app.use(express.json());

const hindsight = new HindsightClient({
  baseUrl: process.env.HINDSIGHT_BASE_URL,
  apiKey: process.env.HINDSIGHT_API_KEY,
});

const BANK_ID = "finsight-ap-memory";

async function ensureMemoryBank() {
  try {
    const bank = await hindsight.createBank(BANK_ID, {
      name: "FinSight AP Memory",
      background:
        "Memory bank for FinSight Accounts Payable exception investigation, resolution, and prevention.",
    });

    console.log(`Memory bank ready: ${bank.bank_id}`);
  } catch (error) {
    console.error("Memory bank setup error:", error.message);
  }
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "FinSight Hindsight API",
    bank: BANK_ID,
  });
});

app.post("/api/memory/retain", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        error: "Memory content is required",
      });
    }

    await hindsight.retain(BANK_ID, content);

    res.json({
      success: true,
      message: "Memory stored successfully",
    });
  } catch (error) {
    console.error("Hindsight retain error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to store memory",
      details: error.message,
    });
  }
});

app.get("/api/memory/recall", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const result = await hindsight.recall(BANK_ID, query);

    res.json({
      success: true,
      memories: result.results,
    });
  } catch (error) {
    console.error("Hindsight recall error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to recall memory",
      details: error.message,
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`FinSight Hindsight server running on http://localhost:${PORT}`);
  ensureMemoryBank();
});
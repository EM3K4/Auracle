export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Wallet address required" });
  }

  const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY;

  const url = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [address, "latest"],
      }),
    });

    const data = await response.json();

    return res.status(200).json({
      address,
      rawBalance: data.result,
      note: "ETH balance in hex format from blockchain"
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch wallet data" });
  }
}

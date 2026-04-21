export default async function handler(req, res) {
  const { wallet } = req.body;

  const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY;

  try {
    const response = await fetch(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [wallet, "latest"],
        id: 1
      })
    });

    const data = await response.json();

    const balanceWei = parseInt(data.result, 16);
    const balanceEth = balanceWei / 1e18;

    res.status(200).json({
      result: `Wallet ${wallet} holds approximately ${balanceEth.toFixed(4)} ETH`
    });

  } catch (error) {
    res.status(500).json({
      result: "Error fetching wallet data"
    });
  }
}

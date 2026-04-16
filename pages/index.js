const analyzeWallet = async (wallet) => {
  setAnalyzing(wallet.address);

  const res = await fetch(`/api/wallet?address=${wallet.address}`);
  const data = await res.json();

  const result = await callClaude(
    "You are a crypto on-chain analyst. Explain wallet behavior clearly in 3 sentences.",
    JSON.stringify(data)
  );

  setAnalysis(prev => ({ ...prev, [wallet.address]: result }));
  setAnalyzing(null);
};

export default async function handler(req, res) {
  const { wallet } = req.body;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 200,
        messages: [
          {
            role: "user",
            content: `Analyze this crypto wallet briefly: ${wallet}`
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: data.content?.[0]?.text || "No response"
    });

  } catch (error) {
    res.status(500).json({ result: "Error analyzing wallet" });
  }
}

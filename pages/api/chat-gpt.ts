import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function relayChatGPT(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiKey = process.env.GPT_API_KEY;

    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const externalResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: req.query.prompt,
          },
        ],
        stream: false,
      }),
    });
    const externalRes = await externalResponse.json();
    console.log(externalRes.choices[0].message.content);
    res.json({
      message: 'Success',
      data: externalRes.choices[0].message.content,
    });
    // Forward the external API's response headers to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

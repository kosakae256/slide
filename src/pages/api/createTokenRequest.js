import Ably from "ably/promises";

export default async function handler(req, res) {
    const client = new Ably.Realtime("MoDfLQ._2Q5KQ:7BtDKx-JmbqT-ElO0npTDXkdj2FAzgjE6Y1Bj17msS4");
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'kosakae-slide-chat' });
    res.status(200).json(tokenRequestData);
};
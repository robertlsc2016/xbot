const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

// Configurar credenciais
const client = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

export async function postTweet({ tweetBody }: { tweetBody: string }) {
  try {
    const tweet = await client.v2.tweet(tweetBody);
    return tweet;
  } catch (error) {
    throw error;
  }
}

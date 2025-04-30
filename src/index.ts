import { Client, LocalAuth, Message } from "whatsapp-web.js";
const qrcode = require("qrcode-terminal");
import dotenv from "dotenv";
import { postTweet } from "./postTweet";

dotenv.config();

// Constants
const GROUP_ID = process.env.GROUP_ID!;
const USER_ID = process.env.USER_ID!;
const TRIGGER = process.env.TRIGGER || "/";
const MAX_TWEET_LENGTH = 280;

// Puppeteer options
const puppeteerOptions = {
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-accelerated-2d-canvas",
    "--disable-gpu",
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-breakpad",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-domain-reliability",
    "--disable-extensions",
    "--disable-features=AudioServiceOutOfProcess",
    "--disable-hang-monitor",
    "--disable-ipc-flooding-protection",
    "--disable-notifications",
    "--disable-offer-store-unmasked-wallet-cards",
    "--disable-popup-blocking",
    "--disable-prompt-on-repost",
    "--disable-renderer-backgrounding",
    "--disable-speech-api",
    "--disable-sync",
    "--disable-translate",
    "--metrics-recording-only",
    "--mute-audio",
    "--no-first-run",
    "--no-pings",
    "--no-wifi",
    "--prerender-from-omnibox=disabled",
    "--process-per-site",
    "--disable-threaded-animation",
    "--disable-threaded-scrolling",
    "--disable-webgl",
    "--disable-remote-fonts",
    "--blink-settings=imagesEnabled=false",
    '--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"',
    "--disable-blink-features=AutomationControlled",
  ],
};

// Client
export const client = new Client({
  authStrategy: new LocalAuth({ dataPath: "./auth" }),
  puppeteer: puppeteerOptions,
});

// Handlers
function onQRCodeReceived(qr: string) {
  qrcode.generate(qr, { small: true });
}

function onClientReady() {
  client.sendMessage(
    GROUP_ID,
    `Estou pronto e operante: utilize *${TRIGGER} [seu tweet]* para fazer um post.`
  );
}

async function onMessageReceived(message: Message) {
  if (message.from !== GROUP_ID || message.author !== USER_ID) return;
  if (!message.body.startsWith(TRIGGER)) return;

  const tweetBody = message.body.replace(`${TRIGGER} `, "").trim();

  if (tweetBody.length > MAX_TWEET_LENGTH) {
    await client.sendMessage(
      GROUP_ID,
      `Limite de caracteres: ${MAX_TWEET_LENGTH}.\nSua mensagem atual possui ${tweetBody.length} caracteres.\n\nIrei cortar sua mensagem para o limite de ${MAX_TWEET_LENGTH} caracteres e você reavalie:`
    );
    await client.sendMessage(GROUP_ID, tweetBody.slice(0, MAX_TWEET_LENGTH));
    return;
  }

  try {
    const tweet = await postTweet({ tweetBody });
    await client.sendMessage(
      GROUP_ID,
      `Tweet criado com sucesso!\n\n${JSON.stringify(tweet.data, null, 2)}`
    );
  } catch (error: any) {

    await client.sendMessage(
      GROUP_ID,
      `Não foi possível postar seu tweet!\n\nErro: ${JSON.stringify(
        error.data,
        null,
        2
      )}`
    );
  }
}

// Register events
client.on("qr", onQRCodeReceived);
client.on("ready", onClientReady);
client.on("message", onMessageReceived);

// Initialize
client.initialize();

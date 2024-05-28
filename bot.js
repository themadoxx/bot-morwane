require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const OpenAI = require('openai').default; // Ajustement pour l'importation

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  try {
    const gptResponse = await openai.chat.completions.create({
      messages: [{ role: "user", content: userMessage }],
      model: "gpt-3.5-turbo"
    });

    const replyText = gptResponse.choices[0].message.content.trim(); // Ajustez selon la structure de réponse
    bot.sendMessage(chatId, replyText);
  } catch (error) {
    console.error('Erreur lors de la génération de la réponse :', error);
    bot.sendMessage(chatId, "Désolé, je ne peux pas répondre pour le moment.");
  }
});

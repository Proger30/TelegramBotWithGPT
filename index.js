import dotenv from 'dotenv';
import TelegramApi from "node-telegram-bot-api";
import fetch from "node-fetch";
dotenv.config();
// Telegram Bot
const token = process.env.TELEGRAM_API_KEY;
const bot = new TelegramApi(token, {polling: true});

// ChatGPT 
const url = 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.CHATGPT_API_KEY;

bot.on("message", (msg) => {
	const text = msg.text;
	const chatId = msg.chat.id;
	const data = {
		model: "gpt-3.5-turbo",
		messages: [{role: "user", content: text}]
	}
	fetch(url, {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + apiKey,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(async (result) => {
		bot.sendMessage(chatId, `${result.choices[0].message.content}`);
		console.log(1, result);
	})
	.catch(error => {
		console.error(1 + ' err',error);
	});

	console.log(2, msg);
});
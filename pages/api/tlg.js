const TelegramApi = require('node-telegram-bot-api');

const token = '5968299447:AAGQl-ILURJmwdM6o3QJc7fIgtzC6DA23go';
const webAppUrl = 'https://6afa-213-24-126-79.eu.ngrok.io/telegram/';

const bot = new TelegramApi(token, {polling : true});

//add list command to bot in chat telegram

    /*bot.setMyCommands([
        {command: '/start', description: 'Start bot'},
        {command: '/info', description: 'Bot send info your account'}
    ])*/

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const photo = 'http://localhost:3000/public/imageOther/cats.jpg';

    if (text === '/start') {
        await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/8b9/86e/8b986e33-e748-416b-97f9-2f4641053298/192/1.webp');
        return bot.sendMessage(chatId, `Welcome to bot Pfumiko ${photo}`);
        /*bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});*/
    } else if(text === '/info') {
        await bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name}`, {
            reply_markup:{
                inline_keyboard:[
                    [{text:'Form', web_app:{url:webAppUrl}}]
                ]
            }
        })
    } else {
        return bot.sendMessage(chatId, `Привет кожаный мешок`);
    }
})

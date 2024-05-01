/*
 * Copyright (C) Not Lukyon 2024 AGPL
 */
const Discord = require('discord.js');

// Create bot
const Bot = { };

/*
 * BOT CONFIG
 */

// Discord token
Bot.token = '<BOT TOKEN>';

// Bot name
Bot.name = 'Incel invictus bot';

// Wrong phrase
Bot.WRONG = 'INVICTUS';

// Correct phrase
Bot.CORRECT = /INCEL\s+INVICTUS/g; // INCEL INVICTUS

/*
 * BOT INTERNALS
 */

Bot.INTENTS = [
     Discord.GatewayIntentBits.Guilds,
     Discord.GatewayIntentBits.GuildMessages,
     Discord.GatewayIntentBits.MessageContent,
];

// Client
Bot.client = null;

// Event: messageCreate
Bot.onMessageCreate = async (message) => {
    if (message.author.bot)
        return;
    let content = message.content;
    content = content.toUpperCase();
    content = content.replace(Bot.CORRECT, '');
    try {
        if (content.search(Bot.WRONG) !== -1)  {
            await message.reply('The correct term is "Incel Invictus" please');
        }
    } catch (err) {
        cosnole.log(`Failed to correct someobdy to saying 'Invictus' instead of 'Incel Invictus'`);
    }
};

// Event: ready
Bot.onReady = async () => {
    console.log(`${Bot.name} is ready`);
};

// Start bot function
Bot.start = () => {
    if (Bot.token === '<BOT TOKEN>') {
        console.log('You must replace the `Bot.token` variable your Discord bot token in the developer portal (Applications > YourApp > Bot > Reset Token)');
        console.log('You must also enable the message intent');
        return;
    }
        
    Bot.client = new Discord.Client({
        intents: Bot.INTENTS
    });
    Bot.client.on('messageCreate', Bot.onMessageCreate);
    Bot.client.on('ready', Bot.onReady);
    Bot.client.login(Bot.token);
};

// Start the bot
Bot.start();


const { Client, GatewayIntentBits, IntentsBitField, messageLink, Embed, EmbedBuilder }   = require('discord.js');
const cfg                                                           = require('./config.json');
const client                                                        = new Client({
    intents : [
        "Guilds",
        "GuildMessages",
        "MessageContent"
    ]
})

client.on('ready', (c) => {
    console.log(`Logged as ${client.user.tag}.`);
})

client.on('messageCreate', (msg) => {
    if(msg.channelId == cfg.sourceChannelId[0]) {
        client.channels.cache.get(cfg.destinationChannelId).send("**" + msg.author.tag + "**" + " / " + msg.channel.name + "\n" + msg.content);
        
        msg.embeds.forEach(embeds => {
            let title  = embeds.title;
            let fields = embeds.fields;
            let desc   = embeds.description;

            fields.forEach((field) => {
                fieldName = field.name;
                fieldValue = field.value;
                client.channels.cache.get(cfg.destinationChannelId).send(fieldName);
                client.channels.cache.get(cfg.destinationChannelId).send(desc);

            }); 
        })

        
    }
});

client.login(cfg.token);
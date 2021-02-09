/*
 * Copyright (c) 2021 Simon Hamelin
 *
 * Module name:
 *   ready.js
 *
 * Abstract:
 *   Startup module for the bot. Allows interaction with Discord and health
 *   checkup w/ result in the terminal.
 *
 * Author:
 *   Simon Hamelin Mon Feb 08 2021
 *
 * Revision History:
 *
 */

const onReady = (bot) => {
    bot.client.on('ready', () => {
        bot.logger.info("Starting routine...");

        let joinedGuilds = [];
        bot.client.guilds.cache.forEach((guild, index) => {
            joinedGuilds.push({
                "id": guild.id,
                "name": guild.name
            });

            // We init the config file for the current guild
            bot.users.initGuild( guild.id );
        });

        bot.logger.info("ÉTS Bot is present in the following Discord servers:", joinedGuilds);
        bot.logger.info("ÉTS Bot is now ready to receive commands!");
    });
}

module.exports = onReady;
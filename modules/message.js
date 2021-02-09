/*
 * Copyright (c) 2021 Simon Hamelin
 *
 * Module name:
 *   message.js
 *
 * Abstract:
 *   No description provided.
 *
 * Author:
 *   Simon Hamelin Mon Feb 08 2021
 *
 * Revision History:
 *
 */

const onMessage = (bot) => {
    bot.client.on("message", (msg) => {

        if(msg.content.startsWith( bot.settings.cmd_prefix )
            && msg.content.length > bot.settings.cmd_prefix.length) {

            // if the user entered a command
            bot.logger.silly( `User ${msg.author.username} (${msg.author.id}) `
                                + `said: "${msg.content}"` );
        }
    });
};

module.exports = onMessage;
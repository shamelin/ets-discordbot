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
        bot.logger.warn(msg);
    });
};

module.exports = onMessage;
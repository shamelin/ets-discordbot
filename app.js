/*
 * Copyright (c) 2021 Simon Hamelin
 *
 * Module name:
 *   app.js
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

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const Discord = require('discord.js');

const { createLogger, format, transports } = require("winston");
const { consoleFormat } = require("winston-console-format");

const UsersController = require('./users/controller');

// Modules path
const modulesPath = path.join(__dirname, "modules");

 /**
  * Represents the Discord bot.
  */
class ETSBot {
    constructor() {
        this.settings = {};
        this.client = new Discord.Client();

        // Load the settings and initialize this.settings
        this.loadSettings();

        // Load winston
        this.loadLogger();
        this.logger.info("Initializing ÉTS Discord bot...");

        // Load controllers
        this.users = new UsersController( this );

        // Setup modules
        this.loadModules();

        // Ready!
        this.client.login( this.settings["token"] );
    }

    /**
     * Initializes the config settings in the memory.
     * Automatically defines the {@link #settings} variable.
     */
    loadSettings() {
        this.settings = JSON.parse(
            fs.readFileSync('config.json', 'utf8')  
        );
    }

    /**
     * Initializes the log system with winston.
     */
    loadLogger() {
        // Initiating Logger
		const date_formatted = moment().format("DD-MM-YYYY_HH.mm.ss_SSS");

		this.winston_options = {
			format: format.combine(
				format.timestamp(),
				format.ms(),
				format.errors({
					stack: true
				}),
				format.splat(),
				format.json()
			),
			consoleFormat: {
				format: format.combine(
					format.colorize({
						all: true
					}),
					format.padLevels(),
					format.timestamp(),
					consoleFormat({
						showMeta: true,
						metaStrip: ["timestamp", "service"],
						inspectOptions: {
							depth: Infinity,
							colors: true,
							maxArrayLength: Infinity,
							breakLength: 120,
							compact: Infinity
						}
					})
				),
				timestamp: true
			},
			file: {
				level: "verbose",
				filename: `logs/app-${date_formatted}.log`,
				handleExceptions: false,
				json: true,
				maxsize: 104857600, // 100 MB
				maxFiles: 5,
				colorize: false,
				timestamp: true,
			}
		};

		this.logger = createLogger({
			level: "silly",
			format: this.winston_options.format,
			transports: [
				new transports.Console(this.winston_options.consoleFormat),
				new transports.File(this.winston_options.file)
			]
		});
    }

    /**
     * Lods the bot's modules.
     */
    loadModules() {
        // Reads all the files in a directory
        fs.readdir(modulesPath, (err, files) => {
            if (err) throw new Error(err);

            files.map(fileName => {
                this.logger.debug(`Initializing module ${fileName}`);

                // Requires all the files in the directory that is not a index.js.
                const listener = require(path.resolve(modulesPath, fileName));

                // Initialize it with io as the parameter.
                try {
                    listener(this);
                } catch(e) {
                    this.logger.warn(`File modules/${fileName} is not valid - `, e);
                }
            });
        });
    }
}

let bot = new ETSBot();
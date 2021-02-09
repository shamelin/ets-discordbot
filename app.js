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

// Modules path
const modulesPath = path.join(__dirname, "modules");

 /**
  * Classe représentant le bot Discord.
  * 
  * Permet d'initialiser la librarie discord.js et créer les
  * endpoints nécessaire aux transactions avec Discord.
  */
class ETSBot {
    constructor() {
        this.client = new Discord.Client();

        // On lit le fichier de config et on l'initialise
        this.loadSettings();

        // On charge winston
        this.loadLogger();
        this.logger.info("Hello world!");

        // On setup les endpoints pour le bot
        this.loadModules();

        // On lance le bot!
        this.client.login( this.settings["token"] );
        this.logger.info("ÉTS bot successfully started!");
    }

    /**
     * Initialise le fichier de configuration dans la mémoire.
     * Définie automatiquement la valeur de {@link #settings}.
     */
    loadSettings() {
        this.settings = JSON.parse(
            fs.readFileSync('config.json', 'utf8')  
        );
    }

    /**
     * Configure le système de log correctement à l'aide de winston.
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
     * Chargement des modules du bot.
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
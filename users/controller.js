/*
 * Copyright (c) 2021 Simon Hamelin
 *
 * Module name:
 *   controller.js
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

const model = require('./model');

/**
 * Représente le contrôleur pour l'administration des systèmes
 * d'utilisateurs et d'attributions de rôles.
 */
class UsersController {
    constructor(bot) {
        this.bot = bot;
        this.model = new model();
    }

    /**
     * Permet d'obtenir la chaîne de caractère JSON depuis le model.
     */
    getData() {
        return this.model.data;
    }

    /**
     * Permet d'initialiser les utilisateurs d'une grille dans le fichier
     * de configuration.
     * 
     * Cette fonction itérera à travers tous les utilisateurs d'une grille
     * et leur créera une entrée respective dans le fichier de configuration.
     * 
     * @param guild_id Guild id
     */
    initGuild(guild_id) {
        if(!this.model.hasGuild(guild_id)) {
            this.model.createGuild(guild_id);
        }

        this.bot.client.guilds.fetch( guild_id ).then((guild) => {
            // Itération à travers tous les utilisateurs et création du
            // fichier de configuration.

            console.log("AH");

            guild.members.cache.forEach((user) => {
                this.model.createUser(guild_id, user.id);
            });
        }).catch((err) => {
            this.bot.logger.error("Could not fetch specified guild: ", err);
        });
        
    }

    /**
     * Ajoute un utilisateur à une guilde spécifique.
     * 
     * Si la guilde n'existe pas, elle sera créée dans le fichier de
     * configuration.
     * 
     * Si l'utilisateur est déjà dans la grille avec le rôle attribué,
     * aucune modification ne sera apportée.
     * 
     * @param guild Guild id
     * @param user_id User id
     * @param role_id Role id
     * @return Utilisateur ajouté
     */
    addUserRole(guild, user_id, role_id) {
        return this.model.addUserRole(guild, user_id, role_id);
    }
}

module.exports = UsersController;
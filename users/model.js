/*
 * Copyright (c) 2021 Simon Hamelin
 *
 * Module name:
 *   model.js
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

/**
 * Représente le module pour l'administration des systèmes
 * d'utilisateurs et d'attributions de rôles.
 */
class UsersModel {
    constructor() {
        this.data = {};

        // TODO: Send parameters?

        // On charge la data des utilisateurs
        this.loadData();
    }

    /**
     * Charge le contenu du fichier "../data/userdata.json" dans la variable
     * data. Permet la manipulation de la chaîne JSON par le model.
     */
    loadData() {
        this.data = JSON.parse(
            fs.readFileSync(__dirname + '\\..\\data\\userdata.json', 'utf8')  
        );
    }

    /**
     * Sauvegarde le contenu de la variable data dans le fichier 
     * "../data/userdata.json". Permet une sauvegarde de la chaîne JSON dans
     * le but d'une future utilisation après redémarrage du bot.
     */
    saveData() {
        fs.writeFileSync(__dirname + '\\..\\data\\userdata.json', JSON.stringify(
            this.data
        ));
    }

    /**
     * Vérifie si le data à une branche pour la guilde spécifiée.
     */
    hasGuild(guild) {
        return this.data[ guild ] != undefined;
    }

    /**
     * Permet de créer une nouvelle branche pour une guilde qui n'existait
     * pas précédemment.
     * 
     * Si la guild existait déjà, aucune modification ne sera apportée au
     * fichier de data.
     * 
     * @param guild Guild id
     * @return success
     */
    createGuild(guild) {
        if(!this.hasGuild(guild)) {
            this.data[ guild ] = {
                "users": {}
            };

            return true;
        }

        return false;
    }

    /**
     * Vérifie si un utilisateur appartient à une guilde.
     * 
     * @param guild Guild id
     * @param user_id User id
     * @return Utilisateur appartient à la guilde
     */
    isInGuild(guild, user_id) {
        return this.hasGuild(guild) &&
                this.data[ guild ]["users"][ user_id ] != null;
    }

    /**
     * Vérifie si un utilisateur d'une guilde appartient à un rôle spécifié.
     * 
     * @param guild Guild id
     * @param user_id User id
     * @param role_id Role id
     * @return Utilisateur a le rôle
     */
    userHasRole(guild, user_id, role_id) {
        return this.isInGuild(guild, user_id) &&
            this.data[ guild ]["users"][ user_id ]["roles"].indexOf( role_id ) > -1
    }
    
    /**
     * Ajoute un utilisateur à une guilde spécifique.
     * 
     * Si l'utilisateur est déjà dans la grille avec le rôle attribué,
     * aucune modification ne sera apportée.
     * 
     * @param guild Guild id
     * @param user_id User id
     * @return Utilisateur ajouté
     */
    createUser(guild, user_id) {
        if(guild == null || user_id == null) {
            return false;
        }

        if(!this.hasGuild(guild)) {
            this.createGuild( guild );
        }

        if(!this.isInGuild(guild, user_id)) {
            this.data[ guild ]["users"][ user_id ] = {
                "roles": []
            };

            // Sauvegarde
            this.saveData();

            return true;
        }

        return false;
    }
    
    /**
     * Ajoute un utilisateur à une guilde spécifique.
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
        if(guild == null || user_id == null || role_id == null) {
            return false;
        }

        if(!this.hasGuild(guild)) {
            this.createGuild( guild );
        }

        if(!this.isInGuild(guild, user_id)) {
            this.createUser(guild, user_id);
        }

        if(!this.userHasRole(guild, user_id, role_id)) {
            let roles = this.data[ guild ]["users"][ user_id ]["roles"];
            data.push(role_id);

            // Update
            this.data[ guild ]["users"][ user_id ]["roles"] = roles;

            // Sauvegarde
            this.saveData();

            return true;
        }

        return false;
    }

    /**
     * Supprime un utilisateur à une guilde spécifique.
     * 
     * @param guild Guild id
     * @param user_id User id
     * @return Utilisateur supprimé
     */
    deleteUser(guild, user_id) {
        if(this.isInGuild(guild, user_id)) {
            delete this.data[ guild ]["users"][ user_id ];

            return true;
        }

        return false;
    }
}

module.exports = UsersModel;
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var fs = require('fs');
/**
 * Représente le module pour l'administration des systèmes
 * d'utilisateurs et d'attributions de rôles.
 */


var UsersModel =
/*#__PURE__*/
function () {
  function UsersModel() {
    _classCallCheck(this, UsersModel);
  } // TODO: Send parameters?
  // On charge la data des utilisateurs

  /**
   * Charge le contenu du fichier "../data/userdata.json" dans la variable
   * data. Permet la manipulation de la chaîne JSON par le model.
   */


  _createClass(UsersModel, [{
    key: "loadData",
    value: function loadData() {
      this.data = JSON.parse(fs.readFileSync('../data/userdata.json', 'utf8'));
    }
  }]);

  return UsersModel;
}();

module.exports = UsersModel;
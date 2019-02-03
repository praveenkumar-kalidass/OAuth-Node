'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Client', {
        id: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        clientSecret: {
          type: Sequelize.STRING,
          field: 'client_secret',
          allowNull: false
        },
        redirectUri: {
          type: Sequelize.STRING,
          field: 'redirect_uri',
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          defaultValue: Sequelize.fn('NOW')
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          defaultValue: Sequelize.fn('NOW')
        }
      }
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(
      'Client'
    );
  }
};

'use strict';

/**
 * Create User Table
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'User', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'first_name'
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'last_name'
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'email'
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'password'
        },
        roleId: {
          type: Sequelize.UUID,
          field: 'role_id',
          references: {
            model: {
              tableName: 'Role'
            }
          }
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
      'User'
    );
  }
};

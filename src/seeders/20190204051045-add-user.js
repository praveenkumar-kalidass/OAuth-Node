'use strict';
const uuidv4 = require('uuid/v4');
const passwordHash = require('password-hash');

/**
 * Add sample Users - Admin, User
 */
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('User', [{
      id: uuidv4(),
      first_name: 'Admin',
      last_name: 'Demo',
      email: 'demo_admin@sequelize.com',
      password: passwordHash.generate('demoadmin@123'),
      role_id: '108243ae-d3ff-40db-b4e7-efc2390b5827'
    }, {
      id: uuidv4(),
      first_name: 'User',
      last_name: 'Demo',
      email: 'demo_user@sequelize.com',
      password: passwordHash.generate('demouser@123'),
      role_id: '543529bf-f5dc-44ec-a3e7-aaa4721e5640'
    }], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};

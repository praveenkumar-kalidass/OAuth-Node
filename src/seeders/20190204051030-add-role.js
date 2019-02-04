'use strict';
const uuidv4 = require('uuid/v4');

/**
 * Add new roles - Admin, User
 */
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Role', [{
      id: uuidv4({
        random: [
          0x10, 0x82, 0x43, 0xae, 0xd3, 0xff, 0xa0, 0xdb,
          0x34, 0xe7, 0xef, 0xc2, 0x39, 0x0b, 0x58, 0x27
        ]
      }),
      name: 'DEMO_ADMIN'
    }, {
      id: uuidv4({
        random: [
          0x54, 0x35, 0x29, 0xbf, 0xf5, 0xdc, 0xb4, 0xec,
          0x63, 0xe7, 0xaa, 0xa4, 0x72, 0x1e, 0x56, 0x40
        ]
      }),
      name: 'DEMO_USER'
    }], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Role', null, {});
  }
};

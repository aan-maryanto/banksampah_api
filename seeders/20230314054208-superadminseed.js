'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('tblusers', [
      {
        username: 'aan+su',
        email: 'aan+su@banksampah.com',
        password: bcrypt.hashSync('P@ssw0rd', 12),
        lastlogin: null,
        status: 'A',
        is_verified: true,
        is_superadmin: true,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await  queryInterface.bulkDelete('tblusers', null, {});
  }
};

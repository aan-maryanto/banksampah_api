'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('tbltmpusers', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      userid: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'tblusers',
          key: 'id'
        }
      },
      ip: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      }
    },{
      queryInterface,
      tableName: 'tbltmpusers',
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
        {
          name: "fk_users",
          using: "BTREE",
          fields: [
            { name: "userid" },
          ]
        },
      ]
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('tbltmpusers')
  }
};

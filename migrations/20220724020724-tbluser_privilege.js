'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('tbluser_privilege', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      userid: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tblusers',
          key: 'id'
        }
      },
      privilegeid: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tblprivilege',
          key: 'id'
        }
      }
    },{
      queryInterface,
      tableName: 'tbluser_privilege',
      timestamps: true,
      timestampsWithDefaults: true,
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
          name: "fk_userid_privilege",
          using: "BTREE",
          fields: [
            { name: "userid" },
          ]
        },
        {
          name: "fk_privilegeid_user",
          using: "BTREE",
          fields: [
            { name: "privilegeid" },
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
    await  queryInterface.dropTable('tbluser_privilege')
  }
};

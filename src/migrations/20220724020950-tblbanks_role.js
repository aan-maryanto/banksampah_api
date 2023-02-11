'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('tblbanks_role',{
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true
      },
      createdBy: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tblusers',
          key: 'id'
        }
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true
      },
      updatedBy: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tblusers',
          key: 'id'
        }
      }
    }, {
      queryInterface,
      tableName: 'tblbanks_role',
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
          name: "fk_tblbanksrole_create",
          using: "BTREE",
          fields: [
            { name: "createdBy" },
          ]
        },
        {
          name: "fk_tblbanksrole_update",
          using: "BTREE",
          fields: [
            { name: "updatedBy" },
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
    await queryInterface.dropTable('tblbanks_role')
  }
};

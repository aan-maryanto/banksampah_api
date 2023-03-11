'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('tblsatuan', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      kdsatuan: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      uraian: {
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
          model: 'tblsatuan',
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
          model: 'tblsatuan',
          key: 'id'
        }
      }
    },{
      queryInterface,
      tableName: 'tblsatuan',
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
          name: "fk_tblsatuan_create",
          using: "BTREE",
          fields: [
            { name: "createdBy" },
          ]
        },
        {
          name: "fk_tblsatuan_update",
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
    await queryInterface.dropTable('tblsatuan')
  }
};

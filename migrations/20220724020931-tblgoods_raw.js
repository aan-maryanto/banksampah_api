'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('tblgoods_raw',{
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
      satuan: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tblsatuan',
          key: 'id'
        }
      },
      price: {
        type: Sequelize.STRING(10),
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
      tableName: 'tblgoods_raw',
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
          name: "fk_tblgoodsraw_satuan",
          using: "BTREE",
          fields: [
            { name: "satuan" },
          ]
        },
        {
          name: "fk_tblgoodsraw_create",
          using: "BTREE",
          fields: [
            { name: "createdBy" },
          ]
        },
        {
          name: "fk_tblgoodsraw_update",
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
    await queryInterface.dropTable('tblgoods_raw')
  }
};

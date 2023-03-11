'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('tblproduct',{
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      jnsproduct: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tbljns_product',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      price: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      status: {
        type: Sequelize.TINYINT, //available or not
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
      tableName: 'tblproduct',
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
          name: "fk_user_jns_product",
          using: "BTREE",
          fields: [
            { name: "jnsproduct" },
          ]
        },
        {
          name: "fk_tblprod_create",
          using: "BTREE",
          fields: [
            { name: "createdBy" },
          ]
        },
        {
          name: "fk_tblprod_update",
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
    await queryInterface.dropTable('tblproduct')
  }
};

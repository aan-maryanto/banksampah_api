'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('tbltrx_dtl', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      trxhdr_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tbltrx_hdr',
          key: 'id'
        }
      },
      goods_rawid: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tblgoods_raw',
          key: 'id'
        }
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      subtotal_amount: {
        type: Sequelize.FLOAT(18, 2),
        allowNull: true
      }
    },{
      queryInterface,
      tableName: 'tbltrx_dtl',
      timestamps: true,
      timestampsWithDefaults: true,
      indexes: [
        {
          name: "fk_tbltrxdtl_rawid",
          using: "BTREE",
          fields: [
            { name: "trxhdr_id" },
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
    await queryInterface.dropTable('tbltrx_dtl')
  }
};

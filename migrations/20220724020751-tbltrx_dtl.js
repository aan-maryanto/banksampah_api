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
        allowNull: true
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    },{
      queryInterface,
      tableName: 'tbltrx_dtl',
      timestamps: true,
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

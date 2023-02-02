'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('tbltrx_hdr', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      banksid: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tblbanks',
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.FLOAT(18,2),
        allowNull: true
      },
      userid: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tblusers',
          key: 'id'
        }
      },
      ismember: {
        type: Sequelize.ENUM('Y','N'),
        allowNull: true,
        defaultValue: "N"
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
      tableName: 'tbltrx_hdr',
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
          name: "fk_tbltrxhdr_banksid",
          using: "BTREE",
          fields: [
            { name: "banksid" },
          ]
        },
        {
          name: "fk_tbltrxhdr_userid",
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
    await queryInterface.dropTable('tbltrx_hdr')
  }
};

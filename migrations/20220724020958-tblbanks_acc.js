'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('tblbanks_acc',{
      banksuserid: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tblbanks',
          key: 'id'
        }
      },
      banksname: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tblbanks_users',
          key: 'id'
        }
      },
      banksrole: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tblbanks_role',
          key: 'id'
        }
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
      tableName: 'tblbanks_acc',
      timestamps: false,
      timestampsWithDefaults: true,
      indexes: [
        {
          name: "fk_banksusers",
          using: "BTREE",
          fields: [
            { name: "banksuserid" },
          ]
        },
        {
          name: "fk_banksname",
          using: "BTREE",
          fields: [
            { name: "banksname" },
          ]
        },
        {
          name: "fk_banksrole",
          using: "BTREE",
          fields: [
            { name: "banksrole" },
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
    await queryInterface.dropTable('tblbanks_acc')
  }
};

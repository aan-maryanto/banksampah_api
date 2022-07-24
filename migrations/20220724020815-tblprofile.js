'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('tblprofile', {
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
      fullname: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      pob: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      nik: {
        type: Sequelize.STRING(16),
        allowNull: true,
        unique: "nik"
      },
      avatar: {
        type: Sequelize.BLOB,
        allowNull: true
      }
    },{
      queryInterface,
      tableName: 'tblprofile',
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
          name: "nik",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "nik" },
          ]
        },
        {
          name: "fk_users_profile",
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
    await queryInterface.dropTable('tblprofile')
  }
};

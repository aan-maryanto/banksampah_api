'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('tblusers', {
      id: {
      autoIncrement: true,
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: "username"
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: "email"
    },
    password: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    lastlogin: {
      type: Sequelize.DATE,
      allowNull: true
    },
    status: {
      type: Sequelize.STRING(1),
      allowNull: true,
      defaultValue: "A"
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    is_superadmin: {
      type: Sequelize.TINYINT,
      allowNull: true
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
      allowNull: true
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
      allowNull: true
    }
    },{
      queryInterface,
      tableName: 'tblusers',
      hasTrigger: true,
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
          name: "username",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "username" },
          ]
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "email" },
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
    await queryInterface.dropTable('tblusers');
  }
};

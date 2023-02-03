'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('tblpost_image',{
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      postid: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'tblposts',
          key: 'id'
        }
      },
      image: {
        type: Sequelize.BLOB,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true
      }
    }, {
      queryInterface,
      tableName: 'tblpost_image',
      timestamps: false,
      timestampsWithDefaults: true,
      indexes: [
        {
          name: "fk_post_image",
          using: "BTREE",
          fields: [
            { name: "postid" },
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
    await queryInterface.dropTable('tblpost_image')
  }
};

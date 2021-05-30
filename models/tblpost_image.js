const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tblpost_image', {
    postid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblposts',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tblpost_image',
    timestamps: false,
    indexes: [
      {
        name: "fk_post_image",
        using: "BTREE",
        fields: [
          { name: "postid" },
        ]
      },
    ]
  });
};

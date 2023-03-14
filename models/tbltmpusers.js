module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbltmpusers', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'tblusers',
        key: 'id'
      }
    },
    ip: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbltmpusers',
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
        name: "fk_users",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};

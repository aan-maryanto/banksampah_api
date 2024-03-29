module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tblbanks', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    coordinate: {
      type: "POINT",
      allowNull: true
    },
    notelp: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "notelp"
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblusers',
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblusers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'tblbanks',
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
        name: "uuid",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uuid" },
        ]
      },
      {
        name: "fk_tblbanks_create",
        using: "BTREE",
        fields: [
          { name: "createdBy" },
        ]
      },
      {
        name: "fk_tblbanks_update",
        using: "BTREE",
        fields: [
          { name: "updatedBy" },
        ]
      },
    ]
  });
};

/**
 * Role Model
 */
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    freezeTableName: true,
    timestamps: true
  });
  Role.associate = (models) => {
    Role.hasOne(models.User, {
      as: 'role',
      foreignKey: 'roleId',
      sourceKey: 'id',
      onDelete: 'SET NULL'
    });
  };
  return Role;
};

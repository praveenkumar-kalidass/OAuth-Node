/**
 * Client Model
 */
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    clientSecret: {
      type: DataTypes.STRING,
      field: 'client_secret',
      allowNull: false
    },
    redirectUri: {
      type: DataTypes.STRING,
      field: 'redirect_uri',
      allowNull: false
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
  Client.associate = (models) => {
    Client.hasOne(models.OAuthToken, {
      as: 'client',
      foreignKey: 'clientId',
      sourceKey: 'id',
      onDelete: 'SET NULL'
    });
  };
  return Client;
};

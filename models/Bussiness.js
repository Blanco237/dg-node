const { password } = require("pg/lib/defaults");

module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define("business", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Business.associate = (models) => {
    Business.hasMany(models.appointments);
    Business.hasMany(models.services);
    Business.hasMany(models.payments);
    Business.hasMany(models.reviews);
  };

  return Business;
};

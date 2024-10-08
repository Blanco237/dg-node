module.exports = (sequelize, DataTypes) => {
  const Services = sequelize.define("services", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: DataTypes.INTEGER,
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Services;
};

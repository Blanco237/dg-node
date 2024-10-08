module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define("reviews", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rating: DataTypes.INTEGER,
    date: DataTypes.DATE,
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
    },
  });

  return Reviews;
};

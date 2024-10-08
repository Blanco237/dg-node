module.exports = (sequelize, DataTypes) => {
  const Appointments = sequelize.define("appointments", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "completed", "cancelled"],
      defaultValue: "pending",
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Appointments.associate = (models) => {
    Appointments.hasOne(models.payments);
    Appointments.belongsTo(models.business);
    Appointments.belongsTo(models.users);
    Appointments.belongsTo(models.services);
  };

  return Appointments;
};

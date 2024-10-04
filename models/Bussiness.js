module.exports = (sequelize, DataTypes) => {
    const Business = sequelize.define("business", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owner: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING
        }
    })

    return Business;    
}
module.exports = (sequelize, DataTypes) => {
    const Payments = sequelize.define("payments", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        method: {
            type: DataTypes.ENUM,
            values: ['momo', 'orange'],
            defaultValue: 'momo'
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['pending', 'completed', 'failed'],
            defaultValue: 'pending'
        },
        date : {
            type: DataTypes.DATE,
        },
    })

    return Payments;    
}
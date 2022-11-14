'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order.init(
        {
            user_id: DataTypes.INTEGER,
            sub_total: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            lastName: DataTypes.STRING,
            firstName: DataTypes.STRING,
            address: DataTypes.STRING,
            phonenumber: DataTypes.STRING,
            email: DataTypes.STRING,
            status: DataTypes.STRING,
            positionId: DataTypes.STRING,
            rememberToken: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Order',
        },
    );
    return Order;
};

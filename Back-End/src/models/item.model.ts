import sequelize from "../db";
import {DataTypes} from "sequelize";
import OrderModel from "./order.model";

const ItemModel = sequelize.define('item',{
    item_id:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    qty:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    price:{
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
});

// ItemModel.belongsToMany(OrderModel,{
//     through:"orderDetail",
//     onDelete:"CASCADE",
//     onUpdate:"CASCADE",
//     uniqueKey:'item_id'
// })
//
// OrderModel.belongsToMany(ItemModel,{
//     through:"orderDetail",
//     onDelete:"CASCADE",
//     onUpdate:"CASCADE",
//     uniqueKey:'order_id'
// })



export default ItemModel;
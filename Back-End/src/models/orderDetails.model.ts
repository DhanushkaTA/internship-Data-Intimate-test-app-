import sequelize from "../db";
import {DataTypes} from "sequelize";
import ItemModel from "./item.model";
import OrderModel from "./order.model";

let OrderDetailModel = sequelize.define("orderDetail",{
    item_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ItemModel,
            key: "item_id"
        }
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: OrderModel,
            key: "order_id"
        }
    },
    qty: {
        type: DataTypes.INTEGER
    },
    total_price: {
        type: DataTypes.DOUBLE
    }
});

OrderModel.belongsToMany(ItemModel,{
    through:"orderDetail",
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
    foreignKey:'order_id'
})

ItemModel.belongsToMany(OrderModel,{
    through:"orderDetail",
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
    foreignKey:'item_id'
})


export default OrderDetailModel;
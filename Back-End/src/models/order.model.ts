import sequelize from "../db";
import {DataTypes} from "sequelize";
import UserModel from "./user.model";
import ItemModel from "./item.model";

let OrderModel = sequelize.define('order',{
   order_id: {
       type: DataTypes.STRING(10),
       primaryKey: true,
       allowNull: false,
       validate: {
           notEmpty: true
       }
   },
   order_date: {
       type: DataTypes.DATE,
       allowNull: false,
       validate: {
           notEmpty: true
       }
   },
    user_id:{
       type: DataTypes.STRING,
       allowNull:false,
       references: {
           model: UserModel,
            key: 'nic'
       }
    }
});



export default OrderModel;
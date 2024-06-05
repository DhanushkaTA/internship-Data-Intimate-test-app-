import {DataTypes, Sequelize} from "sequelize";
import sequelize from "../db";
import AddressModel from "./address.model";
import ItemModel from "./item.model";
import OrderModel from "./order.model";

const UserModel = sequelize.define("user",{
    nic:{
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    username:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    fullName:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    }
})

//create one-to-one relationship
//there is a one user have one item
UserModel.hasOne(AddressModel,{
    foreignKey:{
        name:"user_id",
        allowNull:false,
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
})

//to create bidirectional relation
AddressModel.belongsTo(UserModel,{foreignKey:"user_id"})


//create one-to-many relationship
//user hase many orders, order has one user
UserModel.hasMany(OrderModel, {
    foreignKey: {
        name:"user_id",
        allowNull:false,
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
});

OrderModel.belongsTo(UserModel,{foreignKey: "user_id"})

export default UserModel;
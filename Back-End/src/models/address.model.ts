import {DataTypes, Sequelize} from "sequelize";
import sequelize from "../db";
import UserModel from "./user.model";

const AddressModel = sequelize.define("address",{
    address_id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id:{
        type:DataTypes.STRING,
        allowNull:false,
        references: {
            model: UserModel,
            key: 'nic'
        }
    }

})

export default AddressModel;
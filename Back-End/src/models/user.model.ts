import {DataTypes, Sequelize} from "sequelize";
import sequelize from "../db";

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

export default UserModel;
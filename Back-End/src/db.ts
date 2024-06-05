import {Sequelize} from "sequelize";
import * as process from "process";

declare module 'sequelize' {
    interface Options {
        createDatabaseIfNotExist?: boolean;
    }
}


let sequelize = new Sequelize(
    process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string,{

    host: process.env.DB_HOST,
    dialect: 'mysql',
        logging:true,
        pool:{
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        createDatabaseIfNotExist: true
    });

sequelize.sync({force: false})
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Failed to synchronize database:', error)
    });

export default sequelize;
// export function define(arg0: string, arg1: {}) {
//     throw new Error("Function not implemented.");
// }


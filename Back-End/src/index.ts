import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import * as process from "process";
import CustomerRoutes from "./routes/user.routes";
import sequelize from "./db";


const app = express();

app.use(cors({
    origin: "*"
}))

app.use(bodyParser.json());

app.use('/customer',CustomerRoutes);

// sequelize.sync({force: false})
//     .then(() => {
//         console.log('Database synchronized');
//     })
//     .catch((error) => {
//         console.error('Failed to synchronize database:', error)
//     });

app.listen(9000, () => {
    console.log("Server start on port 9000")
})
import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import * as process from "process";
import UserRoutes from "./routes/user.routes";
import sequelize from "./db";
import AddressRoutes from "./routes/address.routes";
import ItemRoutes from "./routes/item.routes";
import OrderRotes from "./routes/order.rotes";


const app = express();

app.use(cors({
    origin: "*"
}))

app.use(bodyParser.json());

app.use('/user',UserRoutes);

app.use('/address',AddressRoutes);

app.use('/item',ItemRoutes)

app.use('/order',OrderRotes)

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
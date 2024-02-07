import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import * as process from "process";
import CustomerRoutes from "./routes/user.routes";


const app = express();

app.use(cors({
    origin: "*"
}))

app.use(bodyParser.json());

app.use('/customer',CustomerRoutes);

app.listen(9000, () => {
    console.log("Server start on port 9000")
})
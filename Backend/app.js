import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import { verifyToken } from "./config/jwt.js";
import appLogin from "./routers/login.js";
import appUsers from "./routers/users.js";

dotenv.config();

const appExpress = express();
appExpress.use(cors())
appExpress.use(express.json())

appExpress.use("/login", appLogin);
appExpress.use("/users", verifyToken(), appUsers);
 
const my_server = JSON.parse(process.env.MY_SERVER);
appExpress.listen(my_server, ()=> console.log(`Servidor Corriendo: http://${my_server.host}:${my_server.port}`))
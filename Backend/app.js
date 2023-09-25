import express from "express";
import cors from "cors"
import appLogin from "./routers/login.js";
import appUsers from "./routers/users.js";
import { loadEnv } from "vite";

const appExpress = express();
appExpress.use(cors())
appExpress.use(express.json())

appExpress.use("/login", appLogin);
appExpress.use("/users", appUsers);
 
const env = loadEnv("development", process.cwd(), "VITE")
const my_server = JSON.parse(env.VITE_MY_SERVER)
appExpress.listen(my_server, ()=> console.log(`Servidor Corriendo: http://${my_server.host}:${my_server.port}`))
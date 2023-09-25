import { Router } from "express";
import { connectDB } from "../db/connect.js";
import { verifyToken } from "../config/jwt.js";

const appUsers = Router();
const dataBase = await connectDB();

appUsers.get("/", verifyToken(), async (req,res)=>{
    const {nickName} = req.data.payload

    const collection = dataBase.collection("usuarios")
    const data = await collection.findOne({nombreUser: nickName})

    res.status(200).send({status:200, data: data})
})

appUsers.post("/", async (req,res)=>{
    const collection = dataBase.collection("usuarios")
    const {Nickname, Email, Password} = req.body
    await collection.insertOne({
        nombreUser: Nickname,
        emailUser: Email,
        passwordUser: Password
    })

    res.status(200).send({status:200, data: "Registrado con exito"})
})

export default appUsers;
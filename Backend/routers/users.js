import { Router } from "express";
import { connectDB } from "../db/connect.js";

const appUsers = Router();
const dataBase = await connectDB();

appUsers.get("/", async (req,res)=>{
    const {nickName} = req.data.payload

    const collection = dataBase.collection("usuarios")
    const data = await collection.findOne({nombreUser: nickName})

    res.status(200).send({status:200, data: data})
})

export default appUsers;
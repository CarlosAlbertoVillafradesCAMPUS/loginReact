import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const my_conexion = JSON.parse(process.env.MY_CONEXION);

export async function connectDB(){
    try {
        const uri = `mongodb+srv://${my_conexion.user}:${my_conexion.password}@cluster0.oj8cvn0.mongodb.net/${my_conexion.dbName}`;
        const client = await new MongoClient(uri).connect();
        return client.db()
    } catch (error) {
        return {status:500, message:"Error al conectarse a la base de datos"}
    }
}


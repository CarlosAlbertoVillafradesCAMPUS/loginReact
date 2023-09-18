import dotenv from "dotenv";
import { SignJWT, jwtVerify } from "jose";
import {connectDB} from "../db/connect.js"
dotenv.config();
const dataBase = await connectDB()

const generateToken = async (req,res,next) =>{
  console.log(Object.keys(req.body));
    if(Object.keys(req.body).length === 0) return res.status(400).send({status:400, message:"Datos no enviados"})
    const coleccion = dataBase.collection("usuarios")
    const checkUser = await coleccion.findOne({emailUser: req.body.Email});
    console.log(checkUser); 
    if(!checkUser) return res.status(401).send({status:401, message:"Error, usuario no encontrado"})
    const result = await coleccion.findOne({emailUser: req.body.Email, passwordUser: req.body.Password});
    if(!result) return res.status(401).send({status:401, message:"Contraseña Incorrecta"})

    const encoder = new TextEncoder();
    const dataToken = {
        id: result._id.toString(),
        nickName: result.nombreUser,
        email: result.emailUser
    }
    const jwtConstructor = await new SignJWT(dataToken)
        .setProtectedHeader({alg:'HS256', typ:'JWT'})
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY))

        req.data = {status: 200, ...dataToken, token: jwtConstructor};
        next()
}

const verifyToken = () => async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization)
      return res.status(400).json({ status: 400, message: "Porfavor generar Token" });
      try {
        const encoder = new TextEncoder();
        req.data = await jwtVerify(
          authorization,
          encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        next();
      } catch (error) {
        res.status(498).send({status:498, message: "Algo salio mal, generar un nuevo token"});
      }
   
  };

  export {
    generateToken,
    verifyToken
  }
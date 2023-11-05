import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default registerAs('database',
(): TypeOrmModuleOptions=>{
  console.log("Conectando base de datos: "+__dirname)
  return {
    type: 'oracle',
    host: process.env.BD_HOST,
    port: parseInt(process.env.BD_PUERTO),
    username: process.env.BD_USUARIO,
    password: process.env.BD_PASS,
    sid: 'xe',
    entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
    synchronize: true 
  }
});
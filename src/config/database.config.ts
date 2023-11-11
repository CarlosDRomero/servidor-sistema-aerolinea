import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default registerAs('database',
()
:TypeOrmModuleOptions =>{
  console.log("Conectando base de datos...")
  return {
    type: 'postgres',
    host: process.env.BD_HOST,
    port: parseInt(process.env.BD_PUERTO),
    username: process.env.BD_USUARIO,
    password: process.env.BD_PASS,
    database: process.env.BD_NOMBRE,
    entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  }
});
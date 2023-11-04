import {registerAs}  from "@nestjs/config"

import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export default registerAs('database',() : TypeOrmModuleOptions=>{
  const options:TypeOrmModuleOptions = {
    type: "oracle",
      
      host: process.env.BD_HOST,
      // host: "wqb8p1ls-1521.use.devtunnels.ms",
      port: parseInt(process.env.BD_PUERTO),
      username: process.env.BD_USUARIO,
      password: process.env.BD_PASS,
      sid: "xe",
      entities: [__dirname + '/**/entities/*.entity{.js,.ts}'],
      synchronize: true,
  }
  console.log(options)
  return options;
})
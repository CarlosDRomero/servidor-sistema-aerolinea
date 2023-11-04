import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Usuario'})
export class Usuario {
  
  @PrimaryGeneratedColumn()
  id_usuario: number;
  
  @Column({default: () => 'CURRENT_TIMESTAMP'})
  creado: Date;
  
  @Column()
  nombre: string;
  
  @Column({unique:true})
  correo: string;

  @Column()
  clave: string;
}

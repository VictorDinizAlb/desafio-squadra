import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('TB_USERS')
export default class User {
  @PrimaryColumn({name: "CODIGO_USER", type: "int", nullable: false})
  codigoUser: number;

  @Column({ name: "NOME", type: 'varchar' })
  nome: string;

  @Column({ name: "EMAIL", type: 'varchar', nullable: false })
  email: string;

  @Column({ name: "PASSWORD", type: 'varchar' })
  senha: string;

  @Column({ name: "AVATAR", type: 'varchar' })
  avatar: string;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('TB_UF') //nome da tabela no banco
class Uf {
  @PrimaryColumn({ name: "CODIGO_UF", type: "int", nullable: false })
  codigoUF: number;

  @Column({ name: "SIGLA" })
  sigla: string;

  @Column({name: "NOME", type: "varchar",  length: 60 })
  nome: string;

  @Column({name: "STATUS", type: 'integer', width: 3 }) //"Decorators"
  status: number;
}

export default Uf;

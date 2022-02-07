import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('TB_UF') //nome da tabela no banco
class Uf {
  @PrimaryColumn('int')
  CODIGO_UF: number;

  @Column()
  SIGLA: string;

  @Column('varchar', { length: 60 })
  NOME: string;

  @Column({ type: 'integer', width: 3 }) //"Decorators"
  STATUS: number;
}

export default Uf;

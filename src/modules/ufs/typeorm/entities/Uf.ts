import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('TB_UF') //nome da tabela no banco
class Uf extends EntityWithSequence {
  @PrimaryColumn('int')
  CODIGO_UF: number;

  @Column()
  SIGLA: string;

  @Column('varchar2', { length: 60 })
  NOME: string;

  @Column({ type: 'number', width: 3 }) //"Decorators"
  STATUS: number;
}

export default Uf;

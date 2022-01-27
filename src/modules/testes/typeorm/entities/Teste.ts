import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Teste') //nome da tabela no banco
class Teste {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar2', { length: 3 })
  texto: string;
}

export default Teste;

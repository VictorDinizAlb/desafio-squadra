import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_BAIRRO')
class Bairro {
  @PrimaryGeneratedColumn('increment')
  CODIGO_BAIRRO: number;

  @Column({ type: 'int', width: 9 })
  CODIGO_MUNICIPIO: number;

  @Column('varchar', { length: 256 })
  NOME: string;

  @Column({ type: 'int', width: 3 })
  STATUS: number;
}

export default Bairro;

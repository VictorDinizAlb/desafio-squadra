import Uf from '@modules/ufs/typeorm/entities/Uf';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_MUNICIPIO')
class Municipio {
  @PrimaryGeneratedColumn('increment')
  CODIGO_MUNICIPIO: number;

  // @ManyToOne(type => Uf, uf => uf.CODIGO_UF)
  @Column({ type: 'int', width: 3 })
  CODIGO_UF: number;

  @Column('varchar', { length: 256 })
  NOME: string;

  @Column({ type: 'int', width: 3 })
  STATUS: number;
}

export default Municipio;

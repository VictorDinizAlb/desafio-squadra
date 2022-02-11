import Uf from '@modules/ufs/typeorm/entities/Uf';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('TB_MUNICIPIO')
class Municipio {
  @PrimaryColumn({name: "CODIGO_MUNICIPIO", type: "int", nullable: false})
  codigoMunicipio: number;

  @Column({ name: "CODIGO_UF", type: 'int', width: 9 })
  codigoUF: number;

  // @ManyToOne(() => Uf)
  // @JoinColumn({name: "CODIGO_UF"})
  // codigoUF: Uf;

  @Column({ name: "NOME", type: "varchar", length: 256 })
  nome: string;

  @Column({  name: "STATUS", type: 'int', width: 3 })
  status: number;
}

export default Municipio;

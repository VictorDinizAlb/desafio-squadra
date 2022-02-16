import Municipio from '@modules/municipios/typeorm/entities/Municipio';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('TB_BAIRRO')
export default class Bairro {
  @PrimaryColumn({name: "CODIGO_BAIRRO", type: "int", nullable: false})
  codigoBairro: number;

  @Column({ name: "CODIGO_MUNICIPIO", type: 'int', width: 9 })
  codigoMunicipio: number;

  @Column({ name: "NOME", type: 'varchar', length: 256 })
  nome: string;

  @Column({ name: "STATUS", type: 'int', width: 3 })
  status: number;

  @ManyToOne(() => Municipio)
  @JoinColumn({name: "CODIGO_MUNICIPIO"})
  municipio: Municipio;
}

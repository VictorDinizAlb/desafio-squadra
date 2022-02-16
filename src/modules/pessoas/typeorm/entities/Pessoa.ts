import Endereco from '@modules/enderecos/typeorm/entities/Endereco';
import { Column, Entity, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('TB_PESSOA')
export default class Pessoa {
  @PrimaryColumn({ name: "CODIGO_PESSOA", type: "int", nullable: false })
  codigoPessoa: number;

  @Column({ name: "NOME", type: 'varchar', length: 256 })
  nome: string;

  @Column({ name: "SOBRENOME", type: 'varchar', length: 256 })
  sobrenome: string;

  @Column({ name: "IDADE", type: 'int', width: 3 })
  idade: number;

  @Column({ name: "LOGIN", type: 'varchar', length: 50 })
  login: string;

  @Column({ name: "SENHA", type: 'varchar', length: 50 })
  senha: string;

  @Column({ name: "STATUS", type: 'int', width: 3 })
  status: number;

  @OneToMany(() => Endereco, endereco => endereco.pessoa)
  @JoinColumn({name: "CODIGO_PESSOA"})
  enderecos: Endereco[];
}

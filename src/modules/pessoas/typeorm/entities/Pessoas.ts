import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_PESSOA')
class Pessoas{

  @PrimaryGeneratedColumn('increment')
  CODIGO_PESSOA: number;

  @Column('varchar', { length: 256 })
  NOME: string;

  @Column('varchar', {length: 256})
  SOBRENOME: string;

  @Column({type: 'int', width: 3})
  IDADE: number;

  @Column('varchar', {length: 50})
  LOGIN: string;

  @Column('varchar', {length: 50})
  SENHA: string;

  @Column({type: 'int', width: 3})
  STATUS: number;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_ENDERECO')
class Endereco{

  @PrimaryGeneratedColumn('increment')
  CODIGO_ENDERECO: number;

  @Column({type: 'int', width: 9})
  CODIGO_PESSOA: number;

  @Column({type: 'int', width: 9})
  CODIGO_BAIRRO: number;

  @Column('varchar', {length: 256})
  NOME_RUA: string;

  @Column('varchar', {length: 10})
  NUMERO: string;

  @Column('varchar', {length: 20})
  COMPLEMENTO: string;

  @Column('varchar', {length: 10})
  CEP: string;

}


export default Endereco;

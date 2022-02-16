import Bairro from '@modules/bairros/typeorm/entities/Bairro';
import Pessoa from '@modules/pessoas/typeorm/entities/Pessoa';
import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('TB_ENDERECO')
class Endereco {
  @PrimaryColumn({ name: "CODIGO_ENDERECO", type: "int", nullable: false })
  codigoEndereco: number;

  @Column({ name: "CODIGO_PESSOA", type: 'int', width: 9 })
  codigoPessoa: number;

  @Column({ name: "CODIGO_BAIRRO", type: 'int', width: 9 })
  codigoBairro: number;

  @Column({ name: "NOME_RUA", type: 'varchar', length: 256 })
  nomeRua: string;

  @Column({ name: "NUMERO", type: 'varchar', length: 10 })
  numero: string;

  @Column({ name: "COMPLEMENTO", type: 'varchar', length: 20 })
  complemento: string;

  @Column({ name: "CEP", type: 'varchar', length: 10 })
  cep: string;

  @ManyToOne(() => Bairro)
  @JoinColumn({name: "CODIGO_BAIRRO"})
  bairro: Bairro;

  @ManyToOne(() => Pessoa)
  @JoinColumn({name: "CODIGO_PESSOA"})
  pessoa: Pessoa;
}

export default Endereco;

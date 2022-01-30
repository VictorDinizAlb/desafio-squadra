import EnderecoTratado from '@modules/enderecos/typeorm/entities/EnderecoTratado';
import BairroTratadoPessoa from './BairroTratadoPessoa';

export default class EnderecoTratadoPessoa {
  endereco: EnderecoTratado[]
  bairro: BairroTratadoPessoa;

  constructor(
    endereco: EnderecoTratado[],
    bairro: BairroTratadoPessoa
  ) {
    this.endereco = endereco;
    this.bairro = bairro;
  }
}

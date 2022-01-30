import BairroTratado from "@modules/bairros/typeorm/entities/BairroTratado";

export default class EnderecoTratado {
  codigoEndereco: number;
  codigoBairro: number;
  codigoPessoa: number;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro?: BairroTratado

  constructor(
    codigoEndereco: number,
    codigoBairro: number,
    codigoPessoa: number,
    nomeRua: string,
    numero: string,
    complemento: string,
    cep: string,
    bairro?: BairroTratado
  ) {
    this.codigoEndereco = codigoEndereco;
    this.codigoBairro = codigoBairro;
    this.codigoPessoa = codigoPessoa;
    this.nomeRua = nomeRua;
    this.numero = numero;
    this.complemento = complemento;
    this.cep = cep;
    this.bairro = bairro;
  }
}

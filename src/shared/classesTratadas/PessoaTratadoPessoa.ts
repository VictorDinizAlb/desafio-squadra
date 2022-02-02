import EnderecoTratado from '@modules/enderecos/typeorm/entities/EnderecoTratado';
import PessoaTratado from '@modules/pessoas/typeorm/entities/PessoaTratado';

export default class PessoaTratadoPessoa {
  codigoPessoa: number;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  enderecos: EnderecoTratado | EnderecoTratado[];
  status: number;

  constructor(
    pessoa: PessoaTratado,
    enderecos: EnderecoTratado | EnderecoTratado[],
  ) {
    this.codigoPessoa = pessoa.codigoPessoa;
    this.nome = pessoa.nome;
    this.sobrenome = pessoa.sobrenome;
    this.idade = pessoa.idade;
    this.login = pessoa.login;
    this.senha = pessoa.senha;
    this.enderecos = enderecos;
    this.status = pessoa.status;
  }
}

class PessoaTratado {
  codigoPessoa: number;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;

  constructor(
    codigoPessoa: number,
    nome: string,
    sobrenome: string,
    idade: number,
    login: string,
    senha: string,
    status: number,
  ) {
    this.codigoPessoa = codigoPessoa;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.idade = idade;
    this.login = login;
    this.senha = senha;
    this.status = status;
  }
}

export default PessoaTratado;

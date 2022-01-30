import { Request, Response } from 'express';
import CriarPessoaService from '../services/CriarPessoaService';
import ListarPessoaService from '../services/ListarPessoaService';
import ConsultarPessoaService from '../services/ConsultarPessoaService';
// import AlterarPessoaService from '../services/AlterarPessoaService';
// import DeletarPessoaService from '../services/DeletarPessoaService';
import AppError from '@shared/errors/AppError';
import CriarEnderecoService from '@modules/enderecos/services/CriarEnderecoService';

export default class PessoasController {
  public async listar(request: Request, response: Response): Promise<Response> {
    const { codigoPessoa } = request.query;

    if (codigoPessoa !== undefined) {
      const pessoaPorCodigo = new ConsultarPessoaService();
      const pessoa = await pessoaPorCodigo.procurarPorCodigo(pessoaPorCodigo);

      return response.json(pessoa);
    } else {
      const listapessoas = new ListarPessoaService();
      const pessoa = await listapessoas.execute();

      return response.json(pessoa);
    }
  }

  public async gravar(request: Request, response: Response): Promise<Response> {

    // console.log(request.body.enderecos[0]);
    const { nome, sobrenome, idade, login, senha, status } = request.body;
    const NOME = nome;
    const SOBRENOME = sobrenome;
    const IDADE = idade;
    const LOGIN = login;
    const SENHA = senha;
    const STATUS = status;

    const enderecos = request.body.enderecos;

    const criarPessoa = new CriarPessoaService();
    const listaPessoa = new ListarPessoaService();
    const criarEndereco = new CriarEnderecoService();

    const pessoa = await criarPessoa.execute({
      NOME,
      SOBRENOME,
      IDADE,
      LOGIN,
      SENHA,
      STATUS
    });

    if (pessoa instanceof AppError) {
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    } else {
      let i = 0;
      while (i < enderecos.length) {
        const { codigoBairro, nomeRua, numero, complemento, cep } = enderecos[i];

        await criarEndereco.execute({ codigoBairro, nomeRua, numero, complemento, cep }, pessoa.CODIGO_PESSOA);

        i++;
      }



      const listaBairroAtual = await listaPessoa.execute();
      return response.status(201).json(listaBairroAtual);
    }
  }

  // public async alterar(
  //   request: Request,
  //   response: Response,
  // ): Promise<Response> {
  //   const { codigoBairro, codigoMunicipio, nome, status } = request.body;
  //   const CODIGO_BAIRRO = codigoBairro;
  //   const CODIGO_MUNICIPIO = codigoMunicipio;
  //   const NOME = nome;
  //   const STATUS = status;

  //   const alterarBairro = new AlterarBairroService();
  //   const listaBairros = new ListarBairroService();

  //   await alterarBairro.execute({
  //     CODIGO_BAIRRO,
  //     CODIGO_MUNICIPIO,
  //     NOME,
  //     STATUS,
  //   });

  //   const listaBairrosAtual = await listaBairros.execute();
  //   return response.json(listaBairrosAtual);
  // }

  // public async deletar(
  //   request: Request,
  //   response: Response,
  // ): Promise<Response> {
  //   const { CODIGO_BAIRRO } = request.params;

  //   const deletaBairro = new DeletarBairroService();
  //   const listaBairros = new ListarBairroService();

  //   const result = await deletaBairro.execute(CODIGO_BAIRRO);

  //   if (result) {
  //     return response.status(404).json({
  //       status: 404,
  //       mensagem: 'Nao foi possivel fazer conexao com o banco.',
  //     });
  //   } else {
  //     const listaBairrosAtual = await listaBairros.execute();
  //     return response.json(listaBairrosAtual);
  //   }
  // }
}

import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import CriarPessoaService from '../services/CriarPessoaService';
import ListarPessoaService from '../services/ListarPessoaService';
import ConsultarPessoaService from '../services/ConsultarPessoaService';
import DeletarPessoaService from '../services/DeletarPessoaService';
import CriarEnderecoService from '@modules/enderecos/services/CriarEnderecoService';
import DeletarEnderecoService from '@modules/enderecos/services/DeletarEnderecoService';
import AlterarPessoaService from '../services/AlterarPessoaService';
import { EnderecoRepository } from '@modules/enderecos/typeorm/repositories/EnderecosRepository';
import AlterarEnderecoService from '@modules/enderecos/services/AlterarEnderecoService';

export default class PessoasController {
  public async listar(request: Request, response: Response): Promise<Response> {
    const { codigoPessoa } = request.query;

    if (codigoPessoa !== undefined) {
      const pessoaPorCodigo = new ConsultarPessoaService();
      const pessoa = await pessoaPorCodigo.procurarPorCodigo(codigoPessoa);

      return response.json(pessoa);
    } else {
      const listapessoas = new ListarPessoaService();
      const pessoa = await listapessoas.execute();

      return response.json(pessoa);
    }
  }

  public async gravar(request: Request, response: Response): Promise<Response> {
    const { nome, sobrenome, idade, login, senha, status } = request.body;

    const enderecos = request.body.enderecos;

    const criarPessoa = new CriarPessoaService();
    const listaPessoa = new ListarPessoaService();
    const criarEndereco = new CriarEnderecoService();

    const pessoa = await criarPessoa.execute({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
    });

    if (pessoa instanceof AppError) {
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    } else {
      for (let i = 0; i < enderecos.length; i++) {
        const { codigoBairro, nomeRua, numero, complemento, cep } =
          enderecos[i];

        await criarEndereco.execute(
          codigoBairro,
          nomeRua,
          numero,
          complemento,
          cep,
          pessoa.codigoPessoa,
        );
      }

      const listaBairroAtual = await listaPessoa.execute();
      return response.status(201).json(listaBairroAtual);
    }
  }

  public async alterar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoPessoa, nome, sobrenome, idade, login, senha, status } = request.body;

    const alterarPessoa = new AlterarPessoaService();
    const listaPessoas = new ListarPessoaService();

    const deuErrado = await alterarPessoa.execute({
      codigoPessoa,
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
    });

    if(deuErrado){
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    }

    const enderecos = request.body.enderecos;

    const alterarEnderecos = new AlterarEnderecoService();

    alterarEnderecos.execute(enderecos, codigoPessoa);

    const listaPessoasAtual = await listaPessoas.execute();
    return response.json(listaPessoasAtual);
  }

  public async deletar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoPessoa } = request.params;

    const deletaPessoa = new DeletarPessoaService();
    const listaPessoas = new ListarPessoaService();

    const result = await deletaPessoa.execute(parseInt(codigoPessoa));

    if (result) {
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    } else {
      const deletaEndereco = new DeletarEnderecoService();
      await deletaEndereco.execute(parseInt(codigoPessoa));

      const listaPessoasAtual = await listaPessoas.execute();
      return response.json(listaPessoasAtual);
    }
  }
}

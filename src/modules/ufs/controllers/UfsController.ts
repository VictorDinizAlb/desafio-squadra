import { Request, Response } from 'express';
import CriarUfService from '../services/CriarUfService';
import ListarUfService from '../services/ListarUfService';
import ConsultarUfService from '../services/ConsultarUfService';
import AlterarUfService from '../services/AlterarUfService';
import DeletarUfService from '../services/DeletarUfService';
import AppError from '@shared/errors/AppError';

export default class UfsController {
  public async listar(request: Request, response: Response): Promise<Response> {
    const { codigoUF, sigla } = request.query;

    if (codigoUF !== undefined) {
      const ufPorCodigo = new ConsultarUfService();

      const uf = await ufPorCodigo.procurarPorCodigo(codigoUF);

      if(!uf){
        return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
      } else {
        return response.json(uf);
      };
    } else if (sigla !== undefined) {
      const ufPorSigla = new ConsultarUfService();

      const uf = await ufPorSigla.procurarPorSigla(sigla.toString());
      if(!uf){
        return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
      } else {
        return response.json(uf);
      };

    } else {
      const listaUfs = new ListarUfService();

      const uf = await listaUfs.execute();

      return response.json(uf);
    }
  }

  public async gravar(request: Request, response: Response): Promise<Response> {
    const { sigla, nome, status } = request.body;

    const criarUf = new CriarUfService();
    const listaUf = new ListarUfService();

    const uf = await criarUf.execute({ sigla, nome, status });

    if (uf instanceof AppError) {
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    } else {
      const listaUfAtual = await listaUf.execute();
      return response.status(201).json(listaUfAtual);
    }
  }

  public async alterar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoUF, nome, sigla, status } = request.body;

    const alterarUf = new AlterarUfService();
    const listaUfs = new ListarUfService();

    const deuErrado = await alterarUf.execute({ codigoUF, nome, sigla, status });

    if(deuErrado == true){
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    }

    const listaUfsAtual = await listaUfs.execute();
    return response.json(listaUfsAtual);
  }

  public async deletar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoUF } = request.params;

    const deletaUf = new DeletarUfService();
    const listaUfs = new ListarUfService();

    const result = await deletaUf.execute(parseInt(codigoUF));

    if (result) {
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    } else {
      const listaUfsAtual = await listaUfs.execute();
      return response.json(listaUfsAtual);
    }
  }
}

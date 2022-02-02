import { Request, Response } from 'express';
import CriarMunicipioService from '../services/CriarMunicipioService';
import ListarMunicipioService from '../services/ListarMunicipioService';
import ConsultarMunicipioService from '../services/ConsultarMunicipioService';
import AlterarMunicipioService from '../services/AlterarMunicipioService';
import DeletarMunicipioService from '../services/DeletarMunicipioService';
import AppError from '@shared/errors/AppError';

export default class MunicipiosController {
  public async listar(request: Request, response: Response): Promise<Response> {
    const { codigoMunicipio, codigoUF, nome } = request.query;

    if (codigoMunicipio !== undefined) {
      const municipioPorCodigo = new ConsultarMunicipioService();
      const municipio = await municipioPorCodigo.procurarPorCodigo(codigoMunicipio);

      if(!municipio){
        return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
      } else {
        return response.json(municipio);
      };
    } else if (nome !== undefined) {
      const municipioPorNome = new ConsultarMunicipioService();
      const municipio = await municipioPorNome.procurarPorNome(nome.toString());

      if(!municipio){
        return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
      } else {
        return response.json(municipio);
      };
    } else if (codigoUF !== undefined) {
      const municipioPorNome = new ConsultarMunicipioService();
      const municipio = await municipioPorNome.procurarPorCodigoUF(codigoUF);

      if(!municipio){
        return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
      } else {
        return response.json(municipio);
      };
    } else {
      const listaMunicipios = new ListarMunicipioService();
      const municipio = await listaMunicipios.execute();

      return response.json(municipio);
    }
  }

  public async gravar(request: Request, response: Response): Promise<Response> {
    const { codigoUF, nome, status } = request.body;
    const CODIGO_UF = codigoUF;
    const NOME = nome;
    const STATUS = status;

    const criarMunicipio = new CriarMunicipioService();
    const listaMunicipio = new ListarMunicipioService();

    const municipio = await criarMunicipio.execute({ CODIGO_UF, NOME, STATUS });

    if (municipio instanceof AppError) {
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    } else {
      const listaMunicipioAtual = await listaMunicipio.execute();
      return response.status(201).json(listaMunicipioAtual);
    }
  }

  public async alterar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoMunicipio, codigoUF, nome, status } = request.body;
    const CODIGO_MUNICIPIO = codigoMunicipio;
    const CODIGO_UF = codigoUF;
    const NOME = nome;
    const STATUS = status;

    const alterarMunicipio = new AlterarMunicipioService();
    const listaMunicipios = new ListarMunicipioService();

    const deuErrado = await alterarMunicipio.execute({
      CODIGO_MUNICIPIO,
      CODIGO_UF,
      NOME,
      STATUS,
    });

    if(deuErrado){
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    }

    const listaMunicipiosAtual = await listaMunicipios.execute();
    return response.json(listaMunicipiosAtual);
  }

  public async deletar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { CODIGO_MUNICIPIO } = request.params;

    const deletaMunicipio = new DeletarMunicipioService();
    const listaMunicipios = new ListarMunicipioService();

    const result = await deletaMunicipio.execute(CODIGO_MUNICIPIO);

    if (result) {
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    } else {
      const listaMunicipiosAtual = await listaMunicipios.execute();
      return response.json(listaMunicipiosAtual);
    }
  }
}

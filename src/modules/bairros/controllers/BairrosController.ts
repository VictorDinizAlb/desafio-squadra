import { Request, Response } from 'express';
import CriarBairroService from '../services/CriarBairroService';
import ListarBairroService from '../services/ListarBairroService';
import ConsultarBairroService from '../services/ConsultarBairroService';
import AlterarBairroService from '../services/AlterarBairroService';
import DeletarBairroService from '../services/DeletarBairroService';
import AppError from '@shared/errors/AppError';

export default class BairrosController {
  public async listar(request: Request, response: Response): Promise<Response> {
    const { codigoBairro, codigoMunicipio, nome } = request.query;

    if (codigoBairro !== undefined) {
      const bairroPorCodigo = new ConsultarBairroService();
      const bairro = await bairroPorCodigo.procurarPorCodigo(codigoBairro);

      if(!bairro){
        return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
      } else {
        return response.json(bairro);
      };
    } else if (nome !== undefined) {
      const bairroPornome = new ConsultarBairroService();
      const bairro = await bairroPornome.procurarPorNome(nome.toString());

      if(!bairro){
        return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
      } else {
        return response.json(bairro);
      };
    } else if (codigoMunicipio !== undefined) {
      const bairroPornome = new ConsultarBairroService();
      const bairro = await bairroPornome.procurarPorCodigoMunicipio(
        codigoMunicipio,
      );

      if(!bairro){
        return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
      } else {
        return response.json(bairro);
      };
    } else {
      const listaBairros = new ListarBairroService();
      const bairro = await listaBairros.execute();

      return response.json(bairro);
    }
  }

  public async gravar(request: Request, response: Response): Promise<Response> {
    const { codigoMunicipio, nome, status } = request.body;

    const criarBairro = new CriarBairroService();
    const listaBairro = new ListarBairroService();

    const bairro = await criarBairro.execute({
      codigoMunicipio,
      nome,
      status,
    });

    if (bairro instanceof AppError) {
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    } else {
      const listaBairroAtual = await listaBairro.execute();
      return response.status(201).json(listaBairroAtual);
    }
  }

  public async alterar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoBairro, codigoMunicipio, nome, status } = request.body;

    const alterarBairro = new AlterarBairroService();
    const listaBairros = new ListarBairroService();

    const deuErrado = await alterarBairro.execute({
      codigoBairro,
      codigoMunicipio,
      nome,
      status,
    });

    if(deuErrado == true){
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    }

    const listaBairrosAtual = await listaBairros.execute();
    return response.json(listaBairrosAtual);
  }

  public async deletar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoBairro } = request.params;

    const deletaBairro = new DeletarBairroService();
    const listaBairros = new ListarBairroService();

    const result = await deletaBairro.execute(parseInt(codigoBairro));

    if (result) {
      return response.status(404).json({
        status: 404,
        mensagem: 'Nao foi possivel fazer conexao com o banco.',
      });
    } else {
      const listaBairrosAtual = await listaBairros.execute();
      return response.json(listaBairrosAtual);
    }
  }
}

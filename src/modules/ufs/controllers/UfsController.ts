import { Request, Response } from 'express';
import CriarUfService from '../services/CriarUfService';
// import DeleteProductService from "../services/DeleteProductService";
import ListarUfService from '../services/ListarUfService';
import ConsultarUfService from '../services/ConsultarUfService';
// import UpdateProductService from "../services/UpdateProductService";

export default class UfsController {
  public async listar(request: Request, response: Response): Promise<Response> {
    const { codigoUF, sigla } = request.query;

    if (codigoUF !== undefined) {
      const ufPorCodigo = new ConsultarUfService();

      const uf = await ufPorCodigo.procurarPorCodigo(codigoUF);

      return response.json(uf);
    } else if (sigla !== undefined) {
      const ufPorSigla = new ConsultarUfService();

      const uf = await ufPorSigla.procurarPorSigla(sigla.toString());

      return response.json(uf);
    } else {
      const listaUfs = new ListarUfService();

      const ufs = await listaUfs.execute();

      return response.json(ufs);
    }
  }

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const { codigoUF } = request.params;
  //   const CODIGO_UF = codigoUF;

  //   const showUf = new ConsultarUfService();

  //   const uf = await showUf.execute({ CODIGO_UF });

  //   return response.json(uf);
  // }

  public async gravar(request: Request, response: Response): Promise<Response> {
    const { sigla, nome, status } = request.body;
    const SIGLA = sigla;
    const NOME = nome;
    const STATUS = status;

    const criarUf = new CriarUfService();

    await criarUf.execute({ SIGLA, NOME, STATUS });

    const listaUfs = new ListarUfService();

    const ufs = await listaUfs.execute();

    return response.json(ufs);
  }

  // public async teste(): Promise<any>{
  //   const ufSequence = new CriarUfService();
  //   const id = await ufSequence.buscarId();

  // }

  // public async update(request: Request, response: Response): Promise<Response>{
  //   const {name, price, quantity} = request.body;
  //   const {id} = request.params;

  //   const updateProduct = new UpdateProductService();

  //   const product = await updateProduct.execute({id, name, price, quantity});

  //   return response.json(product);

  // }

  // public async delete(request: Request, response: Response): Promise<Response>{
  //   const {id} = request.params;

  //   const deleteProduct = new DeleteProductService();

  //   await deleteProduct.execute({id});

  //   return response.json([]);
  // }
}

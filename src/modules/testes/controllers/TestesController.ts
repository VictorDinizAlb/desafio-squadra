import { Request, Response } from 'express';
import CriarTesteService from '../services/CriarTesteService';
// import DeleteProductService from "../services/DeleteProductService";
import ListarTesteService from '../services/ListarTesteService';
// import ShowProductService from "../services/ShowProductService";
// import UpdateProductService from "../services/UpdateProductService";

export default class TestesController {
  public async listar(request: Request, response: Response): Promise<Response> {
    const listTestes = new ListarTesteService();

    const testes = await listTestes.execute();

    return response.json(testes);
  }

  // public async show(request: Request, response: Response): Promise<Response>{
  //   const { id } = request.params;

  //   const showProduct = new ShowProductService();

  //   const product = await showProduct.execute({id});

  //   return response.json(product);
  // }

  public async gravar(request: Request, response: Response): Promise<Response> {
    const { id, texto } = request.body;
    const criarTeste = new CriarTesteService();

    const teste = await criarTeste.execute({ id, texto });

    return response.json(teste);
  }

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

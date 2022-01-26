import { Request, Response } from "express";
import CriarUfService from "../services/CriarUfService";
// import DeleteProductService from "../services/DeleteProductService";
// import ListProductService from "../services/ListProductService";
// import ShowProductService from "../services/ShowProductService";
// import UpdateProductService from "../services/UpdateProductService";

export default class UfsController {

  // public async index(request: Request, response: Response): Promise<Response>{
  //   const listProducts = new ListProductService();

  //   const products = await listProducts.execute();

  //   return response.json(products);
  // }

  // public async show(request: Request, response: Response): Promise<Response>{
  //   const { id } = request.params;

  //   const showProduct = new ShowProductService();

  //   const product = await showProduct.execute({id});

  //   return response.json(product);
  // }

  public async gravar(request: Request, response: Response): Promise<Response>{
    const {sigla, nome, status} = request.body;
    let SIGLA = sigla;
    let NOME = nome;
    let STATUS = status;

    const criarUf = new CriarUfService();

    const product = await criarUf.execute({SIGLA, NOME, STATUS});

    return response.json(product);
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



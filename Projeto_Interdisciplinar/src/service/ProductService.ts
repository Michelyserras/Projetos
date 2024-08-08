import { ClienteEntity } from "../model/entity/Cliente";
import { ClienteRepository } from "../repository/ClienteRepository";
//teste
export class ProductService{

    productRepository: ClienteRepository = new ClienteRepository();

    async cadastrarProduto(produtoData: any): Promise<ClienteEntity> {
        const { name, price, expirationDate } = produtoData;
        
        const produto = new ClienteEntity(undefined, name, price, expirationDate)

        const novoProduto =  await this.productRepository.insertProduct(produto);
        console.log("Service - Insert ", novoProduto);
        return novoProduto;
    }

    async atualizarProduto(produtoData: any): Promise<ClienteEntity> {
        const { id, name, price, expirationDate } = produtoData;

        const produto = new ClienteEntity(id, name, price, expirationDate)

        await this.productRepository.updateProduct(produto);
        console.log("Service - Update ", produto);
        return produto;
    }

    async deletarProduto(produtoData: any): Promise<ClienteEntity> {
        const { id, name, price, expirationDate } = produtoData;

        const produto = new ClienteEntity(id, name, price, expirationDate)

        await this.productRepository.deleteProduct(produto);
        console.log("Service - Delete ", produto);
        return produto;
    }

    async filtrarProduto(produtoData: any): Promise<ClienteEntity> {
        const idNumber = parseInt(produtoData, 10);

        const produto =  await this.productRepository.filterProduct(idNumber);
        console.log("Service - Filtrar", produto);
        return produto;
    }

    async listarTodosProdutos(): Promise<ClienteEntity[]> {
        const produto =  await this.productRepository.filterAllProduct();
        console.log("Service - Filtrar Todos", produto);
        return produto;
    }

}
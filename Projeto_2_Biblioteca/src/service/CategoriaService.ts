import { CategoriaEntity } from "../model/entity/Categoria";
import { CategoriaRepository } from "../repository/CategoriaRepository";

export class CategoriaService{

    private categoriaRepository = CategoriaRepository.getInstance();

    async cadastrarCategoria(categoriaData: any): Promise<CategoriaEntity> { //DEVE VERIFICAR SE O NOME DA CATEGORIA JÁ ESTÁ CADASTRADA?
        const { nome } = categoriaData;
        
        const categoria = new CategoriaEntity(undefined, nome);

        const novaCategoria =  await this.categoriaRepository.cadastrarCategoria(categoria);
        console.log("Service - Insert ", novaCategoria);
        return novaCategoria;
    }

    async atualizarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { id, nome} = categoriaData;

        const categoria = new CategoriaEntity(id, nome);

        await this.categoriaRepository.atualizarCategoria(categoria);
        console.log("Service - Update ", categoria);
        return categoria;
    }

    async deletarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { id, nome } = categoriaData;

        const categoria = new CategoriaEntity(id, nome);

        await this.categoriaRepository.deletarCategoria(categoria.id);
        console.log("Service - Delete ", categoria);
        return categoria;
    }

    async filtrarCategoria(categoriaData: any): Promise<CategoriaEntity | null> {
        const idNumber = parseInt(categoriaData, 10);

        const categoria =  await this.categoriaRepository.filtrarCategoriaPorId(idNumber);
        console.log("Service - Filtrar", categoria);
        return categoria;
    }

    async listarTodasCategorias(): Promise<CategoriaEntity[] | null> {
        const categoria =  await this.categoriaRepository.listarTodasCategorias();
        console.log("Service - Filtrar Todos", categoria);
        return categoria;
    }
}
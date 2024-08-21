import { CategoriaEntity } from "../model/entity/CategoriaEntity";
import { CategoriaRepository } from "../repository/CategoriaRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class CategoriaService{

    private categoriaRepository = CategoriaRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();

    async cadastrarCategoria(categoriaData: any): Promise<CategoriaEntity> { 
        const { nome } = categoriaData;
        const nomeEncontrado = await this.categoriaRepository.pesquisarCategoriaPorNome(nome); //Verifica se o nome da categoria já está cadastrado

        if(nomeEncontrado !== null){ //Se o nome já estiver cadastrado não realiza o cadastro da categoria para impedir nomes duplicados
            throw new Error("O nome dessa categoria já está cadastrado.");
        }
        
        const categoria = new CategoriaEntity(undefined, nome);

        const novaCategoria =  await this.categoriaRepository.cadastrarCategoria(categoria);
        console.log("Service - Insert ", novaCategoria);
        return novaCategoria;
    }

    async atualizarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { id, nome} = categoriaData;
        const categoriaEncontrada = await this.filtrarCategoria(id); //Verifica se a categoria está cadastrada

        if(categoriaEncontrada === null){ //Se a categoria não estiver cadastrada não realiza as atualizações
            throw new Error("Categoria não cadastrada.");
        }

        const categoria = new CategoriaEntity(id, nome);

        await this.categoriaRepository.atualizarCategoria(categoria);
        console.log("Service - Update ", categoria);
        return categoria;
    }

    async deletarCategoria(id: any): Promise<CategoriaEntity> {
        const categoriaEncontrada = await this.filtrarCategoria(id); //Verifica se a categoria está cadastrada
        const livroDaCategoria = 

        if(categoriaEncontrada === null){ //Se a categoria não estiver cadastrada não realiza o delete
            throw new Error("Categoria não cadastrada.");
        }

        await this.categoriaRepository.deletarCategoria(id);
        console.log("Service - Delete ", categoriaEncontrada);
        return categoriaEncontrada;
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
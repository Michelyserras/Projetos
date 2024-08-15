import { LivroEntity } from "../model/entity/Livro";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaRepository } from "../repository/CategoriaRepository";

export class LivroService{

    private livroRepository = LivroRepository.getInstance();
    private categoriaRepository = CategoriaRepository.getInstance();

    async cadastrarLivro(livroData: any): Promise<LivroEntity> { //Ao cadastrar um livro, verficar se a categoria existe.
        const { titulo, autor, categoriaId } = livroData;
        const categoriaEncontrada = await this.categoriaRepository.filtrarCategoriaPorId(categoriaId); //Verifica se a categoria existe

        if(categoriaEncontrada === null){ //Se a categoria não estiver cadastrada o livro não é cadastrado
            throw new Error("Categoria não cadastrada.");
        }

        const livro = new LivroEntity(undefined, titulo, autor, categoriaId);

        const novoLivro =  await this.livroRepository.cadastrarLivro(livro);
        console.log("Service - Insert ", novoLivro);
        return novoLivro;
    }

    async atualizarLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, categoriaId } = livroData;

        const livro = new LivroEntity(id, titulo, autor, categoriaId);

        await this.livroRepository.atualizarLivro(livro);
        console.log("Service - Update ", livro);
        return livro;
    }

    async deletarLivro(livroData: any): Promise<LivroEntity> {
        const { id, name, price, expirationDate } = livroData;

        const livro = new LivroEntity(id, name, price, expirationDate);

        await this.livroRepository.deletarLivro(livro.id);
        console.log("Service - Delete ", livro);
        return livro;
    }

    async filtrarLivro(livroData: any): Promise<LivroEntity | null> {
        const idNumber = parseInt(livroData, 10);

        const livro =  await this.livroRepository.filtrarLivroPorId(idNumber);
        console.log("Service - Filtrar", livro);
        return livro;
    }

    async listarTodosLivros(): Promise<LivroEntity[] | null> {
        const livro =  await this.livroRepository.listarTodasLivros();
        console.log("Service - Filtrar Todos", livro);
        return livro;
    }
}
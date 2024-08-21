import { LivroEntity } from "../model/entity/LivroEntity";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaRepository } from "../repository/CategoriaRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";

export class LivroService{

    private livroRepository = LivroRepository.getInstance();
    private categoriaRepository = CategoriaRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance();

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
        const livroEncontrado = await this.filtrarLivro(id); //Verifica se o livro com esse id está cadastrado
        const categoriaEncontrada = await this.categoriaRepository.filtrarCategoriaPorId(categoriaId); //Verifica se a categoria existe

        if(livroEncontrado === null || categoriaEncontrada === null){ //Se o livro ou a categoria não estiverem cadastrados não é possível realizar as atualizações
            throw new Error("Livro ou categoria não cadastrados."); 
        }

        const livro = new LivroEntity(id, titulo, autor, categoriaId);

        await this.livroRepository.atualizarLivro(livro);
        console.log("Service - Update ", livro);
        return livro;
    }

    async deletarLivro(id: any): Promise<LivroEntity> { 
        const livroEncontrado = await this.filtrarLivro(id); //Verifica se o livro com esse id está cadastrado
        const livroEmprestado = await this.emprestimoRepository.filtrarEmprestimoPorLivroId(id);

        if(livroEncontrado === null){ //Se o livro não estiver cadastrado não é possível realizar o delete
            throw new Error("Livro não cadastrado.");
        }
        else if(livroEmprestado){
            throw new Error("Este livro está emprestado no momento! Não pode ser deletado.");
        }

        await this.livroRepository.deletarLivro(id);
        console.log("Service - Delete ", livroEncontrado);
        return livroEncontrado;
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
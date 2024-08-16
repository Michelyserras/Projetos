/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PessoaController } from '../controller/PessoaController';
import { UsuarioController } from '../controller/UsuarioController';
import { LivroController } from '../controller/LivroController';
import { CategoriaController } from '../controller/CategoriaController';
import { EmprestimoController } from '../controller/EmprestimoController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "PessoaRequestDto": {
        "dataType": "refObject",
        "properties": {
            "nome": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsuarioRequestDto": {
        "dataType": "refObject",
        "properties": {
            "idPessoa": {"dataType":"double","required":true},
            "senha": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroRequestDto": {
        "dataType": "refObject",
        "properties": {
            "titulo": {"dataType":"string","required":true},
            "autor": {"dataType":"string","required":true},
            "categoriaId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoriaRequestDto": {
        "dataType": "refObject",
        "properties": {
            "nome": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmprestimoRequestDto": {
        "dataType": "refObject",
        "properties": {
            "livroId": {"dataType":"double","required":true},
            "usuarioId": {"dataType":"double","required":true},
            "dataEmprestimo": {"dataType":"string","required":true},
            "dataDevolucao": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsuarioEntity": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "idPessoa": {"dataType":"double","required":true},
            "senha": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },

    "PessoaEntity": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "nome": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },

    "LivroEntity": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "titulo": {"dataType":"string","required":true},
            "autor": {"dataType":"string","required":true},
            "categoriaId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },

    "EmprestimoEntity": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "livroId": {"dataType":"double","required":true},
            "usuarioId": {"dataType":"double","required":true},
            "dataEmprestimo": {"dataType":"string","required":true},
            "dataDevolucao": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },

    "CategoriaEntity": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "nome": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },

    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    //CONTROLLER USUARIO
    app.post('/Usuario/CadastrarUsuario',
        ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
        ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.cadastrarUsuario)),

        async function UsuarioController_cadastrarUsuario(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"UsuarioRequestDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new UsuarioController();

          await templateService.apiHandler({
            methodName: 'cadastrarUsuario',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/Usuario/AtualizarUsuario',
        ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
        ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.atualizarUsuario)),

        async function UsuarioController_atualizarUsuario(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                usuarioBody: {"in":"body","name":"usuarioBody","required":true,"ref":"UsuarioEntity"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new UsuarioController();

          await templateService.apiHandler({
            methodName: 'atualizarUsuario',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/Usuario/DeletarUsuario',
        ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
        ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.deleteUsuario)),

        async function UsuarioController_deleteUsuario(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                usuarioBody: {"in":"body","name":"usuarioBody","required":true,"ref":"UsuarioEntity"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new UsuarioController();

          await templateService.apiHandler({
            methodName: 'deleteUsuario',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/Usuario/filtrarUsuario',
        ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
        ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.filtrarUsuario)),

        async function UsuarioController_filtrarUsuario(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                param: {"in":"query","name":"param","required":true,"dataType":"double"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new UsuarioController();

          await templateService.apiHandler({
            methodName: 'filtrarUsuario',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/Usuario/listarTodosUsuarios',
        ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
        ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.listarTodosUsuarios)),

        async function UsuarioController_ListarTodosUsuarios(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new UsuarioController();

          await templateService.apiHandler({
            methodName: 'listarTodosUsuarios',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/Pessoa/CadastrarPessoa',
            ...(fetchMiddlewares<RequestHandler>(PessoaController)),
            ...(fetchMiddlewares<RequestHandler>(PessoaController.prototype.cadastrarPessoa)),

            async function PessoaController_cadastrarPessoa(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    dto: {"in":"body","name":"dto","required":true,"ref":"PessoaRequestDto"},
                    fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                    sucess: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PessoaController();

              await templateService.apiHandler({
                methodName: 'cadastrarPessoa',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/Pessoa/AtualizarPessoa',
            ...(fetchMiddlewares<RequestHandler>(PessoaController)),
            ...(fetchMiddlewares<RequestHandler>(PessoaController.prototype.atualizarPessoa)),

            async function PessoaController_atualizarPessoa(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    pessoaBody: {"in":"body","name":"pessoaBody","required":true,"ref":"PessoaEntity"},
                    notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                    fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                    sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PessoaController();

              await templateService.apiHandler({
                methodName: 'atualizarPessoa',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/Pessoa/DeletarPessoa',
            ...(fetchMiddlewares<RequestHandler>(PessoaController)),
            ...(fetchMiddlewares<RequestHandler>(PessoaController.prototype.deletePessoa)),

            async function PessoaController_deletePessoa(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    pessoaBody: {"in":"body","name":"pessoaBody","required":true,"ref":"PessoaEntity"},
                    notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                    fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                    sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PessoaController();

              await templateService.apiHandler({
                methodName: 'deletePessoa',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/Pessoa/filtrarPessoa',
            ...(fetchMiddlewares<RequestHandler>(PessoaController)),
            ...(fetchMiddlewares<RequestHandler>(PessoaController.prototype.filtrarPessoa)),

            async function PessoaController_filtrarPessoa(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    param: {"in":"query","name":"param","required":true,"dataType":"double"},
                    notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                    fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                    sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PessoaController();

              await templateService.apiHandler({
                methodName: 'filtrarPessoa',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/Pessoa/listarTodasPessoas',
            ...(fetchMiddlewares<RequestHandler>(PessoaController)),
            ...(fetchMiddlewares<RequestHandler>(PessoaController.prototype.listarTodasPessoas)),

            async function PessoaController_ListarTodosPessoas(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                    fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                    sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PessoaController();

              await templateService.apiHandler({
                methodName: 'listarTodasPessoas',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/Livro/CadastrarLivro',
        ...(fetchMiddlewares<RequestHandler>(LivroController)),
        ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.cadastrarLivro)),

        async function LivroController_cadastrarLivro(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"LivroRequestDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new LivroController();

          await templateService.apiHandler({
            methodName: 'cadastrarLivro',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/Livro/AtualizarLivro',
        ...(fetchMiddlewares<RequestHandler>(LivroController)),
        ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.atualizarLivro)),

        async function LivroController_atualizarLivro(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                livroBody: {"in":"body","name":"livroBody","required":true,"ref":"LivroEntity"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new LivroController();

          await templateService.apiHandler({
            methodName: 'atualizarLivro',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/Livro/DeletarLivro',
        ...(fetchMiddlewares<RequestHandler>(LivroController)),
        ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.deleteLivro)),

        async function LivroController_deleteLivro(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                livroBody: {"in":"body","name":"livroBody","required":true,"ref":"LivroEntity"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new LivroController();

          await templateService.apiHandler({
            methodName: 'deleteLivro',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/Livro/filtrarLivro',
        ...(fetchMiddlewares<RequestHandler>(LivroController)),
        ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.filtrarLivro)),

        async function LivroController_filtrarLivro(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                param: {"in":"query","name":"param","required":true,"dataType":"double"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new LivroController();

          await templateService.apiHandler({
            methodName: 'filtrarLivro',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/Livro/listarTodosLivros',
        ...(fetchMiddlewares<RequestHandler>(LivroController)),
        ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.listarTodosLivros)),

        async function LivroController_ListarTodosLivros(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new LivroController();

          await templateService.apiHandler({
            methodName: 'listarTodosLivros',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/Emprestimo/CadastrarEmprestimo',
        ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
        ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.cadastrarEmprestimo)),

        async function EmprestimoController_cadastrarEmprestimo(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"EmprestimoRequestDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new EmprestimoController();

          await templateService.apiHandler({
            methodName: 'cadastrarEmprestimo',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/Emprestimo/AtualizarEmprestimo',
        ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
        ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.atualizarEmprestimo)),

        async function EmprestimoController_atualizarEmprestimo(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                emprestimoBody: {"in":"body","name":"emprestimoBody","required":true,"ref":"EmprestimoEntity"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new EmprestimoController();

          await templateService.apiHandler({
            methodName: 'atualizarEmprestimo',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/Emprestimo/DeletarEmprestimo',
        ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
        ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.deleteEmprestimo)),

        async function EmprestimoController_deleteEmprestimo(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                emprestimoBody: {"in":"body","name":"emprestimoBody","required":true,"ref":"EmprestimoEntity"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new EmprestimoController();

          await templateService.apiHandler({
            methodName: 'deleteEmprestimo',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/Emprestimo/filtrarEmprestimo',
        ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
        ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.filtrarEmprestimo)),

        async function EmprestimoController_filtrarEmprestimo(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                param: {"in":"query","name":"param","required":true,"dataType":"double"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new EmprestimoController();

          await templateService.apiHandler({
            methodName: 'filtrarEmprestimo',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/Emprestimo/listarTodosEmprestimos',
        ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
        ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.listarTodosEmprestimos)),

        async function EmprestimoController_ListarTodosEmprestimos(request: ExRequest, response: ExResponse, next: any) {
        const args: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        let validatedArgs: any[] = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });

            const controller = new EmprestimoController();

          await templateService.apiHandler({
            methodName: 'listarTodosEmprestimos',
            controller,
            response,
            next,
            validatedArgs,
            successStatus: undefined,
          });
        } catch (err) {
            return next(err);
        }
    });
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

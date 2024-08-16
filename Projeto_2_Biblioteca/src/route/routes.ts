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

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

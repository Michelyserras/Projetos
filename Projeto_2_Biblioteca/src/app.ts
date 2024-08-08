import express from 'express';
import { setupSwagger } from './config/swagger';
import {RegisterRoutes} from './route/routes';
//import { cadastrarProduto, atualizarProduto, deletarProduto, filtrarProduto, listarTodosProduto } from './controller/ProductController';

const app = express();

const PORT = 3040;

app.use(express.json());

const apiRouter = express.Router();
RegisterRoutes(apiRouter);
app.use('/api', apiRouter);
RegisterRoutes(app);
setupSwagger(app);

app.listen(PORT, ()=> console.log("API online na porta: " + PORT));
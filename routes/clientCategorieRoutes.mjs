import express from 'express';
import Knex from 'knex';
import knexConfig from '../knexfile.mjs';
import ClientCategorieController from '../controllers/ClientCategorieController.mjs';

const router = express.Router();
const knex = Knex(knexConfig.development);
const clientCategorieController = new ClientCategorieController(knex);

router.post('/', async (req, res) => {
    const { categoryId, clientIds } = req.body;

    try {
        const results = await Promise.all(
            clientIds.map(clientId => 
                clientCategorieController.associateClientToCategory({ clientId, categoryId })
            )
        );
        res.status(200).json({ message: 'Clientes associados à categoria com sucesso.', ids: results.map(r => r.id) });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao associar clientes à categoria: ' + error.message });
    }
});

router.get('/:categoryId', async (req, res) => {
    const { categoryId } = req.params;

    try {
        const clients = await clientCategorieController.getClientsByCategory(categoryId);
        res.status(200).json({ clients });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar clientes da categoria: ' + error.message });
    }
});

router.put('/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    const { clientIds } = req.body;

    try {
        await clientCategorieController.updateClientsInCategory(categoryId, clientIds);
        res.status(200).json({ message: 'Clientes atualizados na categoria com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar clientes na categoria: ' + error.message });
    }
});

router.delete('/:categoryId/:clientId', async (req, res) => {
    const { categoryId, clientId } = req.params;

    try {
        await clientCategorieController.deleteClientFromCategory(categoryId, clientId);
        res.status(200).json({ message: 'Cliente removido da categoria com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover cliente da categoria: ' + error.message });
    }
});

export default router;

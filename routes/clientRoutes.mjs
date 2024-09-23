import express from 'express';
import ClientController from '../controllers/ClientController.mjs';
import Knex from 'knex';
import knexConfig from '../knexfile.mjs';

const router = express.Router();
const knex = Knex(knexConfig.development);
const clientController = new ClientController(knex);

// Rota para criar um cliente
router.post('/', async (req, res) => {
    const { name, phone, email, birthdate, gender } = req.body;
    const client = { name, phone, email, birthdate, gender };

    try {
        const result = await clientController.createClient(client);
        res.status(200).json({ message: 'Client created successfully.', id: result.id });
    } catch (error) {
        res.status(500).json({ error: 'Error creating client: ' + error.message });
    }
});

// Rota para obter um cliente por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await clientController.getClient(id);
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ error: 'Client not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving client: ' + error.message });
    }
});

// Rota para atualizar um cliente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, phone, email, birthdate, gender } = req.body;
    const client = { name, phone, email, birthdate, gender };

    try {
        await clientController.updateClient(id, client);
        res.status(200).json({ message: 'Client updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating client: ' + error.message });
    }
});

// Rota para deletar um cliente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await clientController.deleteClient(id);
        res.status(200).json({ message: 'Client deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting client: ' + error.message });
    }
});

// Rota para buscar clientes com filtros
router.get('/', async (req, res) => {
    try {
        const { name, phone, email, sex, birthdayStart, birthdayEnd, page, limit } = req.query;
        const query = {
            name,
            phone,
            email,
            gender: sex,
            birthdate: birthdayStart ? { start: birthdayStart, end: birthdayEnd } : undefined,
            page,
            limit
        };

        const result = await clientController.getAllClients(query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching clients: ' + error.message });
    }
});

export default router;

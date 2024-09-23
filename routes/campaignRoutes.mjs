import express from 'express';
import CampaignController from '../controllers/CampaignController.mjs';
import Knex from 'knex';
import knexConfig from '../knexfile.mjs';

const router = express.Router();
const knex = Knex(knexConfig.development);
const campaignController = new CampaignController(knex);

// Criar Campanha
router.post('/', async (req, res) => {
    try {
        const campaign = req.body;
        const result = await campaignController.createCampaign(campaign);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error creating campaign: ' + error.message });
    }
});

// Listar Campanhas
router.get('/', async (req, res) => {
    try {
        const campaigns = await campaignController.getAllCampaigns(req.query);
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving campaigns: ' + error.message });
    }
});

// Atualizar Campanha
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const campaign = req.body;
        await campaignController.updateCampaign(id, campaign);
        res.json({ message: 'Campaign updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating campaign: ' + error.message });
    }
});

// Excluir Campanha
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await campaignController.deleteCampaign(id);
        res.json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting campaign: ' + error.message });
    }
});

export default router;
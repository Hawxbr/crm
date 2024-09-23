import express from 'express';
import CategorieController from '../controllers/CategorieController.mjs';
import Knex from 'knex';
import knexConfig from '../knexfile.mjs';

const router = express.Router();
const knex = Knex(knexConfig.development);
const categorieController = new CategorieController(knex);

router.post('/', async (req, res) => {
    const { name } = req.body;
    const categorie = { name };

    try {
        const result = await categorieController.createCategorie(categorie);
        res.status(200).json({ message: 'Category created successfully.', id: result.id });
    } catch (error) {
        res.status(500).json({ error: 'Error creating category: ' + error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const categorie = await categorieController.getCategorie(id);
        if (categorie) {
            res.status(200).json(categorie);
        } else {
            res.status(404).json({ error: 'Category not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving category: ' + error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const categorie = { name };

    try {
        await categorieController.updateCategorie(id, categorie);
        res.status(200).json({ message: 'Category updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating category: ' + error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await categorieController.deleteCategorie(id);
        res.status(200).json({ message: 'Category deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category: ' + error.message });
    }
});

router.get('/', async (req, res) => {
    const query = req.query;

    try {
        const result = await categorieController.searchCategories(query);
        res.status(200).json(result);
    } catch (error) {   
        res.status(500).json({ error: 'Error retrieving categories: ' + error.message });
    }
});

export default router;

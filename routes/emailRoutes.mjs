import express from 'express';
import EmailController from '../controllers/EmailController.mjs';

const router = express.Router();
const emailController = new EmailController();

//Config
router.get('/config', async (req, res) => {
    try {
        const config = await emailController.getEmailConfig();
        res.status(200).json(config);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter configurações de e-mail: ' + error.message });
    }
});

router.post('/config', async (req, res) => {
    const { smtpServer, smtpPort, email, password } = req.body;
    const config = { smtpServer, smtpPort, email, password };

    try {
        await emailController.updateEmailConfig(config);
        res.status(200).json({ message: 'Configurações de e-mail atualizadas com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar configurações de e-mail: ' + error.message });
    }
});

router.post('/config/create', async (req, res) => {
    const { smtpServer, smtpPort, email, password } = req.body;
    const config = { smtpServer, smtpPort, email, password };

    try {
        const result = await emailController.createEmailConfig(config);
        res.status(200).json({ message: 'Configurações de e-mail criadas com sucesso.', id: result.id });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar configurações de e-mail: ' + error.message });
    }
});

router.delete('/config/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await emailController.deleteEmailConfig(id);
        res.status(200).json({ message: 'Configurações de e-mail excluídas com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir configurações de e-mail: ' + error.message });
    }
});

//Layout
router.post('/layout', async (req, res) => {
    const { name, subject, message } = req.body;
    const layout = { name, subject, message };

    try {
        const result = await emailController.createEmailLayout(layout);
        res.status(200).json({ message: 'Layout de e-mail criado com sucesso.', id: result.id });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar layout de e-mail: ' + error.message });
    }
});

router.put('/layout/:id', async (req, res) => {
    const { id } = req.params;
    const { name, subject, message } = req.body;
    const layout = { name, subject, message };

    try {
        await emailController.updateEmailLayout(id, layout);
        res.status(200).json({ message: 'Layout de e-mail atualizado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar layout de e-mail: ' + error.message });
    }
});

router.get('/layout/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const layout = await emailController.getEmailLayout(id);
        res.status(200).json(layout);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter layout de e-mail: ' + error.message });
    }
});

router.delete('/layout/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await emailController.deleteEmailLayout(id);
        res.status(200).json({ message: 'Layout de e-mail excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir layout de e-mail: ' + error.message });
    }
});

router.get('/layouts', async (req, res) => {
    try {
        const layouts = await emailController.getAllEmailLayouts();
        res.status(200).json(layouts);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter layouts de e-mail: ' + error.message });
    }
});

//Test
router.post('/test', async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        await emailController.sendEmail(to, subject, text);
        res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar e-mail: ' + error.message });
    }
});

export default router;

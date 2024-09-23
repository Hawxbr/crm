import express from 'express';
import WhatsappController from '../controllers/WhatsappController.mjs';

const router = express.Router();
const whatsappController = new WhatsappController();

router.get('/getqrcode', async (req, res) => {
    try {
        const qrCode = await whatsappController.getQRCode();
        res.send(qrCode);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter QR Code: ' + error });
    }
});

router.post('/sendmessage', express.json(), async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({ error: 'Número de telefone e mensagem são obrigatórios.' });
    }

    try {
        const result = await whatsappController.sendMessage(number, message);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar mensagem: ' + error });
    }
});

router.get('/test/:number', async (req, res) => {
    const { number } = req.params;
    const message = 'Olá, somos a Hawx Soluções!';

    try {
        const result = await whatsappController.sendMessage(number, message);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar mensagem de teste: ' + error });
    }
});

export default router;

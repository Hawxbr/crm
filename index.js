const express = require('express');
const WhatsappController = require('./controllers/WhatsappController');

const app = express();
const port = 3000;

const whatsappController = new WhatsappController();

app.get('/api/whatsapp/getqrcode', async (req, res) => {
    try {
        const qrCode = await whatsappController.getQRCode();
        res.send(qrCode);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter QR Code: ' + error });
    }
});

app.post('/api/whatsapp/sendmessage', express.json(), async (req, res) => {
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

app.get('/api/whatsapp/test/:number', async (req, res) => {
    const { number } = req.params;
    const message = 'Olá, somos a Hawx Soluções!';

    try {
        const result = await whatsappController.sendMessage(number, message);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar mensagem de teste: ' + error });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

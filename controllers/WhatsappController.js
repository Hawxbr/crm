const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

class WhatsappController {
    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            restartOnAuthFail: true,
            puppeteer: {
                headless: true,
            }
        });

        this.client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
        });

        this.client.initialize();
    }

    getQRCode() {
        return new Promise((resolve, reject) => {
            this.client.on('qr', (qr) => {
                resolve(qr);
            });
        });
    }

    sendMessage(number, message) {
        return new Promise((resolve, reject) => {
            const chatId = number.substring(1) + "@c.us";
            if (!this.client) {
                reject(new Error('WhatsApp client is not initialized.'));
                return;
            }
            this.client.sendMessage(chatId, message)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    
}

module.exports = WhatsappController;

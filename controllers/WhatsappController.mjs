import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;

export default class WhatsappController {
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

    async getQRCode() {
        return new Promise((resolve, reject) => {
            this.client.on('qr', (qr) => {
                resolve(qr);
            });
        });
    }

    async sendMessage(number, message) {
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
import nodemailer from 'nodemailer';
import db from '../db.mjs';

class EmailController {
    constructor() {
        this.knex = db;
    }

    async getEmailConfig() {
        try {
            const [row] = await this.knex('EmailConfig').where({ deleted: 0 }).limit(1);
            if (!row) {
                throw new Error('Email configuration not found.');
            }
            return row;
        } catch (err) {
            throw new Error(`Error retrieving email configuration: ${err.message}`);
        }
    }

    async updateEmailConfig(config) {
        try {
            const existingConfig = await this.getEmailConfig();

            if (existingConfig) {
                await this.knex('EmailConfig')
                    .where({ id: existingConfig.id })
                    .update({
                        smtpServer: config.smtpServer,
                        smtpPort: config.smtpPort,
                        email: config.email,
                        password: config.password
                    });
                return { id: existingConfig.id };
            } else {
                throw new Error('Email configuration not found to update.');
            }
        } catch (err) {
            throw new Error(`Error updating email configuration: ${err.message}`);
        }
    }

    async createEmailConfig(config) {
        try {
            const [id] = await this.knex('EmailConfig')
                .insert({
                    smtpServer: config.smtpServer,
                    smtpPort: config.smtpPort,
                    email: config.email,
                    password: config.password,
                    deleted: 0
                });
            return { id };
        } catch (err) {
            throw new Error(`Error creating email configuration: ${err.message}`);
        }
    }

    async deleteEmailConfig(id) {
        try {
            await this.knex('EmailConfig').where({ id }).update({ deleted: 1 });
            return { id };
        } catch (err) {
            throw new Error(`Error deleting email configuration: ${err.message}`);
        }
    }

    async createEmailLayout(layout) {
        try {
            const [id] = await this.knex('EmailLayout')
                .insert({
                    name: layout.name,
                    subject: layout.subject,
                    message: layout.message,
                    deleted: 0
                });
            return { id };
        } catch (err) {
            throw new Error(`Error creating email layout: ${err.message}`);
        }
    }

    async updateEmailLayout(id, layout) {
        try {
            await this.knex('EmailLayout')
                .where({ id, deleted: 0 })
                .update({
                    name: layout.name,
                    subject: layout.subject,
                    message: layout.message,
                    updatedAt: this.knex.fn.now()
                });
            return { id };
        } catch (err) {
            throw new Error(`Error updating email layout: ${err.message}`);
        }
    }

    async getEmailLayout(id) {
        try {
            const row = await this.knex('EmailLayout').where({ id, deleted: 0 }).first();
            if (!row) {
                throw new Error('Email layout not found.');
            }
            return row;
        } catch (err) {
            throw new Error(`Error retrieving email layout: ${err.message}`);
        }
    }

    async deleteEmailLayout(id) {
        try {
            await this.knex('EmailLayout').where({ id }).update({ deleted: 1 });
            return { id };
        } catch (err) {
            throw new Error(`Error deleting email layout: ${err.message}`);
        }
    }

    async getAllEmailLayouts() {
        try {
            const rows = await this.knex('EmailLayout').where({ deleted: 0 });
            return rows;
        } catch (err) {
            throw new Error(`Error retrieving all email layouts: ${err.message}`);
        }
    }

    async sendEmail(to, subject, text) {
        try {
            const config = await this.getEmailConfig();

            const transporter = nodemailer.createTransport({
                host: config.smtpServer,
                port: parseInt(config.smtpPort, 10),
                secure: false,
                auth: {
                    user: config.email,
                    pass: config.password,
                },
            });

            const mailOptions = {
                from: config.email,
                to,
                subject,
                text,
            };

            return transporter.sendMail(mailOptions);
        } catch (err) {
            throw new Error(`Error sending email: ${err.message}`);
        }
    }
}

export default EmailController;
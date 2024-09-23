export default class ClientController {
    constructor(knex) {
        this.knex = knex;
    }

    async createClient(client) {
        try {
            const [id] = await this.knex('client').insert(client).returning('id');
            return { id };
        } catch (error) {
            throw new Error('Error creating client: ' + error.message);
        }
    }

    async getClient(id) {
        try {
            return await this.knex('client').where({ id, deleted: 0 }).first();
        } catch (error) {
            throw new Error('Error retrieving client: ' + error.message);
        }
    }

    async updateClient(id, client) {
        try {
            await this.knex('client').where({ id, deleted: 0 }).update(client);
        } catch (error) {
            throw new Error('Error updating client: ' + error.message);
        }
    }

    async deleteClient(id) {
        try {
            await this.knex('client').where({ id }).update({ deleted: 1 });
        } catch (error) {
            throw new Error('Error deleting client: ' + error.message);
        }
    }

    async searchClients(query) {
        try {
            const clientQuery = this.knex('client').where({ deleted: 0 });

            if (query.name) {
                clientQuery.where('name', 'like', `%${query.name}%`);
            }
            if (query.phone) {
                clientQuery.where('phone', 'like', `%${query.phone}%`);
            }
            if (query.email) {
                clientQuery.where('email', 'like', `%${query.email}%`);
            }
            if (query.gender) {
                clientQuery.where('gender', query.gender);
            }
            if (query.birthdate) {
                const { start, end } = query.birthdate;
                if (start) clientQuery.where('birthdate', '>=', start);
                if (end) clientQuery.where('birthdate', '<=', end);
            }

            const page = parseInt(query.page, 10) || 1;
            const limit = parseInt(query.limit, 10) || 10;
            const offset = (page - 1) * limit;

            const clients = await clientQuery.limit(limit).offset(offset).select();
            const total = await this.knex('client').where({ deleted: 0 }).count({ count: '*' }).first();

            return {
                clients,
                total: total.count,
                page,
                limit,
                totalPages: Math.ceil(total.count / limit),
            };
        } catch (error) {
            throw new Error('Error searching clients: ' + error.message);
        }
    }

    async getAllClients(query) {
        return this.searchClients(query);
    }
}
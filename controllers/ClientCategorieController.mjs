export default class ClientCategorieController {
    constructor(knex) {
        this.knex = knex;
    }

    async associateClientToCategory(clientCategorie) {
        try {
            const [id] = await this.knex('ClientCategorie').insert(clientCategorie).returning('id');
            return { id };
        } catch (error) {
            throw new Error('Erro ao associar cliente à categoria: ' + error.message);
        }
    }

    async getClientsByCategory(categoryId) {
        try {
            const clients = await this.knex('ClientCategorie')
                .join('Client', 'Client.id', '=', 'ClientCategorie.clientId')
                .where('ClientCategorie.categoryId', categoryId)
                .select('Client.id', 'Client.name');
            return clients;
        } catch (error) {
            throw new Error('Erro ao buscar clientes da categoria: ' + error.message);
        }
    }

    async updateClientsInCategory(categoryId, clientIds) {
        const trx = await this.knex.transaction();

        try {
            await trx('ClientCategorie').where('categoryId', categoryId).del();

            const insertPromises = clientIds.map(clientId => 
                trx('ClientCategorie').insert({ clientId, categoryId })
            );

            await Promise.all(insertPromises);

            await trx.commit();
        } catch (error) {
            await trx.rollback();
            throw new Error('Erro ao atualizar clientes na categoria: ' + error.message);
        }
    }

    async deleteClientFromCategory(categoryId, clientId) {
        try {
            await this.knex('ClientCategorie')
                .where({ categoryId, clientId })
                .del();
        } catch (error) {
            throw new Error('Erro ao remover cliente da categoria: ' + error.message);
        }
    }
}

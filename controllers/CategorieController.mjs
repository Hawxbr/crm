export default class CategorieController {
    constructor(knex) {
        this.knex = knex;
    }

    async createCategorie(categorie) {
        try {
            const [id] = await this.knex('categorie').insert(categorie).returning('id');
            return { id };
        } catch (error) {
            throw new Error('Error creating categorie: ' + error.message);
        }
    }

    async getCategorie(id) {
        try {
            return await this.knex('categorie').where({ id, deleted: 0 }).first();
        } catch (error) {
            throw new Error('Error retrieving categorie: ' + error.message);
        }
    }

    async updateCategorie(id, categorie) {
        try {
            await this.knex('categorie').where({ id, deleted: 0 }).update(categorie);
        } catch (error) {
            throw new Error('Error updating categorie: ' + error.message);
        }
    }

    async deleteCategorie(id) {
        try {
            await this.knex('categorie').where({ id }).update({ deleted: 1 });
        } catch (error) {
            throw new Error('Error deleting categorie: ' + error.message);
        }
    }

    async searchCategories(query) {
        try {
            const categorieQuery = this.knex('categorie').where({ deleted: 0 });

            if (query.name) {
                categorieQuery.where('name', 'like', `%${query.name}%`);
            }

            const page = parseInt(query.page, 10) || 1;
            const limit = parseInt(query.limit, 10) || 10;
            const offset = (page - 1) * limit;

            const categories = await categorieQuery.limit(limit).offset(offset).select();
            const total = await this.knex('categorie').where({ deleted: 0 }).count({ count: '*' }).first();

            return {
                categories,
                total: total.count,
                page,
                limit,
                totalPages: Math.ceil(total.count / limit),
            };
        } catch (error) {
            throw new Error('Error searching categories: ' + error.message);
        }
    }

    async getAllCategories(query) {
        return this.searchCategories(query);
    }
}
export default class CampaignController {
    constructor(knex) {
        this.knex = knex;
    }

    async createCampaign(campaign) {
        try {
            const [id] = await this.knex('Campaign').insert(campaign).returning('id');
            return { id };
        } catch (error) {
            throw new Error('Error creating campaign: ' + error.message);
        }
    }

    async getCampaign(id) {
        try {
            return await this.knex('Campaign').where({ id, deleted: 0 }).first();
        } catch (error) {
            throw new Error('Error retrieving campaign: ' + error.message);
        }
    }

    async updateCampaign(id, campaign) {
        try {
            await this.knex('Campaign').where({ id, deleted: 0 }).update(campaign);
        } catch (error) {
            throw new Error('Error updating campaign: ' + error.message);
        }
    }

    async deleteCampaign(id) {
        try {
            await this.knex('Campaign').where({ id }).update({ deleted: 1 });
        } catch (error) {
            throw new Error('Error deleting campaign: ' + error.message);
        }
    }

    async getAllCampaigns(query) {
        try {
            const campaignQuery = this.knex('Campaign').where({ deleted: 0 });

            if (query.name) {
                campaignQuery.andWhere('name', 'like', `%${query.name}%`);
            }

            if (query.category_id) {
                campaignQuery.andWhere('category_id', query.category_id);
            }

            if (query.type) {
                campaignQuery.andWhere('type', 'like', `%${query.type}%`);
            }

            const campaigns = await campaignQuery.select();
            return campaigns;
        } catch (error) {
            throw new Error('Error fetching campaigns: ' + error.message);
        }
    }
}

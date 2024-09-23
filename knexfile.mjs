import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    development: {
        client: 'sqlite3',
        connection: {
            filename: `${__dirname}/crm.db`
        },
        useNullAsDefault: true,
        migrations: {
            directory: `${__dirname}/migrations`
        }
    }
};

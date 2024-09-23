import express from 'express';
import cors from 'cors';
import * as userService from './services/userService.mjs';
import whatsappRoutes from './routes/whatsappRoutes.mjs';
import emailRoutes from './routes/emailRoutes.mjs';
import clientRoutes from './routes/clientRoutes.mjs';
import categorieRoutes from './routes/categorieRoutes.mjs';
import clientCategorieRoutes from './routes/clientCategorieRoutes.mjs';
import campaignRoutes from './routes/campaignRoutes.mjs';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/login', userService.loginWithEmailAndPassword);
app.post('/register', userService.registerWithEmailAndPassword);

app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/categorie', categorieRoutes);
app.use('/api/clientCategorie', clientCategorieRoutes);
app.use('/api/campaign', campaignRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

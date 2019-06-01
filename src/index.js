import express from 'express';
import {router} from './routes';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

const PORT = 3000;

app.use('/api', router);

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});

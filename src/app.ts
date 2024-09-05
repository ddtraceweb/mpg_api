import 'reflect-metadata';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';

import { setupSwagger } from './config/swagger.js';
import {
  getUsersByLeague,
  createLeague,
} from './controllers/leagueController.js';
import { updateTeamName } from './controllers/teamController.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());

setupSwagger(app);

app.get('/leagues/:leagueId/users', getUsersByLeague);
app.post('/leagues', createLeague);
app.patch('/teams/:teamId', updateTeamName);

export default app;

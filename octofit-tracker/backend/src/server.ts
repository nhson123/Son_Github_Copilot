import express from 'express';
import './config/database.js';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from './models/index.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

const collections = [
  ['/api/users/', User],
  ['/api/teams/', Team],
  ['/api/activities/', Activity],
  ['/api/leaderboard/', LeaderboardEntry],
  ['/api/workouts/', Workout],
] as const;

for (const [path, model] of collections) {
  app.get(path, async (_request, response) => {
    response.json(await model.find().lean());
  });

  app.post(path, async (request, response) => {
    const document = await model.create(request.body);
    response.status(201).json(document);
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import exampleRoutes from './routes/example.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ ok: true, message: 'SoloDevMeet backend starter is running.' });
});

app.use('/api/practice', exampleRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

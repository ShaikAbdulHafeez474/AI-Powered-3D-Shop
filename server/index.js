import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import imageGenerationRoutes from './routes/dalle.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limig: "50mb" }))

app.use("/api/v2/image-generation",imageGenerationRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E" })
})

app.listen(5000, () => console.log('Server has started on port 8080'))
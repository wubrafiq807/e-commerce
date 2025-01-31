import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes';
import bodyParser from 'body-parser';
import { runSeeder } from './src/seeders/seeder';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/order-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then( async() => {
  console.log('User Service DB Connected')
  await runSeeder();
})
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/users', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`User service running on port ${port}`);
});

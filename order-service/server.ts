import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRoutes from './src/routes/orderRoutes';
import bodyParser from 'body-parser';
import { constants } from "./src/utility/global";
import { runSeeder } from './src/seeders/seeder';

global.constants = constants;
global.token = '';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/order-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then( async() => {
  console.log('Order Service DB Connected')
  runSeeder()
})
  .catch((err) => console.error(err));

app.use('/api/orders', orderRoutes);
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`Order service running on port ${port}`);
});
